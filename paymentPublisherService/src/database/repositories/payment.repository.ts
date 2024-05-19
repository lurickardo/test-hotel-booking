import type { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
import { typeormDataSource } from "../../database";
import type { PaymentVoucher } from "../../database/entities/paymentVoucher.entity";

const repository = typeormDataSource.getRepository(
	"PaymentVoucher",
) as Repository<PaymentVoucher>;

export const paymentVoucherRepository = {
	getRepository: repository,
	create: async (data: DeepPartial<PaymentVoucher>) => {
		const paymentVoucher: PaymentVoucher = repository.create(data);
		return await repository.save(paymentVoucher);
	},
};
