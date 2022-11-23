import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { MovieModule } from './movie/movie.module';
import authConfig from './config/authConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig],
    }),
    CategoryModule,
    PrismaModule,
    MovieModule,
  ],
})
export class AppModule {}
