import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
import { typeormDataSource } from "../";
import { BookingInfo } from "../entities/bookingInfo.entity";

const repository = typeormDataSource.getRepository(
	"BookingInfo",
) as Repository<BookingInfo>;

export const bookingInfoRepository = {
	getRepository: repository,
	create: async (data: DeepPartial<BookingInfo>) => {
		const bookingInfo: BookingInfo = repository.create(data);
		return await repository.save(bookingInfo);
	},
};
