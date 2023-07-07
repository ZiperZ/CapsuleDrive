import Express from 'express';
import ExpressSession from 'express-session';
import Passport from 'passport';

import DownloadRouter from './Routes/download';
import UploadRouter from './Routes/upload';

import { ModelAttributes } from 'sequelize';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MYSQL_USERNAME: string;
      MYSQL_PASSWORD: string;
      SESSION_SECRET: string;
      PORT?: string;
    }
  }

  namespace Express {
    interface User extends ModelAttributes<import('@Models/User').default> {}
  }
}

const app = Express();
app.use(ExpressSession({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
}));
app.use(Passport.session());

app.use('/download', DownloadRouter);
app.use('/upload', UploadRouter);

app.listen(process.env.PORT ?? 8000, () => {
  console.log('Server has begun listening!');
});