import type { Message } from "@aws-sdk/client-sqs";
import type { ZodError } from "./ZodError";

type ServiceInterface = {
	genericDto?: any;
	error?: ZodError;
};
export type Queue = {
	queueUrl: string;
	service: (
		genericDto: ServiceInterface,
		message?: Message,
	) => void | Promise<void>;
	validate: (data: any) => any;
	options?: Options.AssertQueue;
};
