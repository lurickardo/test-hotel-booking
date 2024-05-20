import { type SafeParseReturnType, z } from "zod";

const sendNotificationSchema = z.object({
	recipients: z.array(z.string()).min(1),
	content: z.any(),
	templateId: z.string().min(23),
	idBooking: z.string().min(23).optional(),
});

export type SendNotificationDto = {
	recipients: string[];
	content: any;
	templateId: string;
	idBooking: string;
};

export interface sendNotificationInterface {
	sendNotificationDto?: SendNotificationDto;
	error?: SafeParseReturnType<any, any>;
}

export const validateSendNotificationDto = (data) => {
	const validate = sendNotificationSchema.safeParse(data);
	if (!sendNotificationSchema.safeParse(data).success) {
		return {
			error: validate,
		};
	}
	return {
		sendNotificationDto: validate.data,
	};
};
