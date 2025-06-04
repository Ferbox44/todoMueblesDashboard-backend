import { Controller, Get, Patch, Body, UseGuards, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LandingPageService } from './landing-page.service';
import { LandingPage } from './entities/landing-page.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { S3Service } from './s3.service';
import { ListBucketsCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../config/aws.config';

@Controller('landing-page')
export class LandingPageController {
  constructor(
    private readonly landingPageService: LandingPageService,
    private readonly s3Service: S3Service
  ) {}

  @Get('test-aws')
  async testAwsConnection() {
    try {
      const command = new ListBucketsCommand({});
      const response = await s3Client.send(command);
      
      return {
        success: true,
        message: 'AWS credentials are valid',
        buckets: response.Buckets?.map(bucket => bucket.Name)
      };
    } catch (error) {
      return {
        success: false,
        message: 'AWS credentials are invalid',
        error: error.message
      };
    }
  }

  @Get('content')
  async getContent(): Promise<LandingPage> {
    return this.landingPageService.getContent();
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: any,
    @Body('type') type: 'image' | 'video'
  ): Promise<{ url: string }> {
    const url = await this.s3Service.uploadFile(file, type);
    return { url };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('hero')
  async updateHeroSection(@Body() heroContent: LandingPage['content']['hero']): Promise<LandingPage> {
    return this.landingPageService.updateHeroSection(heroContent);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('services')
  async updateServicesCarousel(@Body() services: LandingPage['content']['servicesCarousel']): Promise<LandingPage> {
    return this.landingPageService.updateServicesCarousel(services);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('videos')
  async updateVideos(@Body() videos: LandingPage['content']['videos']): Promise<LandingPage> {
    return this.landingPageService.updateVideos(videos);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('compare')
  async updateCompareSection(@Body() compareSection: LandingPage['content']['compareSection']): Promise<LandingPage> {
    return this.landingPageService.updateCompareSection(compareSection);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('brands')
  async updateBrandsCarousel(@Body() brands: LandingPage['content']['brandsCarousel']): Promise<LandingPage> {
    return this.landingPageService.updateBrandsCarousel(brands);
  }
} 