export const PaymentMethod = {
	PIX: "pendente",
	BOLETO: "concluido",
	SALDO: "saldo",
} as const;

export type PaymentMethodType = keyof typeof PaymentMethod;
