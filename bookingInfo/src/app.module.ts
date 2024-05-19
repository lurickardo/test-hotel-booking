import { FastifyInstance, RouteOptions } from "fastify";
import { bookingInfoRouteV1 } from "./v1/modules/bookingInfo/bookingInfo.route";

const registerRoutes = (server: FastifyInstance, routes: any[]): void => {
	routes.forEach((route) => {
		server.route(route);
	});
};

export const routes = async (server: FastifyInstance): Promise<void> => {
	registerRoutes(server, [...bookingInfoRouteV1]);
};
