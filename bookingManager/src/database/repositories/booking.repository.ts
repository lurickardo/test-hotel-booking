import type {
	DeepPartial,
	FindManyOptions,
	FindOptionsWhere,
	Repository,
} from "typeorm";
import { typeormDataSource } from "../../database";
import type { Booking } from "../../database/entities/booking.entity";

const repository = typeormDataSource.getRepository(
	"Booking",
) as Repository<Booking>;

export const bookingRepository = {
	getRepository: repository,
	findOneBy: async (criteria: FindOptionsWhere<Booking>): Promise<Booking> => {
		return await repository.findOneBy(criteria);
	},
	find: async (options: FindManyOptions<Booking>): Promise<Booking[]> => {
		return await repository.find(options);
	},
	create: async (data: DeepPartial<Booking>) => {
		const booking: Booking = repository.create(data);
		return await repository.save(booking);
	},
};
