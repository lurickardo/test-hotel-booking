import * as HttpStatus from "http-status";
import { httpException } from "../../../../src/config/error";
import type { CreateCustomerDto, BalanceDto } from "./dto";
import { customerRepository } from "./customer.repository";
import { utils } from "../../../config/utils";
import type { Customer } from "../../../database/entities/customer.entity";

export const customerService = {
	create: async (createCustomerDto: CreateCustomerDto) => {
		try {
			createCustomerDto.password = await utils.genHash(
				createCustomerDto.password,
			);
			const customer: Customer = await customerRepository.create({
				...createCustomerDto,
				balance: 0,
				version: 1,
			});
			return utils.filterAttributes(customer, ["_id", "password", "version"]);
		} catch (error) {
			throw error;
		}
	},
	addBalance: async (email, balanceDto: BalanceDto) => {
		try {
			const customer: Customer = await customerRepository.findOneBy({
				email,
			});
			if (!customer)
				throw httpException("Customer not found.", HttpStatus.NOT_FOUND);

			const newBalance = Number(
				(customer.balance + balanceDto.amount).toFixed(6),
			);

			const updatedCustomer = await customerRepository.update(customer, {
				balance: newBalance,
				version: customer.version + 1,
			});

			return { email, balance: updatedCustomer.balance };
		} catch (error) {
			if (error.message === "Optimistic lock error: Version mismatch")
				throw httpException(
					"Concurrent update error. Please try again.",
					HttpStatus.CONFLICT,
				);
			throw error;
		}
	},
};
