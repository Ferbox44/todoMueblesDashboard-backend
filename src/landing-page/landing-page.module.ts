import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandingPageController } from './landing-page.controller';
import { LandingPageService } from './landing-page.service';
import { LandingPage } from './entities/landing-page.entity';
import { Hero } from './entities/hero.entity';
import { Service } from './entities/service.entity';
import { Video } from './entities/video.entity';
import { CompareSection } from './entities/compare-section.entity';
import { Brand } from './entities/brand.entity';
import { S3Service } from './s3.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LandingPage,
      Hero,
      Service,
      Video,
      CompareSection,
      Brand
    ])
  ],
  controllers: [LandingPageController],
  providers: [LandingPageService, S3Service],
  exports: [LandingPageService]
})
export class LandingPageModule {} 