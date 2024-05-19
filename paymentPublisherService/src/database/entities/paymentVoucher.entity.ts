import type { ObjectId } from "mongodb";
import { Entity, Column, ObjectIdColumn } from "typeorm";

@Entity("paymentVouchers")
export class PaymentVoucher {
	@ObjectIdColumn({ name: "_id" })
	_id: ObjectId;

	@ObjectIdColumn()
	idBooking: ObjectId;

	@Column({ type: "string", length: 8,nullable: false })
	codeBookingInfo: string;

	@Column({ type: "string", nullable: false })
	fileUrl: string;
}
