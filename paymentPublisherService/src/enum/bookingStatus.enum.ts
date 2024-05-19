const BookingStatus = {
	PENDENTE: "pendente",
	CONCLUIDO: "concluido",
} as const;

type BookingStatusType = keyof typeof BookingStatus;
