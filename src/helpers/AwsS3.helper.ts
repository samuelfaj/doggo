import * as AWS from "aws-sdk";
import sharp from "sharp"; // Adicionado para conversão de imagens
import { fileTypeFromBuffer } from "file-type";

const pako = require("pako");

export default class AwsS3Helper {
	static readonly S3: AWS.S3 = new AWS.S3({
		accessKeyId: process.env.AWS_ACCESSKEY,
		secretAccessKey: process.env.AWS_SECRETKEY,
		region: process.env.AWS_REGION || "us-east-1",
	});
	static bucket: string = process.env.AWS_S3_BUCKET;
	static readonly folder: string = `decore.ai`;

	static async file(
		name: string,
		buffer: Buffer,
		options = {
			cacheControl: "31536000",
			convertJpg: true,
			gzip: true,
			consoleLogProgress: false,
		},
	): Promise<string> {
		return new Promise(async (resolve, reject) => {
			let gzipped = false;
			let contentType = undefined;

			const fileTypeResult = await fileTypeFromBuffer(buffer);

			if (fileTypeResult) {
				contentType = fileTypeResult.mime;

				if (options.convertJpg) {
					if (
						fileTypeResult &&
						fileTypeResult.mime.startsWith("image/") &&
						fileTypeResult.mime !== "image/jpeg"
					) {
						buffer = await sharp(buffer).jpeg().toBuffer();
						name = name.replaceAll(".", "_") + ".jpg";
					}
				}

				if (options.gzip) {
					buffer = pako.gzip(buffer);
					gzipped = true;
				}
			}

			const upload = this.S3.upload(
				{
					ACL: "public-read",
					Bucket: this.bucket,
					Key: `${this.folder}/${name}`,
					Body: buffer,
					CacheControl: `max-age=${options.cacheControl}`,
					ContentType: contentType,
					ContentEncoding: gzipped ? "gzip" : undefined,
				},
				(error: Error, data: any) => {
					if (error) {
						reject(error);
					} else {
						resolve(data.Location);
					}
				},
			);

			upload.on("httpUploadProgress", (progress) => {
				let percentage = Math.floor(
					(progress.loaded / progress.total) * 100,
				);
				if (options.consoleLogProgress) {
					console.log(`AWS file - Upload progress: ${percentage}%`);
				}
			});
		});
	}
}
