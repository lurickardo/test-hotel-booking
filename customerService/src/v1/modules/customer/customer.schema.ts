export const customerSchema = {
	create: {
		body: {
			type: "object",
			properties: {
				name: {
					type: "string",
				},
				email: {
					type: "string",
				},
				password: {
					type: "string",
				},
			},
			required: ["name", "email", "password"],
		},
	},
	addBalance: {
		body: {
			type: "object",
			properties: {
				amount: {
					type: "number",
				},
			},
			required: ["amount"],
		},
	},
};
