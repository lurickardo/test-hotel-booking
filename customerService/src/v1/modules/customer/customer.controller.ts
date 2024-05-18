import { FastifyReply, FastifyRequest } from "fastify";
import { transformCreateCustomerDto, transformBalanceDto } from "./dto";
import { customerService } from "./customer.service";

export const customerController = {
	create: async ({ body }: FastifyRequest, reply: FastifyReply) => {
		return reply
			.code(201)
			.send(await customerService.create(await transformCreateCustomerDto(body)));
	},
	addBalance: async ({ params: { email }, body }, reply: FastifyReply) => {
		return reply
			.code(200)
			.send(await customerService.addBalance(email, transformBalanceDto(body)));
	},
};
