import fastify, { type FastifyInstance } from "fastify";
import { routes } from "./app.module";
import { env } from "./config";
import { errorHandler } from "./config/error";
import { registerPlugins } from "./plugins";

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

		await server.listen({ port: env.app.port || 3000, host: "::" });
	} catch (error) {
		process.stdout.write(`\n\x1b[31mSERVER ERROR: ${error}\x1b[0m\n`);
		process.exit(1);
	}
}

bootstrap();
