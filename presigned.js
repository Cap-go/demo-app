import { S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "auto",
  endpoint: "https://****.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: "***",
    secretAccessKey: "***8"
  },
});

const bucketName = "capgo-test";
const objectKey = `${crypto.randomUUID()}.mp4`;

async function generatePresignedUrl() {
  try {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
      ContentType: "video/mp4"
    });

    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 1800 });

    console.log("Presigned URL for PUT (valid for 30 minutes):");
    console.log(presignedUrl);
    return presignedUrl;
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    throw error;
  }
}

generatePresignedUrl();
