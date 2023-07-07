import { Model, ModelAttributes, HasManyAddAssociationMixin } from 'sequelize';
import User from './User';

export default class Repository extends Model<ModelAttributes<Repository>> {
  declare id: string;
  declare name: string;

  declare addOwnerUser: HasManyAddAssociationMixin<User, 'id'>;
  declare addSharedUser: HasManyAddAssociationMixin<User, 'id'>;
}