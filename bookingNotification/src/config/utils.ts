import { ObjectId } from "mongodb";
import { exception } from "./error";

export const utils = {
	convertToObjectId: (id: string): ObjectId => {
		if (!/^[0-9a-fA-F]{24}$/.test(id))
			throw exception("Template message not found.");
		return new ObjectId(id);
	},
};
