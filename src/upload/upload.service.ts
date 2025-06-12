import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class UploadService {
  private s3Client: S3Client;
  private readonly logger = new Logger(UploadService.name);

  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');

    if (!region || !accessKeyId || !secretAccessKey) {
      this.logger.error('AWS configuration is missing');
      throw new Error('AWS configuration is missing');
    }

    this.logger.log(`Initializing S3 client with region: ${region}`);
    this.s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    this.logger.log(`Starting file upload: ${file.originalname}, size: ${file.size}, type: ${file.mimetype}`);
    
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    if (!bucketName) {
      this.logger.error('AWS S3 bucket name is not configured');
      throw new Error('AWS S3 bucket name is not configured');
    }
    
    const key = `uploads/${Date.now()}-${file.originalname}`;
    this.logger.log(`Generated S3 key: ${key}`);

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    try {
      this.logger.log(`Sending file to S3 bucket: ${bucketName}`);
    await this.s3Client.send(command);
      this.logger.log('File successfully uploaded to S3');
      
      const fileUrl = `https://${bucketName}.s3.${this.configService.get<string>('AWS_REGION')}.amazonaws.com/${key}`;
      this.logger.log(`Generated file URL: ${fileUrl}`);
      return fileUrl;
    } catch (error) {
      this.logger.error('Failed to upload file to S3:', error);
      throw error;
    }
  }

  async listImages(): Promise<{ url: string; key: string }[]> {
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    if (!bucketName) {
      throw new Error('AWS S3 bucket name is not configured');
    }

    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: 'uploads/',
    });

    const response = await this.s3Client.send(command);
    const region = this.configService.get<string>('AWS_REGION');

    return (response.Contents || [])
      .filter(item => item.Key?.match(/\.(jpg|jpeg|png|gif|webp)$/i))
      .map(item => ({
        key: item.Key!,
        url: `https://${bucketName}.s3.${region}.amazonaws.com/${item.Key}`
      }));
  }

  async listVideos(): Promise<{ url: string; key: string }[]> {
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    if (!bucketName) {
      throw new Error('AWS S3 bucket name is not configured');
    }

    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: 'uploads/',
    });

    const response = await this.s3Client.send(command);
    const region = this.configService.get<string>('AWS_REGION');

    return (response.Contents || [])
      .filter(item => item.Key?.match(/\.(mp4|webm|mov)$/i))
      .map(item => ({
        key: item.Key!,
        url: `https://${bucketName}.s3.${region}.amazonaws.com/${item.Key}`
      }));
  }

  async getSignedUrl(key: string): Promise<string> {
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    if (!bucketName) {
      throw new Error('AWS S3 bucket name is not configured');
    }
    
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    return getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
  }
} 