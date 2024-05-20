import { PaymentMethod } from "../../../enum/paymentMethod.enum";
import { bookingRepository } from "../../../database/repositories/booking.repository";
import type {
	CreateBookingDto,
	createBookingInterface,
} from "./dto/createBooking.dto";
import { sqsProvider } from "../../../provider/sqs.provider";
import type { Message } from "@aws-sdk/client-sqs";
import { env } from "../../../config";
import { customerRepository } from "../../../database/repositories/customer.repository";
import type { Customer } from "../../../database/entities/customer.entity";

const createBookingBalance = async (
	createBookingDto: CreateBookingDto,
	message: Message,
) => {
	const customer: Customer = await customerRepository.findOneBy({
		email: createBookingDto.customerEmail,
	});

	const newBalance = Number(
		(customer.balance - createBookingDto.vlBooking).toFixed(6),
	);
	if (newBalance < 0) {
		// TODO: sends an email informing that the appointment was not made due to lack of balance
		return;
	}

	await customerRepository.update(customer, { balance: newBalance });
	// TODO: sends an email informing that the appointment was made successfully
	await bookingRepository.create({
		...createBookingDto,
		status: "CONCLUDED",
	});
	sqsProvider.deleteMessage({
		queueUrl: env.providers.aws.sqs.urlQueues.bookings,
		receiptHandle: message.ReceiptHandle,
	});
	process.stdout.write(
		`\n\x1b[32m Booking with balance ID:${message.MessageId} done.\x1b[0m\n`,
	);
	return;
};

export const bookingService = {
	create: async (
		{ createBookingDto, error }: createBookingInterface,
		message: Message,
	) => {
		if (error && !error?.success) {
			process.stdout.write(
				`\n\x1b[31mValidate error in message ${
					message.MessageId
				}: ${JSON.stringify(error)}\x1b[0m`,
			);
			return;
		}

		//TODO: add lock when creating a booking
		if (createBookingDto.paymentMethod !== PaymentMethod.BALANCE) {
			await bookingRepository.create({
				...createBookingDto,
				status: "PENDING",
			});
			sqsProvider.deleteMessage({
				queueUrl: env.providers.aws.sqs.urlQueues.bookings,
				receiptHandle: message.ReceiptHandle,
			});
			process.stdout.write(
				`\n\x1b[32m Booking ID:${message.MessageId} done. Waiting approval.\x1b[0m\n`,
			);
			return;
		}

		await createBookingBalance(createBookingDto, message);
	},
};
