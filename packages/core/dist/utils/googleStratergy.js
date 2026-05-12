import passport from "passport";
import { Strategy as GoogleStrategy, } from "passport-google-oauth20";
export const setupGoogleStrategy = (config) => {
    passport.use(new GoogleStrategy({
        clientID: config.clientId,
        clientSecret: config.clientSecret,
        callbackURL: config.callbackURL,
    }, (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    }));
};
//# sourceMappingURL=googleStratergy.js.map