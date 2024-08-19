import { ListObjectsCommand, S3Client } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

const S3_BUCKET = "digital-scrapbook";

const client = new S3Client({
    region: "us-east-1",
    credentials: fromCognitoIdentityPool({
        clientConfig: {region: 'us-east-1'},
        identityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID,
    }),
});


// export const createClient = () => {
    
// }

export const getFiles =  async() => {
    const command = new ListObjectsCommand({Bucket: S3_BUCKET});
    return await client.send(command);
}

export const uploadFile = async(file: Blob) => {
    console.log('will be implemented');
}