import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto, SignInDto } from './dto';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import authConfig from 'src/config/authConfig';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async signUp(dto: AuthDto) {
    try {
      const { email, password, firstName, lastName } = dto;
      const hashPassword = await argon2.hash(password);
      const user = await this.prisma.user.create({
        data: {
          firstname: firstName,
          lastname: lastName,
          email,
          password: hashPassword,
        },
      });
      console.log(this.signToken(user.id, user.email));
      return { token: this.signToken(user.id, user.email), user };
    } catch (error) {
      console.log(error);
    }
  }
  async signIn(dto: SignInDto) {
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
    return {
      token: this.signToken(user.id, user.email),
    };
  }

  signToken(userId: number, email: string) {
    const payload = {
      id: userId,
      email,
    };
    return this.jwt.sign(payload, {
      expiresIn: '1d',
    });
  }
}
