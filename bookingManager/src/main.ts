import { SQS } from "@aws-sdk/client-sqs";
import { queues } from "./app.module";
import { typeormDataSource } from "./database";
import { env } from "./config";

async function bootstrap(sqs: SQS): Promise<void> {
	try {
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
const sqsClient: SQS = new SQS({
	region: env.providers.aws.region,
	credentials: {
		accessKeyId: env.providers.aws.accessKeyId,
		secretAccessKey: env.providers.aws.secretAccessKey,
	},
});

setInterval(async () => {
	await bootstrap(sqsClient);
}, 2000);
