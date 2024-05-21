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
					paymentVouchers: string;
				};
			};
			ses: {
				fromEmailAddress: string;
			};
			s3: {
				bookingInfo: {
					bucket: string;
					folder: string;
				};
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
					paymentVouchers: process.env.SQS_QUEUE_PAYMENT_VOUCHERS,
				},
			},
			ses: {
				fromEmailAddress: process.env.SES_FROM_EMAIL_ADDRESS,
			},
			s3: {
				bookingInfo: {
					bucket: process.env.S3_BUCKET_BOOKING_INFO,
					folder: process.env.S3_FOLDER_BOOKING_INFO,
				},
			},
		},
	},
} as Env);
