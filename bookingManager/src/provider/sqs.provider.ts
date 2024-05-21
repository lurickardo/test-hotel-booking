import {
	SQS,
	type SendMessageCommandInput,
	type DeleteMessageCommandInput,
	type DeleteMessageCommandOutput,
	type SendMessageCommandOutput,
} from "@aws-sdk/client-sqs";
import { randomUUID } from "node:crypto";
import { env } from "../config";

export const QueueType = {
	standard: "standard",
	fifo: "fifo",
} as const;

export type QueueType = keyof typeof QueueType;

const sqsClient = new SQS({
	region: env.providers.aws.region,
	credentials: {
		accessKeyId: env.providers.aws.accessKeyId,
		secretAccessKey: env.providers.aws.secretAccessKey,
	},
});

interface PublishSQS {
	queueUrl: string;
	queueType: QueueType;
	delay?: number;
	deduplicationId?: string;
	messageBody: string | undefined;
}

interface DeleteMessageSQS {
	queueUrl: string;
	receiptHandle: string;
}

export const sqsProvider = {
	publish: async ({
		queueUrl,
		queueType = QueueType.standard,
		delay = 10,
		deduplicationId = randomUUID(),
		messageBody,
	}: PublishSQS): Promise<SendMessageCommandOutput> => {
		try {
			if (queueType === QueueType.fifo) {
				const params = {
					MessageBody: messageBody,
					QueueUrl: queueUrl,
					MessageGroupId: "default",
					MessageDeduplicationId: deduplicationId,
				} as SendMessageCommandInput;

				return await sqsClient.sendMessage(params);
			}

			const params = {
				MessageBody: messageBody,
				QueueUrl: queueUrl,
				MessageGroupId: "default",
				MessageDeduplicationId: deduplicationId,
				DelaySeconds: delay,
			} as SendMessageCommandInput;

			return await sqsClient.sendMessage(params);
		} catch (error) {
			throw error;
		}
	},
	deleteMessage: async ({
		queueUrl,
		receiptHandle,
	}: DeleteMessageSQS): Promise<DeleteMessageCommandOutput> => {
		try {
			const params = {
				QueueUrl: queueUrl,
				ReceiptHandle: receiptHandle,
			} as DeleteMessageCommandInput;

			return await sqsClient.deleteMessage(params);
		} catch (error) {
			throw error;
		}
	},
};
