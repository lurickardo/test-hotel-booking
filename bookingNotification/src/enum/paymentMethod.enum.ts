export const PaymentMethod = {
	PIX: "PIX",
	BILL: "BILL",
	BALANCE: "BALANCE",
} as const;

export type PaymentMethodType = keyof typeof PaymentMethod;

const PaymentMethodTranslations: Record<PaymentMethodType, string> = {
	PIX: "Pix",
	BILL: "Boleto",
	BALANCE: "Saldo",
};

export const translatePaymentMethod = (method: PaymentMethodType): string => {
	return PaymentMethodTranslations[method];
};
