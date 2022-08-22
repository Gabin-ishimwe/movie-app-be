import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signUp(dto: AuthDto) {
    try {
      const { email, password } = dto;
      const hashPassword = await argon2.hash(password);
      const user = await this.prisma.user.create({
        data: {
          firstname: '',
          lastname: '',
          email,
          password: hashPassword,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async signIn(dto: AuthDto) {
    const { email, password } = dto;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new ForbiddenException('User arleady exist');
    }
    const confirmPassword = await argon2.verify(user.password, password);
    if (!confirmPassword) {
      throw new ForbiddenException('Incorrect credentials');
    }
    return { msg: 'I sign In...' };
  }
}
