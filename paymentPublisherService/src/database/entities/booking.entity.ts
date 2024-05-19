import type { ObjectId } from "mongodb";
import { Entity, Column, BaseEntity, ObjectIdColumn } from "typeorm";

const BookingStatus = {
	PENDENTE: "pendente",
	CONCLUIDO: "concluido",
} as const;

type BookingStatusType = keyof typeof BookingStatus;

const PaymentMethod = {
	PIX: "pendente",
	BOLETO: "concluido",
	SALDO: "saldo",
} as const;

type PaymentMethodType = keyof typeof PaymentMethod;

@Entity("bookings")
export class Booking {
	@ObjectIdColumn({ name: "_id" })
	_id: ObjectId;

	@ObjectIdColumn()
	customerId: ObjectId;

	@Column()
	customerName: string;

	@Column({ type: "decimal" })
	vlBooking: number;

	@Column({ type: "date" })
	dtCheckIn: Date;

	@Column({ type: "date" })
	dtCheckOut: Date;

	@Column({ type: "integer" })
	room: number;

	@Column({
		type: "enum",
		enum: PaymentMethod,
		nullable: false,
	})
	paymentType: PaymentMethodType;

	@Column({
		type: "enum",
		enum: BookingStatus,
		default: BookingStatus.PENDENTE,
	})
	status: BookingStatusType;
}
