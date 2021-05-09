import { Auth } from './models/auth.model';
import { LoginInput } from './dto/login.dto';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/signup.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation(() => Auth)
  async signup(@Args('data') data: SignupInput) {
    data.email = data.email.toLowerCase();
    return this.auth.signup(data);
  }

  @Mutation(() => Auth)
  async login(@Args('data') data: LoginInput) {
    return this.auth.login(data);
  }
  @Mutation(() => Auth)
  async refreshToken(@Args('data') token: string) {
    return this.auth.refreshToken(token);
  }
}
