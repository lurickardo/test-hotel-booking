import { ObjectId } from "mongodb";
import { Entity, Column, ObjectIdColumn } from "typeorm";

@Entity("bookingInfos")
export class BookingInfo {
	@ObjectIdColumn()
	_id: ObjectId;

	@ObjectIdColumn({ nullable: false })
	idBooking: ObjectId;

	@Column({ type: "string", length: 8, nullable: false, unique: true })
	codeBookingInfo: string;

	@Column({ type: "string", nullable: false })
	fileUrl: string;
}
