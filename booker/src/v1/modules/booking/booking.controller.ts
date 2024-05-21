import type { FastifyReply, FastifyRequest } from "fastify";
import { transformCreateBookingDto } from "./dto";
import { bookingService } from "./booking.service";

export const bookingController = {
	create: async ({ body }: FastifyRequest, reply: FastifyReply) => {
		return reply
			.code(201)
			.send(await bookingService.create(await transformCreateBookingDto(body)));
	},
};
