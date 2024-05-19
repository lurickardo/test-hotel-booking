import { z } from "zod";

const balanceSchema = z.object({
	amount: z.number().int().positive(),
});

export type BalanceDto = z.infer<typeof balanceSchema>;

export const transformBalanceDto = (data): BalanceDto => {
	return balanceSchema.parse(data);
};
