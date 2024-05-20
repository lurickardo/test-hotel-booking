import * as application from "../../package.json";

type Env = {
	app: { environment: string; delay: number };
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
					notifications: string;
				};
			};
			ses: {
				fromEmailAddress: string;
			};
		};
	};
};

export const env = Object.freeze({
	app: {
		environment: process.env.APP_ENVIRONMENT,
		delay: Number.parseInt(process.env.APP_DELAY) || 3000,
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
					notifications: process.env.SQS_QUEUE_BOOKING_NOTIFICATIONS,
				},
			},
			ses: {
				fromEmailAddress: process.env.SES_FROM_EMAIL_ADDRESS,
			},
		},
	},
} as Env);
