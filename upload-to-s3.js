import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import { GetObjectCommand, S3 } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import fs from 'fs'


const s3Client = new S3({
 forcePathStyle: false, // Configures to use subdomain/virtual calling format.
 endpoint: "https://blr1.digitaloceanspaces.com/",
 region: "us-east-1",
 credentials: {
  accessKeyId: process.env.SPACES_KEY,
  secretAccessKey: process.env.SPACES_SECRET
 }
});

const BUCKET_NAME = "zoom-downloads"


const uploadToS3 = async (filePath, transactionID) => {
 const resp = await s3Client.putObject({
  Bucket: BUCKET_NAME,
  Key: `${transactionID}.zip`,
  Body: fs.createReadStream(filePath)
 })

 return resp
}

const generatePresignedURL = async (transactionID, expirationDays) => {

 const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: `${transactionID}.zip` })
 const url = await getSignedUrl(s3Client, command, { expiresIn: expirationDays * 24 * 60 * 60 })

 return url
}


export {
 uploadToS3,
 generatePresignedURL
}