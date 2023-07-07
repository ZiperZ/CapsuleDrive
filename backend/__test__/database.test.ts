import { initDatabase, sequelize } from '@Lib/database';
import { getRandomUserData, getRandomRepositoryData } from './random';

import User from '@Lib/Models/User';
import Repository from '@Lib/Models/Repository';

describe('Test if database and models properly works', () => {
  beforeAll(async () => {
    await initDatabase();
  }, 10_000);

  test('If User creation works', async () => {
    const user = await User.create(await getRandomUserData());
    expect(user.id).not.toBeNull();
    expect(user).not.toBeNull();
  });

  test('If Repository creation works', async () => {
    const repository = await Repository.create(await getRandomRepositoryData());
    expect(repository.id).not.toBeNull();
    expect(repository).not.toBeNull();
  });

  test('If User can create a Repository', async () => {
    const user = await User.create(await getRandomUserData());
    const repository = await Repository.create(await getRandomRepositoryData());
    repository.addOwnerUser(user);
    expect(repository.getOwnerUsers({ where: {} }).then(ownerUsers => ownerUsers.map(v => v.id))).resolves.toBe([user.id]);
  });
});