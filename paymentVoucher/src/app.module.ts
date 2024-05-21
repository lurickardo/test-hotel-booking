import { FastifyInstance } from "fastify";
import { paymentRouteV1 } from "./v1/modules/payment/payment.route";

const registerRoutes = (server: FastifyInstance, routes: any[]): void => {
	routes.forEach((route) => {
		server.route(route);
	});
};

export const routes = async (server: FastifyInstance): Promise<void> => {
	registerRoutes(server, [...paymentRouteV1]);
};
