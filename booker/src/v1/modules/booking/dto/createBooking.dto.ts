import { z } from "zod";

const createBookingSchema = z.object({
	customerEmail: z.string().email(),
	customerName: z.string().min(10).max(45),
	dtCheckIn: z.date(),
	dtCheckOut: z.date(),
	room: z.number().int().positive().min(1),
	vlBooking: z.string(),
	paymentMethod: z.enum(["pix", "boleto", "saldo"]),
});

export type CreateBookingDto = z.infer<typeof createBookingSchema>;

export const transformCreateBookingDto = (data): Promise<CreateBookingDto> => {
	return createBookingSchema.parseAsync(data);
};
