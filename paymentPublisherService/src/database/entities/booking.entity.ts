import type { ObjectId } from "mongodb";
import { Entity, Column, ObjectIdColumn } from "typeorm";

@Entity("bookings")
export class Booking {
	@ObjectIdColumn({ name: "_id" })
	_id: ObjectId;

	@Column({ type: "string" })
	customerEmail: string;

	@Column({ type: "string" })
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
	paymentMethod: PaymentMethodType;

	@Column({
		type: "enum",
		enum: BookingStatus,
		default: BookingStatus.PENDENTE,
	})
	status: BookingStatusType;
}
