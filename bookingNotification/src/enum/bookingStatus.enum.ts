export const BookingStatus = {
	PENDING: "PENDING",
	CONCLUDED: "CONCLUDED",
} as const;

export type BookingStatusType = keyof typeof BookingStatus;
