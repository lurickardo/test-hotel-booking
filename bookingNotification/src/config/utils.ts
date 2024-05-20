import { ObjectId } from "mongodb";
import { exception } from "./error";
import { Message } from "@aws-sdk/client-sqs";
import { sqsProvider } from "../provider/sqs.provider";

export const utils = {
	convertToObjectId: (id: string): ObjectId => {
		if (!/^[0-9a-fA-F]{24}$/.test(id))
			throw exception("Template message not found.");
		return new ObjectId(id);
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
