import type { CreateBookingDto } from "./dto";

export const bookingService = {
	create: async (createBookingDto: CreateBookingDto) => {
		try {
			return { message: "Booking created successfully.", createBookingDto };
		} catch (error) {
			throw error;
		}
	},
};
