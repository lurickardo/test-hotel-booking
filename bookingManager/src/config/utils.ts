import type { Message } from "@aws-sdk/client-sqs";

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
};
