import { DataSource } from "typeorm";
import { env } from "../config";
import { TemplateNotification } from "./entities/templateNotification.entity";

export const typeormDataSource = new DataSource({
	type: env.db.name,
	url: env.db.url,
	entities: [TemplateNotification],
	synchronize: true,
	logging: true,
});
