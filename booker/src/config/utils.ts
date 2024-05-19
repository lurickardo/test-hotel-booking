import * as httpStatus from "http-status";
import { httpException } from "./error";

export const utils = {
	dateFormat: (value: string, fieldName): string => {
		const date = new Date(value);
		if (isNaN(date.getTime())) {
			throw httpException(
				[`${fieldName}: Invalid date format`],
				httpStatus.BAD_REQUEST,
			);
		}
		return date.toISOString();
	},
};
