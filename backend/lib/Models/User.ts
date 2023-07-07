import { Model, ModelAttributes } from 'sequelize';
import Chance from 'chance';

export default class User extends Model<ModelAttributes<User>> {
  declare id: string;
  declare username: string;
  declare password: string;
  declare email: string;
}