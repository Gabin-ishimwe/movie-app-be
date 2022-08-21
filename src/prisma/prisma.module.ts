import { Global, Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  exports: [PrismaService],
  providers: [PrismaService],
})
export class PrismaModule extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://andelarwanda:andela123@localhost:5432/nestJsDb',
        },
      },
    });
  }
}
