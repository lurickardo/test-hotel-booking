import { DataSource } from "typeorm";
import { env } from "../config";
import { Booking } from "./entities/booking.entity";
import { Customer } from "./entities/customer.entity";

export const typeormDataSource = new DataSource({
	type: env.db.name,
	url: env.db.url,
	entities: [Booking, Customer],
	synchronize: true,
	logging: true,
});
