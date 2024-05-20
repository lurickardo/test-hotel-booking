import { paymentMethodsList } from "./../../../../enum/paymentMethod.enum";
import type { PaymentMethodType } from "../../../../enum/paymentMethod.enum";
import { utils } from "../../../../config/utils";
import { type SafeParseReturnType, z } from "zod";

const createBookingSchema = z.object({
	customerEmail: z.string().email(),
	customerName: z.string().min(10).max(45),
	dtCheckIn: z
		.string()
		.transform((value) => utils.dateFormat(value))
		.refine((value) => value),
	dtCheckOut: z
		.string()
		.transform((value) => utils.dateFormat(value))
		.refine((value) => value),
	room: z.number().int().positive(),
	vlBooking: z.number().positive(),
	paymentMethod: z.enum(paymentMethodsList),
});

export type CreateBookingDto = {
	customerEmail: string;
	customerName: string;
	dtCheckIn: string;
	dtCheckOut: string;
	room: number;
	vlBooking: number;
	paymentMethod: PaymentMethodType;
};

export interface createBookingInterface {
	createBookingDto?: CreateBookingDto;
	error?: SafeParseReturnType<any, any>;
}

export const validateCreateBooking = (data: any) => {
	const validate = createBookingSchema.safeParse(data);
	if (!createBookingSchema.safeParse(data).success) {
		return {
			error: validate,
		};
	}
	return {
		createBookingDto: validate.data,
	};
};
