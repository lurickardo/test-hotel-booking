import {
	SESv2,
	SendEmailCommand,
	type SendEmailCommandOutput,
} from "@aws-sdk/client-sesv2";
import { env } from "../config";

const sesClient = new SESv2({
	region: env.providers.aws.region,
	credentials: {
		accessKeyId: env.providers.aws.accessKeyId,
		secretAccessKey: env.providers.aws.secretAccessKey,
	},
});

interface SendMailSES {
	to: string[];
	subject: string;
	htmlBody: string;
}

export const sesProvider = {
	sendMail: async ({
		to,
		subject,
		htmlBody,
	}: SendMailSES): Promise<SendEmailCommandOutput> => {
		try {
			const params = new SendEmailCommand({
				Destination: {
					ToAddresses: to,
				},
				Content: {
					Simple: {
						Subject: {
							Data: subject,
						},
						Body: {
							Html: {
								Data: htmlBody,
							},
						},
					},
				},
			});

			return await sesClient.send(params);
		} catch (error) {
			throw error;
		}
	},
};
