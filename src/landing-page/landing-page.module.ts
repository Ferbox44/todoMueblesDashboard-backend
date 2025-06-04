import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandingPageController } from './landing-page.controller';
import { LandingPageService } from './landing-page.service';
import { LandingPage } from './entities/landing-page.entity';
import { S3Service } from './s3.service';

@Module({
  imports: [TypeOrmModule.forFeature([LandingPage])],
  controllers: [LandingPageController],
  providers: [LandingPageService, S3Service],
  exports: [LandingPageService]
})
export class LandingPageModule {} 