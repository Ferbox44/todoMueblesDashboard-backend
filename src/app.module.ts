import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LandingPageModule } from './landing-page/landing-page.module';
import { UploadModule } from './upload/upload.module';
import configuration from './config/configuration';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'cms_user',
      password: process.env.DB_PASSWORD || 'cms_password',
      database: process.env.DB_DATABASE || 'cms_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    AuthModule,
    LandingPageModule,
    UploadModule,
    FirebaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log(process.env.DB_USERNAME);
  }
} 