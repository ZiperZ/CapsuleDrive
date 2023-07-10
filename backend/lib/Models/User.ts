import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>;
  declare username: string;
  declare password: string;
  declare email: string;
}