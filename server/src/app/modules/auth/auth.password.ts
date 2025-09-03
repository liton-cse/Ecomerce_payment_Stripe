import passport from 'passport';
import {
  Strategy as GoogleStrategy,
  Profile as GoogleProfile,
} from 'passport-google-oauth20';
import {
  Strategy as FacebookStrategy,
  Profile as FacebookProfile,
} from 'passport-facebook';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.API_BASE_URL}/auth/google/callback`,
    },
    (accessToken, refreshToken, profile: GoogleProfile, done) => {
      const user = {
        id: profile.id,
        email: profile.emails?.[0].value,
        name: profile.displayName,
        picture: profile.photos?.[0].value,
        provider: 'google',
      };
      return done(null, user);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID!,
      clientSecret: process.env.FACEBOOK_APP_SECRET!,
      callbackURL: `${process.env.API_BASE_URL}/auth/facebook/callback`,
      profileFields: ['id', 'emails', 'name', 'picture.type(large)'],
    },
    (accessToken, refreshToken, profile: FacebookProfile, done) => {
      const user = {
        id: profile.id,
        email: profile.emails?.[0].value,
        name: `${profile.name?.givenName} ${profile.name?.familyName}`,
        picture: profile.photos?.[0].value,
        provider: 'facebook',
      };
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));

export default passport;
