import { DataSource } from "typeorm";
import { env } from "../config";
import { BookingInfo } from "./entities/bookingInfo.entity";

export const typeormDataSource = new DataSource({
	type: env.db.name,
	url: env.db.url,
	entities: [BookingInfo],
	synchronize: true,
	logging: true,
});
