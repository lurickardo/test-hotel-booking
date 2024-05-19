const PaymentMethod = {
	PIX: "pendente",
	BOLETO: "concluido",
	SALDO: "saldo",
} as const;

type PaymentMethodType = keyof typeof PaymentMethod;
