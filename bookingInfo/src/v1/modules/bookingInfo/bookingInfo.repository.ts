import { FindOptionsWhere, Repository } from "typeorm";
import { typeormDataSource } from "../../../database";
import { BookingInfo } from "../../../database/entities/bookingInfo.entity";

const repository = typeormDataSource.getRepository(
	"BookingInfo",
) as Repository<BookingInfo>;

export const bookingInfoRepository = {
	getRepository: repository,
	findOneBy: async (criteria: FindOptionsWhere<BookingInfo>) => {
		return await repository.findOneBy(criteria);
	},
};
