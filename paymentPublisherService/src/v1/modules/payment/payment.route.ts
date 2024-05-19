import { paymentController } from "./payment.controller";
import { paymentSchema } from "./payment.schema";

const uploadPaymentVoucher = {
	method: "POST",
	url: "/v1/payment/:idBooking/voucher/upload",
	schema: {
		tags: ["v1"],
		summary: "Upload of payment voucher",
		consumes: ["multipart/form-data"],
		...paymentSchema.uploadPaymentVoucher,
	},
	handler: paymentController.uploadPaymentVoucher,
};

export const paymentRouteV1 = [uploadPaymentVoucher];
