import { DataSource } from "typeorm";
import { env } from "../config";
import { Customer } from "./entities/customer.entity";

export const typeormDataSource = new DataSource({
	type: env.db.name,
	url: env.db.url,
	entities: [Customer],
	synchronize: true,
	logging: true,
});
