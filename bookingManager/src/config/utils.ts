import type { Message } from "@aws-sdk/client-sqs";
import { sqsProvider } from "../provider/sqs.provider";

export const utils = {
	bufferToObject: (buffer: any): any => {
		return JSON.parse(JSON.stringify(buffer));
	},
	dateFormat: (value: string): string | boolean => {
		const date = new Date(value);
		if (isNaN(date.getTime())) {
			return false;
		}
		return date.toISOString();
	},
	clearQueue: async (
		queueUrl: string,
		queueMessage: Message,
		message: string,
	): Promise<void> => {
		sqsProvider.deleteMessage({
			queueUrl: queueUrl,
			receiptHandle: queueMessage.ReceiptHandle,
		});
		process.stdout.write(message);
	},
};
