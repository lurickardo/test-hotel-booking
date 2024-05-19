import { z } from "zod";
import { customerRepository } from "../customer.repository";
import { isUnique } from "../../../../config/validators/isUnique.validator";

const createCustomerSchema = z.object({
	name: z.string().max(45),
	email: z
		.string()
		.email()
		.refine(
			async (value) => {
				return !(await isUnique(
					customerRepository.getRepository,
					"email",
					value,
				));
			},
			{
				message: "Field that must be unique is already registered.",
			},
		),
	password: z
		.string()
		.min(8)
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/, {
			message:
				"The password must contain: more than 8 characters, uppercase characters, lowercase characters, numbers and a special character..",
		}),
});

export type CreateCustomerDto = z.infer<typeof createCustomerSchema>;

export const transformCreateCustomerDto = (
	data,
): Promise<CreateCustomerDto> => {
	return createCustomerSchema.parseAsync(data);
};
