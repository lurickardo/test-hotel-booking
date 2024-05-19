import * as httpStatus from "http-status";
import { ObjectId } from "mongodb";
import { httpException } from "./error";

export const utils = {
	convertToObjectId: (id: string): ObjectId => {
		if (!/^[0-9a-fA-F]{24}$/.test(id))
			throw httpException("Booking not found.", httpStatus.NOT_FOUND);
		return new ObjectId(id);
	},
};
