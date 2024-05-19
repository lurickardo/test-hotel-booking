import * as application from "../../package.json";

type Env = {
	app: { port: number; environment: string };
	plugins: { swagger: { basePath: string } };
	stripPrefix: { path: string };
	db: { name: "mongodb"; url: string };
	providers: {
		aws: {
			region: string;
			accessKeyId: string;
			secretAccessKey: string;
			sqs: {
				urlQueues: {
					bookings: string;
				};
			};
		};
	};
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
	},
	stripPrefix: {
		path: `/api/${application.name.replace(/-/g, "")}`,
	},
	db: {
		name: process.env.DB_NAME,
		url: process.env.DB_URL,
	},
	providers: {
		aws: {
			region: process.env.AWS_REGION,
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
			sqs: {
				urlQueues: {
					bookings: process.env.SQS_QUEUE_BOOKINGS,
				},
			},
		},
	},
} as Env);
