import { DataTypes, Sequelize, UUIDV4 } from 'sequelize';

import User from '@Models/User';
import Repository from '@Models/Repository';

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

  User.belongsToMany(Repository, { as: 'OwnedRepository', through: 'RepositoryOwners' });
  User.belongsToMany(Repository, { as: 'SharedRepository', through: 'RepositorySharedUsers' });
  Repository.belongsToMany(User, { as: 'OwnerUser', through: 'RepositoryOwners' });
  Repository.belongsToMany(User, { as: 'SharedUser', through: 'RepositorySharedUsers' });

  await sequelize.sync({ force: process.env.NODE_ENV==='test' });
}