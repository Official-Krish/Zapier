import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import { prismaClient } from './db';


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: 'http://localhost:3001/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  const { id: googleId, emails, displayName: name } = profile;
  const email = emails?.[0].value;

  try {
    let user = await prismaClient.user.findUnique({ where: { googleId } });

    if (!user) {
      user = await prismaClient.user.findUnique({ where: { email } });

      if (!user) {
        user = await prismaClient.user.create({
          data: {
            googleId,
            email: email!,
            password: "", 
            name,
            isVerified: true, 
          },
        });
      } else {
        user = await prismaClient.user.update({
          where: { email },
          data: { googleId },
        });
      }
    }

    const tokenPayload = { userId: user.id };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, { expiresIn: '1h' });

    done(null, { user, token });
  } catch (err) {
    done(err);
  }
}));


