import { FastifyInstance, RouteOptions } from "fastify";
import { customerRouteV1 } from "./v1/modules/customer/customer.route";

const registerRoutes = (server: FastifyInstance, routes: any[]): void => {
	routes.forEach((route) => {
		server.route(route);
	});
};

export const routes = async (server: FastifyInstance): Promise<void> => {
	registerRoutes(server, [...customerRouteV1]);
};
