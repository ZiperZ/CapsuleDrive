import { DataTypes, Sequelize, UUIDV4 } from 'sequelize';

import User from '@Models/User';
import Repository from '@Models/Repository';
import Folder from '@Models/Folder';

export const sequelize = new Sequelize({
  database: 'CapsuleDrive',
  dialect: 'mysql',
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  ssl: false, // FIXME: buy a ssl certificate
});

export async function initDatabase() {
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: DataTypes.STRING(48),
    password: DataTypes.STRING(),
    email: DataTypes.STRING(),
  }, {
    sequelize
  });
  Repository.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING(48),
  }, {
    sequelize
  });
  Folder.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize
  });

  User.belongsToMany(Repository, { as: { singular: 'OwnedRepository', plural: 'OwnedRepositories' }, through: 'RepositoryOwners' });
  User.belongsToMany(Repository, { as: { singular: 'SharedRepository', plural: 'SharedRepositories' }, through: 'RepositorySharedUsers' });
  Repository.belongsToMany(User, { as: { singular: 'OwnerUser', plural: 'OwnerUsers' }, through: 'RepositoryOwners' });
  Repository.belongsToMany(User, { as: { singular: 'SharedUser', plural: 'SharedUsers' }, through: 'RepositorySharedUsers' });
  Repository.hasMany(Folder, { as: { singular: 'Folder', plural: 'Folders' } });

  await sequelize.sync({ force: process.env.NODE_ENV==='test' });
}