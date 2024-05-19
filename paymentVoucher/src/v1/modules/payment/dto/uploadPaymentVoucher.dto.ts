import { z } from "zod";

const uploadPaymentVoucherSchema = z.object({
	paymentVoucher: z
		.any()
		.refine(
			(file) => file.fieldname === "paymentVoucher",
			"File 'paymentVoucher' is required",
		)
		.refine(
			(file) =>
				["image/jpeg", "image/png", "application/pdf"].includes(file.mimetype),
			"File type not supported, please send us. Only JPG, PNG or PDF are allowed.",
		),
});

export type PaymentVoucherDto = z.infer<typeof uploadPaymentVoucherSchema>;

export const transformUploadPaymentVoucherDto = (data): PaymentVoucherDto => {
	return uploadPaymentVoucherSchema.parse(data);
};
