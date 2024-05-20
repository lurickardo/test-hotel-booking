export const PaymentMethod = {
	PIX: "PIX",
	BOLETO: "BOLETO",
	BALANCE: "BALANCE",
} as const;

export type PaymentMethodType = keyof typeof PaymentMethod;
