import fs from 'fs';
import path from 'path';

import type { InferAttributes } from 'sequelize';
import Passport from 'passport';
import Express from 'express';
import ExpressSession from 'express-session';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import type { ApolloContext } from './Resolvers/types';

import authRoute from '@Routes/auth';
import directoryContents from '@Resolvers/directoryContents';
import { closeDatabase, initDatabase, sequelize } from '@/lib/database';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MYSQL_USERNAME: string;
      MYSQL_PASSWORD?: string;
      SESSION_SECRET: string;
      SERVER_PORT: string;
      FILE_STORAGE_PATH: string;
    }
  }

  namespace Express {
    interface User extends InferAttributes<import('@Models/User').default> {}
  }
}

export const app = Express();
export let listener: null | ReturnType<typeof app.listen>;

app.use(ExpressSession({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
}));
app.use(Passport.session());

const graphqlServer = new ApolloServer<ApolloContext>({
  typeDefs: fs.readFileSync(path.resolve('schema.gql')).toString(),
  resolvers: {
    Query: {
      directoryContents
    }
  }
});

app.use('/auth', authRoute);

async function main() {
  await initDatabase();
  await graphqlServer.start();
  app.use('/graphql', Express.json(), expressMiddleware<ApolloContext>(graphqlServer, { 
    context: async ({ req, res })=>({
      user: req.user
    } as ApolloContext) 
  }));

  listener = app.listen(process.env.SERVER_PORT, () => {
    console.log('Server has begun listening!');
  });
  listener.on('close', () => {
    closeDatabase();
  })
}
export const mainPromise = main();