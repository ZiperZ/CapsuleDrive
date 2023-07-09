import { Model, ModelAttributes, BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin } from 'sequelize';
import User from './User';

export default class Repository extends Model<ModelAttributes<Repository>> {
  declare id: string;
  declare name: string;

  declare addOwnerUser: BelongsToManyAddAssociationMixin<User, 'id'>;
  declare addSharedUser: BelongsToManyAddAssociationMixin<User, 'id'>;
  declare getOwnerUsers: BelongsToManyGetAssociationsMixin<User>;
  declare getSharedUsers: BelongsToManyGetAssociationsMixin<User>;
}