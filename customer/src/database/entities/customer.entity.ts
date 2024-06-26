import type { ObjectId } from "mongodb";
import { Entity, Column, ObjectIdColumn, VersionColumn } from "typeorm";

@Entity("customers")
export class Customer {
	@ObjectIdColumn()
	_id: ObjectId;

	@Column({ type: "string", length: 45, nullable: false })
	name: string;

	@Column({ type: "string", length: 256, nullable: false, unique: true })
	email: string;

	@Column({ type: "string", length: 60, nullable: false })
	password: string;

	@Column({ type: "decimal", nullable: false, default: 0 })
	balance: number;

	@VersionColumn()
	version: number;
}
