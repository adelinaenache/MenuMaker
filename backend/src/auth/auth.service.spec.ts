import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '.prisma/client';
import { JWT_EXPIRE } from '../utils/constants';
import { JwtModule } from '@nestjs/jwt';
import { faker } from '@faker-js/faker';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let user: User;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService],
      imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: JWT_EXPIRE },
        }),
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);

    // generate an user
    user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
      },
    });
  });

  it('1. should hash a password - and return a string containing both lower and upper ', async () => {
    const password = faker.internet.password();
    const hashed = await service.hashPassword(password);

    expect(hashed).toMatch(/(?=.*[a-z])(?=.*[A-Z])/);
  });

  it('2. should not be able to signup because email already exists', async () => {
    try {
      await service.signup({
        email: user.email,
        password: user.password,
      });
    } catch (err) {
      expect(err.status).toBe(409);
    }
  });

  it('3. should signup user ', async () => {
    const userData = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const result = await service.signup(userData);

    await prisma.user.delete({ where: { email: userData.email } });

    expect(result.accessToken).toBeTruthy();
    expect(result.refreshToken).toBeTruthy();
    expect(result.user.email).toEqual(userData.email);
  });

  it('4. should login user ', async () => {
    // mock validate password so that it isn't compared to a hash value
    jest
      .spyOn(service, 'validatePassword')
      .mockImplementation(async () => true);

    const result = await service.login({
      email: user.email,
      password: user.password,
    });

    expect(result.accessToken).toBeTruthy();
    expect(result.refreshToken).toBeTruthy();
    expect(result.user.email).toEqual(user.email);
  });

  it('5. should not login user because password is invalid', async () => {
    try {
      await service.login({
        email: user.email,
        password: user.password,
      });
    } catch (err) {
      expect(err.status).toBe(400);
    }
  });

  // cleanups
  afterAll(async () => {
    await prisma.user.delete({ where: { id: user.id } });
  });
});
