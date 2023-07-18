import { closeDatabase, initDatabase, sequelize } from '@Lib/database';
import { getRandomUserData, getRandomRepositoryData } from './random';

import User from '@Lib/Models/User';
import Repository from '@Lib/Models/Repository';

describe('Test if database and models properly works', () => {
  beforeAll(async () => {
    await initDatabase();
  }, 10_000);

  afterAll(async () => {
    await closeDatabase();
  });

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
    await repository.addSharedUser(user);
    console.log(`Shared repository with User "${user.id}"`);
    await expect(repository.getSharedUsers().then(arr => arr.map(u => u.id))).resolves.toStrictEqual([user.id]);
  });

  test('If user can create folder for a repository', async () => {
    const user = await User.create(await getRandomUserData());
    const repository = await Repository.create(await getRandomRepositoryData());
    await repository.addSharedUser(user);
    const folder = await repository.createFolder({ path: '/' });
    console.log(`Created folder with id "${folder.id}"`);
    await expect(repository.hasFolder(folder.id)).resolves.toBe(true);
  });
});