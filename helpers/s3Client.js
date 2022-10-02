const S3 = require('aws-sdk/clients/s3');

/* const config = require('../config/config');

const accessKeyId = config.development.awsKey;
const secretAccessKey = config.development.awsSecret; */

const accessKeyId = process.env.AWS_KEY;
const secretAccessKey = process.env.AWS_SECRET;

const s3Client = new S3({
  accessKeyId,
  secretAccessKey,
});

module.exports = { s3Client };
