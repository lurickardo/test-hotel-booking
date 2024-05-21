type Env = {
	app: { environment: string; delay: number };
	db: { name: "mongodb"; url: string };
	providers: {
		aws: {
			region: string;
			accessKeyId: string;
			secretAccessKey: string;
			sqs: {
				urlQueues: {
					bookings: string;
					bookingNotifications: string;
				};
			};
		};
	};
	templateEmails: {
		bookingSuccess: string;
		balanceInsufficient: string;
		roomConflict: string;
		customerNotFound: string;
	};
};

export const env = Object.freeze({
	app: {
		environment: process.env.APP_ENVIRONMENT,
		delay: Number.parseInt(process.env.APP_DELAY) || 3000,
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
					bookingNotifications: process.env.SQS_QUEUE_BOOKING_NOTIFICATIONS,
				},
			},
		},
	},
	templateEmails: {
		bookingSuccess: process.env.TEMPLATE_EMAIL_BOOKING_SUCCESS,
		balanceInsufficient: process.env.TEMPLATE_EMAIL_BALANCE_INSUFFICIENT,
		roomConflict: process.env.TEMPLATE_EMAIL_ROOM_CONFLICT,
		customerNotFound: process.env.TEMPLATE_EMAIL_CUSTOMER_NOT_FOUND,
	},
} as Env);
