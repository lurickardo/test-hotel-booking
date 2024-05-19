import type { FastifyInstance } from "fastify";
import { bookingRouteV1 } from "./v1/modules/booking/booking.route";

const registerRoutes = (server: FastifyInstance, routes: any[]): void => {
	routes.forEach((route) => {
		server.route(route);
	});
};

export const routes = async (server: FastifyInstance): Promise<void> => {
	registerRoutes(server, [...bookingRouteV1]);
};
