import { z } from "zod";
import { utils } from "../../../../config/utils";
import { paymentMethodsList } from "../../../../enum/paymentMethod.enum";

const createBookingSchema = z.object({
	customerEmail: z.string().email(),
	customerName: z.string().min(10).max(45),
	dtCheckIn: z
		.string()
		.transform((value) => utils.dateFormat(value, "dtCheckIn")),
	dtCheckOut: z
		.string()
		.transform((value) => utils.dateFormat(value, "dtCheckOut")),
	room: z.number().int().positive(),
	vlBooking: z.number().positive(),
	paymentMethod: z.enum(paymentMethodsList),
});

export type CreateBookingDto = z.infer<typeof createBookingSchema>;

export const transformCreateBookingDto = (data): Promise<CreateBookingDto> => {
	return createBookingSchema.parseAsync(data);
};
