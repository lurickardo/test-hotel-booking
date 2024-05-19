import type { FastifyReply } from "fastify";
import { transformUploadPaymentVoucherDto } from "./dto";
import { paymentService } from "./payment.service";

export const paymentController = {
	uploadPaymentVoucher: async (req, reply: FastifyReply) => {
		return reply.code(200).send(
			await paymentService.uploadPaymentVoucher(
				req.params.idBooking,
				transformUploadPaymentVoucherDto({
					paymentVoucher: await req.file(),
				}),
			),
		);
	},
};
