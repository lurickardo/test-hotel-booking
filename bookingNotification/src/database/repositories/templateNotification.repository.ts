import type { FindOptionsWhere, Repository } from "typeorm";
import { typeormDataSource } from "../../database";
import type { TemplateNotification } from "../../database/entities/templateNotification.entity";

const repository = typeormDataSource.getRepository(
	"TemplateNotification",
) as Repository<TemplateNotification>;

export const templateNotificationRepository = {
	getRepository: repository,
	findOneBy: async (
		criteria: FindOptionsWhere<TemplateNotification>,
	): Promise<TemplateNotification> => {
		return await repository.findOneBy(criteria);
	},
};
