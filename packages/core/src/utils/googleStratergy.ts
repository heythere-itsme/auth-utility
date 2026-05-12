import passport from "passport";
import {
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth20";
import { GoogleAuthConfig } from "../types/auth.js";

export const setupGoogleStrategy = (config: GoogleAuthConfig): void => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.clientId,
        clientSecret: config.clientSecret,
        callbackURL: config.callbackURL,
      },
      (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
      ) => {
        return done(null, profile);
      },
    ),
  );
};
