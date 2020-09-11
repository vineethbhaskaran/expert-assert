import config from "../config";
import AWS from "aws-sdk";
import * as logger from "../logger/customLogger";

const AWS_ACCESS_KEY_ID=config.aws.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY=config.aws.AWS_SECRET_ACCESS_KEY;
const AWS_S3_BUCKET_NAME=config.aws.AWS_S3_BUCKET_NAME;

export default class AwsS3Util {
  static readonly s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  });

  static uploadToS3(file: any) {
    const s3params = {
      Bucket: AWS_S3_BUCKET_NAME,
      Key: file.originalname, // File name you want to save as in S3
      Body: file.stream,
      ContentType: file.mimetype,
    };

    AwsS3Util.s3.upload(s3params, function (err: { message: string }, response: any) {
      if (err) {
        logger.logMessage(err.message);
      } else {
        logger.logMessage("The file uploaded successfully");
      }
    });
  }
}
