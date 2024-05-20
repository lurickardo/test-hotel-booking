import { SQS } from "@aws-sdk/client-sqs";
import { queues } from "./app.module";
import { typeormDataSource } from "./database";

async function bootstrap(sqs: SQS): Promise<void> {
	try {
		//TODO: Make the service listen to the SQS queue all the time
		if (!typeormDataSource.isInitialized)
			typeormDataSource
				.initialize()
				.then(() => {
					process.stdout.write(
						"\n\x1b[32mConnection to database successful!\x1b[0m\n",
					);
				})
				.catch((error) => {
					process.stdout.write(
						`\n\x1b[31mERROR: Unable to connect to the database: ${error}\x1b[0m\n`,
					);
				});

		queues(sqs);
	} catch (error) {
		process.stdout.write(`\n\x1b[31mSERVER ERROR: ${error}\x1b[0m\n`);
		process.exit(1);
	}
}
(async () => {
	const sqsClient: SQS = new SQS({
		region: process.env.AWS_REGION,
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		},
	});

	await bootstrap(sqsClient);
})();
