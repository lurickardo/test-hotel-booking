import {
	type PutObjectCommandInput,
	S3Client,
	type CompleteMultipartUploadCommandOutput,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { env } from "../config";
import * as path from "node:path";
import { v4 as uuidv4 } from "uuid";

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
}

export const s3Provider = {
	uploadFile: async ({
		file,
		bucket,
		folder,
	}: UploadFile): Promise<CompleteMultipartUploadCommandOutput> => {
		try {
			const params = {
				Bucket: bucket,
				Key: path.join(
					folder,
					`${uuidv4().replace(/-/g, "")}.${file.filename.split(".").pop()}`,
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
