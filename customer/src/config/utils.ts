import * as bcrypt from "bcrypt";

export const utils = {
	filterAttributes: <Entity>(
		entity: Entity,
		propertiesToFilter: string[],
	): Partial<Entity> => {
		const filteredEntity = { ...entity };
		propertiesToFilter.forEach((property) => {
			delete filteredEntity[property];
		});
		return filteredEntity;
	},
	genHash: async (value: string): Promise<string> => {
		const numberSalt = 12;
		const salt: string = await bcrypt.genSalt(numberSalt);
		const hash: string = await bcrypt.hash(value, salt);

		return hash;
	},
};
