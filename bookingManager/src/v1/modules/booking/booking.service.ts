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
import type { Booking } from "../../../database/entities/booking.entity";

const createBookingBalance = async (
	createBookingDto: CreateBookingDto,
	customer: Customer,
	message: Message,
) => {
	const newBalance = Number(
		(customer?.balance - createBookingDto.vlBooking).toFixed(6),
	);

	if (newBalance < 0) {
		await sqsProvider.publish({
			queueUrl: env.providers.aws.sqs.urlQueues.bookingNotifications,
			queueType: "fifo",
			messageBody: JSON.stringify({
				recipients: [createBookingDto.customerEmail],
				content: {
					customerName: createBookingDto.customerName,
				},
				templateId: env.templateEmails.balanceInsufficient,
			}),
		});
		sqsProvider.deleteMessage({
			queueUrl: env.providers.aws.sqs.urlQueues.bookings,
			receiptHandle: message.ReceiptHandle,
		});
		process.stdout.write(
			`\n\x1b[31m Booking ID:${message.MessageId} - customer: ${createBookingDto.customerName} the balance is insufficient.\x1b[0m\n`,
		);
		return;
	}

	const [booking] = await Promise.all([
		bookingRepository.create({
			...createBookingDto,
			status: "CONCLUDED",
		}),
		customerRepository.update(customer, { balance: newBalance }),
	]);

	await sqsProvider.publish({
		queueUrl: env.providers.aws.sqs.urlQueues.bookingNotifications,
		queueType: "fifo",
		messageBody: JSON.stringify({
			recipients: [createBookingDto.customerEmail],
			content: {
				customerName: createBookingDto.customerName,
			},
			templateId: env.templateEmails.bookingSuccess,
			idBooking: booking._id,
		}),
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

const isConflict = async (
	createBookingDto: CreateBookingDto,
): Promise<boolean> => {
	const bookingsByRoom: Booking[] = await bookingRepository.find({
		where: { room: createBookingDto.room },
	});

	if (bookingsByRoom.length === 0) return false;

	const isConflict = bookingsByRoom.some((booking) => {
		const startDate = new Date(createBookingDto.dtCheckIn);
		const endDate = new Date(createBookingDto.dtCheckOut);
		const bookingStartDate = new Date(booking.dtCheckIn);
		const bookingEndDate = new Date(booking.dtCheckOut);

		return startDate < bookingEndDate && endDate > bookingStartDate;
	});

	return isConflict;
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

		if (await isConflict(createBookingDto)) {
			sqsProvider.publish({
				queueUrl: env.providers.aws.sqs.urlQueues.bookingNotifications,
				queueType: "fifo",
				messageBody: JSON.stringify({
					recipients: [createBookingDto.customerEmail],
					content: {
						customerName: createBookingDto.customerName,
					},
					templateId: env.templateEmails.roomConflict,
				}),
			});
			sqsProvider.deleteMessage({
				queueUrl: env.providers.aws.sqs.urlQueues.bookings,
				receiptHandle: message.ReceiptHandle,
			});
			process.stdout.write(
				`\n\x1b[31m Booking ID:${message.MessageId} has a date conflict.\x1b[0m\n`,
			);
			return;
		}

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

		const customer: Customer = await customerRepository.findOneBy({
			email: createBookingDto.customerEmail,
		});

		if (!customer) {
			sqsProvider.publish({
				queueUrl: env.providers.aws.sqs.urlQueues.bookingNotifications,
				queueType: "fifo",
				messageBody: JSON.stringify({
					recipients: [createBookingDto.customerEmail],
					content: {
						customerName: createBookingDto.customerName,
					},
					templateId: env.templateEmails.customerNotFound,
				}),
			});
			sqsProvider.deleteMessage({
				queueUrl: env.providers.aws.sqs.urlQueues.bookings,
				receiptHandle: message.ReceiptHandle,
			});
			process.stdout.write(
				`\n\x1b[31m Booking ID:${message.MessageId} customer not found.\x1b[0m\n`,
			);
			return;
		}
		await createBookingBalance(createBookingDto, customer, message);
	},
};
