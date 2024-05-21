import { s3Provider } from "../../../provider/s3.provider";
import type { PaymentVoucherDto } from "./dto";
import { env } from "../../../config";
import type { Booking } from "../../../database/entities/booking.entity";
import { bookingRepository } from "../../../database/repositories/booking.repository";
import { httpException } from "../../../config/error";
import * as httpStatus from "http-status";
import { utils } from "../../../config/utils";
import type { PaymentVoucher } from "../../../database/entities/paymentVoucher.entity";
import { paymentVoucherRepository } from "../../../database/repositories/payment.repository";
import { sqsProvider } from "../../../provider/sqs.provider";

export const paymentService = {
	uploadPaymentVoucher: async (
		idBooking: string,
		uploadPaymentVoucherDto: PaymentVoucherDto,
	) => {
		try {
			const booking: Booking = await bookingRepository.findOneBy({
				_id: utils.convertToObjectId(idBooking),
			});

			if (!booking)
				throw httpException("Booking not found.", httpStatus.NOT_FOUND);

			if (
				await paymentVoucherRepository.findOneBy({
					idBooking: utils.convertToObjectId(idBooking),
				})
			)
				throw httpException(
					"Payment voucher already sent.",
					httpStatus.BAD_REQUEST,
				);

			const paymentVoucherUploaded = await s3Provider.uploadFile({
				file: uploadPaymentVoucherDto.paymentVoucher,
				bucket: env.providers.aws.s3.paymentVoucher.bucket,
				folder: env.providers.aws.s3.paymentVoucher.folder,
			});

			const paymentVoucher: PaymentVoucher =
				await paymentVoucherRepository.create({
					idBooking: booking._id,
					fileUrl: paymentVoucherUploaded.Location,
				});

			await sqsProvider.publish({
				queueUrl: env.providers.aws.sqs.urlQueues.bookingNotifications,
				queueType: "fifo",
				deduplicationId: paymentVoucher._id.toString(),
				messageBody: JSON.stringify({
					idBooking: booking._id.toString(),
					templateId: env.providers.aws.ses.templates.bookingAproved,
				}),
			});

			return {
				message:
					"Payment voucher uploaded successfully, booking PDF sent to your email.",
			};
		} catch (error) {
			throw error;
		}
	},
};
