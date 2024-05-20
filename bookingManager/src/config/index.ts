type Env = {
	app: { amqpUrl: string; environment: string };
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
		environment: process.env.APP_ENVIRONMENT,
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
