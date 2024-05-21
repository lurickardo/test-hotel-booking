import fastify, { FastifyInstance } from "fastify";
import { routes } from "./app.module";
import { env } from "./config";
import { errorHandler } from "./config/error";
import { registerPlugins } from "./plugins";
import { typeormDataSource } from "./database";
import { initRedis } from "./plugins/redis";

const server: FastifyInstance = fastify({
	logger: true,
});

async function bootstrap(): Promise<void> {
	try {
		server.setErrorHandler((error, request, reply) =>
			errorHandler(error, request, reply),
		);
		registerPlugins(server, env);
		server.register(routes, { prefix: env.stripPrefix.path });

		if (!typeormDataSource.isInitialized)
			typeormDataSource
				.initialize()
				.then(() => {
					process.stdout.write(
						"\n\x1b[32mConnection to database successful!\x1b[0m\n",
					);
				})
				.catch((error) => {
					process.stdout.write(
						`\n\x1b[31mERROR: Unable to connect to the database: ${error}\x1b[0m\n`,
					);
				});

		await initRedis();
		await server.listen({ port: env.app.port || 3000, host: "::" });
	} catch (error) {
		process.stdout.write(`\n\x1b[31mSERVER ERROR: ${error}\x1b[0m\n`);
		process.exit(1);
	}
}

bootstrap();
