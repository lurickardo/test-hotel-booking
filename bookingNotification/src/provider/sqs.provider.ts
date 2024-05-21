import {
	SQS,
	type DeleteMessageCommandInput,
	type DeleteMessageCommandOutput,
} from "@aws-sdk/client-sqs";
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

interface DeleteMessageSQS {
	queueUrl: string;
	receiptHandle: string;
}

export const sqsProvider = {
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
