const AWS = require('aws-sdk');
require('dotenv').config();
const config ={
    apiVersion:'2023-09-26',
    region:process.env.AWS_DEFAULT_REGION,
    accessKeyId:process.env.AWS_ACCESSKEYID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    AWS_SDK_LOAD_CONFIG:1,
    bucketName:process.env.AWS_BUCKET_NAME,
};

const DynamoDBConnection = (config) =>{
    try {
        AWS.config.update(config);
        const DB = new AWS.DynamoDB.DocumentClient();
        console.log('[INFO] connected To DynamoDB');
        return DB;
    } catch (error) {
        console.log('[ERROR] Error connecting to DynamoDB', error);
    }
};

const AwsS3Connection =(config)=>{
    try {

        const AwsS3Connection = new AWS.S3(config);
        console.log('[INFO] connected To S3BUCKET');
        return AwsS3Connection;
    } catch (error) {
        console.log('[ERROR] Error connecting to S3BUCKET', error);
    }
}
const DynamoDB = DynamoDBConnection(config);
const AWSS3 = AwsS3Connection(config);

module.exports = {DynamoDB,AWSS3};