import { Controller, Get, HttpCode, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';
import { JwtAuthGuard } from 'src/auth/strategy';

@Controller('users')
export class UserController {
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getUsers(@GetUser() user: User, @GetUser('username') email: string) {
    return user;
  }
}
