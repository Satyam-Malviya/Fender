const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});


const uploadFile = async(file) => {
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
    };
    try {
        const result = await s3.upload(params).promise();
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};


const generateSignedUrl = async(fileName) => {
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: fileName,
        Expires: 60 * 5, // URL expires in 5 minutes
    };
    try {
        const url = await s3.getSignedUrlPromise('getObject', params);
        return url;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { uploadFile, generateSignedUrl };