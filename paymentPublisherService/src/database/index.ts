import { DataSource } from "typeorm";
import { env } from "../config";
import { Booking } from "./entities/booking.entity";
import { PaymentVoucher } from "./entities/paymentVoucher.entity";

export const typeormDataSource = new DataSource({
	type: env.db.name,
	url: env.db.url,
	entities: [Booking, PaymentVoucher],
	synchronize: true,
	logging: true,
});
