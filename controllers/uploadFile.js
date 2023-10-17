const {AWSS3} = require("../db/db");

const FileUpload = (FileDataval, FileName) => {
  return new Promise((resolve, reject) => {
    const FileData = FileDataval;
    const fileName = FileName;

    const folderName = 'test';
    const keyName = folderName + '/' + FileName;

    if (!FileData) {
      reject('FileData is empty');
      return false;
    }

    const pdfBuffer = Buffer.from(FileData, 'base64');

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: keyName,
      Body: pdfBuffer,
      ContentType: 'application/octet-stream',
    };

    // Upload the file to S3
    AWSS3.upload(params, (err, data) => {
      if (err) {
        console.error(err);
        reject(false);
        return false
      } else {
        console.log('File uploaded successfully to S3:', data.Location);
        resolve(data.Location);
      }
    });
  });
};

module.exports = { FileUpload };
