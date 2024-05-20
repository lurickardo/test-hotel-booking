import { env } from "../../../config";
import type { Queue } from "../../../@types/Queue";
import { validateCreateBooking } from "./dto";
import { bookingService } from "./booking.service";

export const bookingQueues: Queue[] = [
	{
		queueUrl: env.providers.aws.sqs.urlQueues.bookings,
		service: bookingService.create,
		validate: validateCreateBooking,
		options: { durable: true },
	},
];
