export const bookingSchema = {
	create: {
		body: {
			type: "object",
			properties: {
				customerEmail: {
					type: "string",
				},
				customerName: {
					type: "string",
				},
				vlBooking: {
					type: "string",
				},
				dtCheckIn: {
					type: "string",
				},
				dtCheckOut: {
					type: "string",
				},
				room: {
					type: "integer",
				},
				paymentMethod: {
					type: "string",
				},
			},
			required: [
				"customerEmail",
				"customerName",
				"vlBooking",
				"dtCheckIn",
				"dtCheckOut",
				"room",
				"paymentMethod",
			],
		},
	},
};
