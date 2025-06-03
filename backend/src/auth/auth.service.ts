import { Injectable, NotFoundException, BadRequestException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Auth } from './models/auth.model';
import { hash, compare } from 'bcryptjs';
import { HASH_ROUNDS, JWT_REFRESH_EXPIRE } from '../utils/constants';
import { SignupInput } from './dto/signup.dto';
import { LoginInput } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async hashPassword(password: string) {
    return hash(password, HASH_ROUNDS);
  }

  async validatePassword(password: string, hashedPassword: string) {
    return compare(password, hashedPassword);
  }

  async signup(payload: SignupInput): Promise<Auth> {
    const hashedPassword = await this.hashPassword(payload.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          ...payload,
          password: hashedPassword,
        },
      });

      return this.generateToken(user.id);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException(`User already exists`);
      } else {
        throw new Error(e);
      }
    }
  }

  async login(data: LoginInput): Promise<Auth> {
    const { email, password } = data;
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`Invalid credentials`);
    }

    const passwordValid = await this.validatePassword(password, user.password);

    if (!passwordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    return this.generateToken(user.id);
  }

  validateUser(userId: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  getUserFromToken(token: string): Promise<User> {
    const id = this.jwtService.decode(token)['id'];
    return this.prisma.user.findUnique({ where: { id } });
  }

  async generateToken(userId: number): Promise<Auth> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const accessToken = this.jwtService.sign({ id: userId });

    const refreshToken = this.jwtService.sign(
      { id: userId },
      {
        expiresIn: JWT_REFRESH_EXPIRE,
      },
    );

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  refreshToken(token: string) {
    try {
      const { userId } = this.jwtService.verify(token);

      return this.generateToken(userId);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
