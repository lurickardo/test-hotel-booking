import type { Message, SQS } from "@aws-sdk/client-sqs";
import type { Queue } from "./@types/Queue";
import { notificationQueues } from "./v1/modules/notification/notification.queue";

const bindQueues = (channel: SQS, queues: Queue[]) => {
	queues.forEach((queue) => {
		if (channel?.config?.serviceId === "SQS") {
			channel.receiveMessage(
				{
					QueueUrl: queue.queueUrl,
					WaitTimeSeconds: 5,
					MaxNumberOfMessages: 10,
				},
				(error, data) => {
					if (error) {
						process.stdout.write(`\n\x1b[31mQUEUE ERROR: ${error}\x1b[0m\n`);
						process.exit(1);
					}
					data?.Messages.forEach((message: Message) => {
						return queue.service(
							queue.validate(JSON.parse(message?.Body)),
							message,
						);
					});
				},
			);
		}
	});
};

export const queues = (channel: SQS): void => {
	bindQueues(channel, [...notificationQueues]);
};
