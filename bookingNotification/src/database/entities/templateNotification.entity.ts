import type { ObjectId } from "mongodb";
import { Entity, Column, ObjectIdColumn } from "typeorm";

@Entity("templateNotifications")
export class TemplateNotification {
	@ObjectIdColumn({ name: "_id" })
	_id: ObjectId;

	@Column({ type: "string", length: 70 })
	subject: string;

	@Column({ type: "string" })
	message: string;
}
