import Handlebars from "handlebars";
import { Message } from "@aws-sdk/client-sqs";
import { SendNotificationDto } from "../dto";
import { templateNotificationRepository } from "../../../../database/repositories/templateNotification.repository";
import { utils } from "../../../../config/utils";
import { sesProvider } from "../../../../provider/ses.provider";
import { env } from "../../../../config";

export const bookingNotApproved = async (
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

	utils.clearQueue(
		env.providers.aws.sqs.urlQueues.notifications,
		message,
		`\n\x1b[32m Notification ID:${message.MessageId} not approved, sent.\x1b[0m\n`,
	);
};
