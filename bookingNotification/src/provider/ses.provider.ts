import { errorHandler } from "./../config/error/index";
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
	recipients: string[];
	subject: string;
	htmlBody: string;
}

export const sesProvider = {
	sendMail: async ({
		recipients,
		subject,
		htmlBody,
	}: SendMailSES): Promise<SendEmailCommandOutput> => {
		try {
			const params = new SendEmailCommand({
				FromEmailAddress: env.providers.aws.ses.fromEmailAddress,
				Destination: {
					ToAddresses: recipients,
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
			errorHandler(error);
		}
	},
};
