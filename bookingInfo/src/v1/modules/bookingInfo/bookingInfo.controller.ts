import { FastifyReply } from "fastify";
import { bookingInfoService } from "./bookingInfo.service";

export const bookingInfoController = {
	findByCode: async ({ params: { codeBookingInfo } }, reply: FastifyReply) => {
		return reply
			.code(200)
			.send(await bookingInfoService.findByCode(codeBookingInfo));
	},
};
