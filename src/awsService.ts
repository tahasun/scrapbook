import { ListObjectsCommand, S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { File } from "buffer";

const S3_BUCKET = "digital-scrapbook";

const client = new S3Client({
    region: "us-east-1",
    credentials: fromCognitoIdentityPool({
        clientConfig: {region: 'us-east-1'},
        identityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID,
    }),
});

export const getFiles =  async() => {
    const command = new ListObjectsCommand({Bucket: S3_BUCKET});
    return await client.send(command);
}

export const downloadFile = async(key: string) => {
    const command = new GetObjectCommand({Bucket: S3_BUCKET, Key: key});
    return await client.send(command);
}

export const uploadFile = async(key: string, file: Blob) => {
    const command = new PutObjectCommand({Bucket: S3_BUCKET, Key: `images/${key}`, Body: file })
    return await client.send(command);
}