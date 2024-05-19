import { bookingController } from "./booking.controller";
import { bookingSchema } from "./booking.schema";

const create = {
	method: "POST",
	url: "/v1/booking",
	schema: {
		tags: ["v1"],
		summary: "Create booking.",
		...bookingSchema.create,
	},
	handler: bookingController.create,
};

export const bookingRouteV1 = [create];
