import { customerController } from "./customer.controller";
import { customerSchema } from "./customer.schema";

const create = {
	method: "POST",
	url: "/v1/customer",
	schema: {
		tags: ["v1"],
		summary: "Create customer",
		...customerSchema.create,
	},
	handler: customerController.create,
};

const addBalance = {
	method: "POST",
	url: "/v1/customer/:email/balance",
	schema: {
		tags: ["v1"],
		summary: "Add balance to customer",
		...customerSchema.addBalance,
	},
	handler: customerController.addBalance,
};

export const customerRouteV1 = [create, addBalance];
