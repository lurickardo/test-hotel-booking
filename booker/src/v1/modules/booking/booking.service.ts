import { env } from "../../../config";
import { sqsProvider } from "../../../provider/sqs.provider";
import type { CreateBookingDto } from "./dto";

export const bookingService = {
	create: async (createBookingDto: CreateBookingDto) => {
		try {
			await sqsProvider.publish({
				queueUrl: env.providers.aws.sqs.urlQueues.bookings,
				queueType: "fifo",
				messageBody: JSON.stringify(createBookingDto),
			});

			return {
				message: "Booking request made, check your email for more details.",
			};
		} catch (error) {
			throw error;
		}
	},
};
