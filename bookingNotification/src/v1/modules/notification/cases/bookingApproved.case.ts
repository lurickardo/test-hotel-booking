import Handlebars from "handlebars";
import { generatePDF } from "../../../../lib/generatePDF.lib";
import { utils } from "../../../../config/utils";
import { Booking } from "../../../../database/entities/booking.entity";
import { bookingRepository } from "../../../../database/repositories/booking.repository";
import { Message } from "@aws-sdk/client-sqs";
import { SendNotificationDto } from "../dto";
import { s3Provider } from "../../../../provider/s3.provider";
import { randomUUID } from "node:crypto";
import { bookingInfoRepository } from "../../../../database/repositories/bookingInfo.repository";
import { sesProvider } from "../../../../provider/ses.provider";
import { templateNotificationRepository } from "../../../../database/repositories/templateNotification.repository";

export const bookingApproved = async (
	sendNotificationDto: SendNotificationDto,
	message: Message,
	queueUrl: string,
	bucket: string,
	folder: string,
) => {
	const idBooking = utils.convertToObjectId(sendNotificationDto.idBooking);
	const booking: Booking = await bookingRepository.findOneBy({
		_id: idBooking,
	});

	if (!booking) {
		utils.clearQueue(
			queueUrl,
			message,
			`\n\x1b[31mBooking ${sendNotificationDto.idBooking} not found\x1b[0m\n`,
		);
		return;
	}

	const bookingInfoPDF = await generatePDF.createBookingInfoPDF(booking);

	const bookingInfoUploaded = await s3Provider.uploadFile({
		file: {
			mimetype: "application/pdf",
			file: bookingInfoPDF,
		},
		bucket,
		folder,
	});

	const [templateNotification] = await Promise.all([
		await templateNotificationRepository.findOneBy({
			_id: utils.convertToObjectId(sendNotificationDto.templateId),
		}),
		await bookingInfoRepository.create({
			codeBookingInfo: randomUUID().substring(0, 8),
			fileUrl: bookingInfoUploaded.Location,
			idBooking,
		}),
	]);

	const contentMessage = {
		customerName: booking.customerName,
		fileUrl: bookingInfoUploaded.Location,
	};

	const template = Handlebars.compile(templateNotification.message);
	const completeMessage = template(contentMessage);

	await sesProvider.sendMail({
		subject: templateNotification.subject,
		recipients: [booking.customerEmail],
		htmlBody: completeMessage,
	});

	utils.clearQueue(
		queueUrl,
		message,
		`\n\x1b[32m Success booking ${sendNotificationDto.idBooking}, notification ID:${message.MessageId} sent.\x1b[0m\n`,
	);
	return;
};
