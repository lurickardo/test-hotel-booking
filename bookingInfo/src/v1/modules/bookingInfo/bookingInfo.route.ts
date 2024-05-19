import { bookingInfoController } from "./bookingInfo.controller";
import { bookingInfoSchema } from "./bookingInfo.schema";

const findByCode = {
	method: "GET",
	url: "/v1/bookingInfo/:codeBookingInfo",
	schema: {
		tags: ["v1"],
		summary: "Get booking info.",
		...bookingInfoSchema.findByCode,
	},
	handler: bookingInfoController.findByCode,
};

export const bookingInfoRouteV1 = [findByCode];
