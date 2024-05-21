import { DataSource } from "typeorm";
import { env } from "../config";
import { TemplateNotification } from "./entities/templateNotification.entity";
import { Booking } from "./entities/booking.entity";
import { BookingInfo } from "./entities/bookingInfo.entity";

export const typeormDataSource = new DataSource({
	type: env.db.name,
	url: env.db.url,
	entities: [TemplateNotification, Booking, BookingInfo],
	synchronize: true,
	logging: true,
});
