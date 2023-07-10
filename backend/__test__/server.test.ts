import { listener, mainPromise } from '@/src/main';
import { GraphQLClient, request, gql } from 'graphql-request';

const client = new GraphQLClient(`http://localhost:${process.env.SERVER_PORT}/graphql`);

describe('Test GraphQL Server', () => {
  beforeAll(async () => {
    await mainPromise;
    await new Promise<void>((resolve) => void listener!.once('listening', () => resolve()));
  }, 10_000);

  afterAll(async () => {
    listener?.close();
  });

  test('If Apollo GraphQL Server is responding', async () => {
    const response = await client.request(
      gql`
      query CheckHealth { 
        __typename
      }`,
      {}, { 'apollo-require-preflight': 'true' });
    expect(response).not.toBeNull();
  });
});