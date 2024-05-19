export const BookingStatus = {
	PENDENTE: "pendente",
	CONCLUIDO: "concluido",
} as const;

export type BookingStatusType = keyof typeof BookingStatus;
