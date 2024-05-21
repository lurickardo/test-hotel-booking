export const paymentSchema = {
	uploadPaymentVoucher: {
		body: {
			properties: {
				paymentVoucher: {
					type: "object",
				},
			},
		},
	},
};
