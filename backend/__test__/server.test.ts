import { listener, mainPromise } from '@/src/main';
import { GraphQLClient, request, gql } from 'graphql-request';
import ToughCookie from 'tough-cookie';
import Chance from 'chance';

import User from '@Models/User';
import { initDatabase, sequelize } from '@/lib/database';

const client = new GraphQLClient(`http://localhost:${process.env.SERVER_PORT}/graphql`);
const SERVER_URL = `http://localhost:${process.env.SERVER_PORT}`;

describe('Test GraphQL Server', () => {
  beforeAll(async () => {
    await mainPromise;
    await new Promise<void>((resolve) => void listener!.once('listening', () => resolve()));
  }, 10_000);

  afterAll(async () => {
    listener?.close();
  });

  test('If can register and login user', async () => {
    const chance = new Chance();
    const email = chance.email();
    const username = chance.name().slice(0, 48);
    const password = chance.hash();
    
    await fetch(new URL('/auth/register', SERVER_URL), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        username,
        password,
      })
    });
    // check if user is recorded on database
    await expect(User.findOne({ where: { username, email } })).resolves.not.toBeNull();

    // check if user can login
    const jar = new ToughCookie.CookieJar();
    const loginResponse = await fetch(new URL('/auth/login', SERVER_URL), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      })
    });
    // set all cookies returned with login response
    loginResponse.headers.getSetCookie().map((cookie: string) => void jar.setCookie(cookie, SERVER_URL));

    // check whether logged in or not
    const isLoggedResponse = await fetch(new URL('/auth/is-logged', SERVER_URL), {
      method: 'GET',
      headers: {
        'Cookie': await jar.getCookieString(SERVER_URL),
      }
    });
    await expect(isLoggedResponse.json().then(v => v.isLogged)).resolves.toBe(true);
  });

  test('If Apollo GraphQL Server is responding', async () => {
    const response = await client.request<{ __typename: string }>(
      gql`
      query CheckHealth { 
        __typename
      }`,
      {}, { 'apollo-require-preflight': 'true' });
    expect(response.__typename).toBe('Query');
  });
});