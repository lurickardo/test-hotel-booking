import type { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
import { typeormDataSource } from "../../database";
import type { Booking } from "../../database/entities/booking.entity";

const repository = typeormDataSource.getRepository(
	"Booking",
) as Repository<Booking>;

export const bookingRepository = {
	getRepository: repository,
	findOneBy: async (criteria: FindOptionsWhere<Booking>) => {
		return await repository.findOneBy(criteria);
	},
};
