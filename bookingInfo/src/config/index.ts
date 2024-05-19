import * as application from "../../package.json";

type Env = {
	app: { port: number; environment: string };
	plugins: { swagger: { basePath: string }; redis: { url: string } };
	stripPrefix: { path: string };
	db: { name: "mongodb"; url: string };
};

export const env = Object.freeze({
	app: {
		port: Number(process.env.PORT),
		environment: process.env.APP_ENVIRONMENT,
	},
	plugins: {
		swagger: {
			basePath: Object.is(process.env.USE_ROUTE_PREFIX, "true")
				? `/api/${application.name.replace(/-/g, "")}/`
				: "/",
		},
		redis: {
			url: process.env.REDIS_URL,
		},
	},
	stripPrefix: {
		path: `/api/${application.name.replace(/-/g, "")}`,
	},
	db: {
		name: process.env.DB_NAME,
		url: process.env.DB_URL,
	},
} as Env);
