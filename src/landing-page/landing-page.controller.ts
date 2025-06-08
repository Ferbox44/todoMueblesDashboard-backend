import { Controller, Get, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LandingPageService } from './landing-page.service';
import { S3Service } from './s3.service';
import { Hero } from './entities/hero.entity';
import { Service } from './entities/service.entity';
import { Video } from './entities/video.entity';
import { CompareSection } from './entities/compare-section.entity';
import { Brand } from './entities/brand.entity';

@Controller('landing-page')
export class LandingPageController {
  constructor(
    private readonly landingPageService: LandingPageService,
    private readonly s3Service: S3Service,
  ) {}

  @Get()
  async getContent() {
    return this.landingPageService.getContent();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const url = await this.s3Service.uploadFile(file);
    return { url };
  }

  @Post('hero')
  async updateHeroSection(@Body() heroData: Partial<Hero>) {
    return this.landingPageService.updateHeroSection(heroData);
  }

  @Post('services')
  async updateServicesCarousel(@Body() services: Partial<Service>[]) {
    return this.landingPageService.updateServicesCarousel(services);
  }

  @Post('videos')
  async updateVideos(@Body() videos: Partial<Video>[]) {
    return this.landingPageService.updateVideos(videos);
  }

  @Post('compare')
  async updateCompareSection(@Body() compareData: Partial<CompareSection>) {
    return this.landingPageService.updateCompareSection(compareData);
  }

  @Post('brands')
  async updateBrandsCarousel(@Body() brands: Partial<Brand>[]) {
    return this.landingPageService.updateBrandsCarousel(brands);
  }
} 