import { Profile } from "passport-google-oauth20";

export interface GoogleAuthConfig {
  clientId: string;
  clientSecret: string;
  callbackURL: string;
  scopes?: string[];
}

export interface JWTPayload {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface User extends Profile {}
  }
}
