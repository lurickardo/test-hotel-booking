import type { Message } from "@aws-sdk/client-sqs";
import type { SendNotificationDto, sendNotificationInterface } from "./dto";
import { sesProvider } from "../../../provider/ses.provider";
import { sqsProvider } from "../../../provider/sqs.provider";
import { env } from "../../../config";
import { templateNotificationRepository } from "../../../database/repositories/templateNotification.repository";
import { utils } from "../../../config/utils";
import Handlebars from "handlebars";

const bookingNotApproved = async (
	sendNotificationDto: SendNotificationDto,
	message: Message,
) => {
	const templateNotification = await templateNotificationRepository.findOneBy({
		_id: utils.convertToObjectId(sendNotificationDto.templateId),
	});

	const template = Handlebars.compile(templateNotification.message);
	const completeMessage = template(sendNotificationDto.content);

	await sesProvider.sendMail({
		subject: templateNotification.subject,
		recipients: sendNotificationDto.recipients,
		htmlBody: completeMessage,
	});

	sqsProvider.deleteMessage({
		queueUrl: env.providers.aws.sqs.urlQueues.notifications,
		receiptHandle: message.ReceiptHandle,
	});
	process.stdout.write(
		`\n\x1b[32m Notification ID:${message.MessageId} not approved, sent.\x1b[0m\n`,
	);
};

export const notificationService = {
	sendNotification: async (
		{ sendNotificationDto, error }: sendNotificationInterface,
		message: Message,
	) => {
		if (error && !error?.success) {
			process.stdout.write(
				`\n\x1b[31mValidate error in message ${
					message.MessageId
				}: ${JSON.stringify(error)}\x1b[0m`,
			);
			return;
		}

		if (sendNotificationDto.idBooking) {
			sqsProvider.deleteMessage({
				queueUrl: env.providers.aws.sqs.urlQueues.notifications,
				receiptHandle: message.ReceiptHandle,
			});
			process.stdout.write(
				`\n\x1b[32m Success booking ${sendNotificationDto.idBooking}, notification ID:${message.MessageId} sent.\x1b[0m\n`,
			);
			return;
		}

		await bookingNotApproved(sendNotificationDto, message);
	},
};
