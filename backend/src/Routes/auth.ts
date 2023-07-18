import Express, { Router } from 'express';

import Passport from 'passport';
import User from '@Models/User';

const route = Router();
export default route;

route.post('/register', Express.json(), async (req, res) => {
  const { email, username, password } = req.body;

  await User.create({
    email,
    username,
    password,
  });
  res.sendStatus(200);
});
route.post('/login', Passport.authenticate('local'), (req, res) => res.sendStatus(200));
route.get('/is-logged', (req, res) => {
  if (req.user) {
    return res.status(200).json({ loggedIn: true, message: 'User is already logged in.' });
  }
  else {
    return res.status(400).json({ loggedIn: false, message: 'User is NOT logged in.' });
  }
});