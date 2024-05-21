import {
	type PutObjectCommandInput,
	S3Client,
	type CompleteMultipartUploadCommandOutput,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { env } from "../config";
import * as path from "node:path";
import { randomUUID } from "node:crypto";

const s3Client = new S3Client({
	region: env.providers.aws.region,
	credentials: {
		accessKeyId: env.providers.aws.accessKeyId,
		secretAccessKey: env.providers.aws.secretAccessKey,
	},
});

interface UploadFile {
	file: any;
	bucket: string;
	folder: string;
	key?: string;
	extension?: "pdf";
}

export const s3Provider = {
	uploadFile: async ({
		file,
		bucket,
		folder,
		extension = "pdf",
	}: UploadFile): Promise<CompleteMultipartUploadCommandOutput> => {
		try {
			const params = {
				Bucket: bucket,
				Key: path.join(
					folder,
					`${randomUUID().replace(/-/g, "")}.${extension}`,
				),
				Body: file.file,
				ContentType: file.mimetype,
			} as PutObjectCommandInput;
			return await new Upload({ client: s3Client, params }).done();
		} catch (error) {
			throw error;
		}
	},
};
