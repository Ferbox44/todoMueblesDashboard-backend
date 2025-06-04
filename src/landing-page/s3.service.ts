import { Injectable } from '@nestjs/common';
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../config/aws.config';

@Injectable()
export class S3Service {
  private readonly bucketName = process.env.AWS_S3_BUCKET_NAME!;

  async uploadFile(file: any, type: 'image' | 'video'): Promise<string> {
    const fileExtension = file.originalname.split('.').pop();
    const key = `${type}s/${Date.now()}-${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    });

    await s3Client.send(command);

    return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
  }

  async deleteFile(url: string): Promise<void> {
    const key = url.split('.com/')[1];
    
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key
    });

    await s3Client.send(command);
  }
} 