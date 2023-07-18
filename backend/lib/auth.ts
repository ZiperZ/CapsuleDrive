import Passport from 'passport';
import PassportLocal from 'passport-local';
import Bcrypt from 'bcrypt';

import User from '@Models/User';

Passport.use(new PassportLocal.Strategy({ usernameField: 'email' }, async (email, password, cb) => {
  const user = await User.findOne({
    where: {
      email,
    }
  });

  // in order to protect privacy, we will NOT tell if email or password is wrong
  if (!user || !(await Bcrypt.compare(password, user.password))) {
    cb('Unable to match such a e-mail and password.');
    return;
  }
  cb(null, user.toJSON());
}));

Passport.serializeUser((user, done) => {
  done(null, user.id);
});
Passport.deserializeUser(async (id: string, done) => {
  const user = await User.findOne({
    where: {
      id
    }
  });
  done(null, user?.toJSON());
});