import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import authConfig from './config/authConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig],
    }),
    AuthModule,
    UserModule,
    BookModule,
    CategoryModule,
    PrismaModule,
  ],
})
export class AppModule {}
