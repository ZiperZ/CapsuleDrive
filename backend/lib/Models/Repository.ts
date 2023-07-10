import { Model, CreationOptional, BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyHasAssociationMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyRemoveAssociationMixin, HasManyHasAssociationMixin, InferAttributes, InferCreationAttributes } from 'sequelize';
import User from '@Models/User';
import Folder from '@Models/Folder';

export default class Repository extends Model<InferAttributes<Repository>, InferCreationAttributes<Repository>> {
  declare id: CreationOptional<string>;
  declare name: string;

  declare addOwnerUser: BelongsToManyAddAssociationMixin<User, string>;
  declare addSharedUser: BelongsToManyAddAssociationMixin<User, string>;
  declare getOwnerUsers: BelongsToManyGetAssociationsMixin<User>;
  declare getSharedUsers: BelongsToManyGetAssociationsMixin<User>;
  declare hasOwnerUser: BelongsToManyHasAssociationMixin<User, string>;
  declare hasSharedUser: BelongsToManyHasAssociationMixin<User, string>;

  declare createFolder: HasManyCreateAssociationMixin<Folder>;
  declare getFolders: HasManyGetAssociationsMixin<Folder>;
  declare removeFolder: HasManyRemoveAssociationMixin<Folder, string>;
  declare hasFolder: HasManyHasAssociationMixin<Folder, string>;
}