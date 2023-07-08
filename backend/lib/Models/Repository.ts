import { Model, ModelAttributes, HasManyAddAssociationMixin, HasManyGetAssociationsMixin } from 'sequelize';
import User from './User';

export default class Repository extends Model<ModelAttributes<Repository>> {
  declare id: string;
  declare name: string;

  declare addOwnerUser: HasManyAddAssociationMixin<User, 'id'>;
  declare addSharedUser: HasManyAddAssociationMixin<User, 'id'>;
  declare getOwnerUsers: HasManyGetAssociationsMixin<User>;
  declare getSharedUsers: HasManyGetAssociationsMixin<User>;
}