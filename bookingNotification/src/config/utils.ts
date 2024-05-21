import { ObjectId } from "mongodb";
import { exception } from "./error";
import type { Message } from "@aws-sdk/client-sqs";
import { sqsProvider } from "../provider/sqs.provider";

export const utils = {
	convertToObjectId: (id: string): ObjectId => {
		if (!/^[0-9a-fA-F]{24}$/.test(id)) throw exception("Id invalid.");
		return new ObjectId(id);
	},
	clearQueue: async (
		queueUrl: string,
		queueMessage: Message,
		message?: string,
	): Promise<void> => {
		sqsProvider.deleteMessage({
			queueUrl: queueUrl,
			receiptHandle: queueMessage.ReceiptHandle,
		});
		message && process.stdout.write(message);
	},
	formatDate: (isoString: Date | string): string => {
		const date = new Date(isoString);
		const day = String(date.getUTCDate()).padStart(2, "0");
		const month = String(date.getUTCMonth() + 1).padStart(2, "0");
		const year = date.getUTCFullYear();

		return `${day}/${month}/${year}`;
	},
};
