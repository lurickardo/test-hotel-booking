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
			s3: {
				paymentVoucher: {
					bucket: string;
					folder: string;
				};
			};
			sqs: {
				urlQueues: {
					bookingNotifications: string;
				};
			};
			ses: {
				templates: {
					bookingAproved: string;
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
			s3: {
				paymentVoucher: {
					bucket: process.env.S3_BUCKET_PAYMENT_VOUCHER,
					folder: process.env.S3_FOLDER_PAYMENT_VOUCHER,
				},
			},
			sqs: {
				urlQueues: {
					bookingNotifications: process.env.SQS_QUEUE_BOOKING_NOTIFICATIONS,
				},
			},
			ses: {
				templates: {
					bookingAproved: process.env.SES_TEMPLATE_BOOKING_APROVED,
				},
			},
		},
	},
} as Env);
