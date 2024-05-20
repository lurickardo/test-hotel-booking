import { env } from "../../../config";
import type { Queue } from "../../../@types/Queue";
import { validateSendNotificationDto } from "./dto";
import { notificationService } from "./notification.service";

export const notificationQueues: Queue[] = [
	{
		queueUrl: env.providers.aws.sqs.urlQueues.notifications,
		service: notificationService.sendNotification,
		validate: validateSendNotificationDto,
		options: { durable: true },
	},
];
