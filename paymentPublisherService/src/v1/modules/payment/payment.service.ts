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

			const paymentVoucherUrlFile = await s3Provider.uploadFile({
				file: uploadPaymentVoucherDto.paymentVoucher,
				bucket: env.providers.aws.s3.paymentVoucher.bucket,
				folder: env.providers.aws.s3.paymentVoucher.folder,
			});

			const paymentVoucher: PaymentVoucher =
				await paymentVoucherRepository.create({
					idBooking: booking._id,
					fileUrl: paymentVoucherUrlFile.Location,
					codeBookingInfo: Math.floor(Math.random() * 100000000).toString(),
				});

			return paymentVoucher;
		} catch (error) {
			throw error;
		}
	},
};
