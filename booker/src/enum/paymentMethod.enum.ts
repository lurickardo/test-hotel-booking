export const PaymentMethod = {
	PIX: "PIX",
	BILL: "BILL",
	BALANCE: "BALANCE",
} as const;

export type PaymentMethodType = keyof typeof PaymentMethod;
export const paymentMethodsList = Object.values(PaymentMethod) as any;
