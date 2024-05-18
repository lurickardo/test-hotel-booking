import { createClient } from "redis";
import { env } from "../config/";

export const redisClient = createClient({ url: env.plugins.redis.url });

export const initRedis = async () => {
	try {
		await redisClient.connect();
		process.stdout.write("\n\x1b[32mRedis connected.\x1b[0m\n");
	} catch (error) {
		process.stdout.write("\n\x1b[31mRedis connection failed.\x1b[0m\n");
	}
};
