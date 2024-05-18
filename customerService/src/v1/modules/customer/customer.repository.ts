import {
	DeepPartial,
	FindOptionsWhere,
	Repository,
	getRepository,
} from "typeorm";
import { typeormDataSource } from "../../../database";
import { Customer } from "../../../database/entities/customer.entity";

const repository = typeormDataSource.getRepository("Customer") as Repository<Customer>;

export const customerRepository = {
	getRepository: repository,
	create: async (data: DeepPartial<Customer>) => {
		const customer: Customer = repository.create(data);
		return await repository.save(customer);
	},
	findOneBy: async (criteria: FindOptionsWhere<Customer>) => {
		return await repository.findOneBy(criteria);
	},
	update: async (existing: Customer, updated: Partial<Customer>) => {
		return await repository.save({...existing, ...updated});
	},
};
