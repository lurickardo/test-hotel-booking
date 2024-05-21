import type { Message } from "@aws-sdk/client-sqs";
import type { sendNotificationInterface } from "./dto";
import { env } from "../../../config";
import { bookingNotApproved } from "./cases/bookingNotApproved.case";
import { bookingApproved } from "./cases/bookingApproved.case";

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
			return await bookingApproved(
				sendNotificationDto,
				message,
				env.providers.aws.sqs.urlQueues.notifications,
				env.providers.aws.s3.bookingInfo.bucket,
				env.providers.aws.s3.bookingInfo.folder,
			);
		}

		await bookingNotApproved(sendNotificationDto, message);
	},
};
