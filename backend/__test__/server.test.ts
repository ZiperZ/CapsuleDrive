import { listener, mainPromise } from '@/src/main';
import { GraphQLClient, request, gql } from 'graphql-request';

const client = new GraphQLClient(`localhost:${process.env.SERVER_PORT}`);

describe('Test GraphQL Server', () => {
  beforeAll(async () => {
    await mainPromise;
    await new Promise<void>((resolve) => void listener!.once('listening', () => resolve()));
  }, 10_000);

  test('If Apollo GraphQL Server is responding', async () => {
    const response = await client.request(gql``);
    expect(response).not.toBeNull();
  });
});