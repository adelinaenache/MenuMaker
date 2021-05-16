import { MutationResult } from "@apollo/client";
import { User } from "./UserTypes";

export type Auth = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type AuthResult = MutationResult & Auth;
export type SignupResult = { signup: AuthResult };
export type AuthMutation = { password: string; email: string };
export type LoginResult = { login: AuthResult };
