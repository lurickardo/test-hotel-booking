import type { CreateBookingDto } from "./dto";

export const bookingService = {
	create: async (createBookingDto: CreateBookingDto) => {
		try {
			console.log(createBookingDto);

			return createBookingDto;
		} catch (error) {
			throw error;
		}
	},
};
