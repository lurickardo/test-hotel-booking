import * as HttpStatus from "http-status";
import { httpException } from "../../../../src/config/error";
import { bookingInfoRepository } from "./bookingInfo.repository";
import { BookingInfo } from "../../../database/entities/bookingInfo.entity";
import { redisClient } from "../../../plugins/redis";

export const bookingInfoService = {
	findByCode: async (codeBookingInfo: string) => {
		try {
			const bookingInfoCache = await redisClient.get(
				`bookingInfo:findByCode:${codeBookingInfo}`,
			);
			if (bookingInfoCache) {
				return JSON.parse(bookingInfoCache);
			}

			const bookingInfo: BookingInfo = await bookingInfoRepository.findOneBy({
				codeBookingInfo,
			});
			if (!bookingInfo)
				throw httpException(
					"Reservation information not found.",
					HttpStatus.NOT_FOUND,
				);

			const response = {
				message: "Booking PDF sent to your email.",
				bookingInfoUrl: bookingInfo.fileUrl,
			};

			await redisClient.set(
				`bookingInfo:findByCode:${codeBookingInfo}`,
				JSON.stringify(response),
				{EX: 60 * 60 * 24}
			);

			return response;
		} catch (error) {
			throw error;
		}
	},
};
