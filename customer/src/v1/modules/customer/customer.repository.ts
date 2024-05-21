import type { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
import { typeormDataSource } from "../../../database";
import type { Customer } from "../../../database/entities/customer.entity";

const repository = typeormDataSource.getRepository(
	"Customer",
) as Repository<Customer>;

export const customerRepository = {
	getRepository: repository,
	create: async (data: DeepPartial<Customer>) => {
		const customer: Customer = repository.create(data);
		return await repository.save(customer);
	},
	findOneBy: async (criteria: FindOptionsWhere<Customer>) => {
		return await repository.findOneBy(criteria);
	},
	async update(
		customer: Customer,
		updateData: Partial<Customer>,
	): Promise<Customer> {
		const existingCustomer = await repository.findOneBy({
			_id: customer._id,
		});

		if (existingCustomer.version + 1 !== updateData.version) {
			throw new Error("Optimistic lock error: Version mismatch");
		}

		return repository.save({ ...existingCustomer, ...updateData });
	},
};
