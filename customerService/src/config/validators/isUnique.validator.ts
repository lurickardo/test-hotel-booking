import { Repository } from "typeorm";

export const isUnique = async <T>(
	repository: Repository<T>,
	field: string,
	value: string,
): Promise<boolean> => {
	const fieldExist = Boolean(
		(
			await repository.find({
				[field]: value,
			})
		).length,
	);

	return fieldExist;
};
