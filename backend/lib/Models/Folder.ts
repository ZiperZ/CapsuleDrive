import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

export default class Folder extends Model<InferAttributes<Folder>, InferCreationAttributes<Folder>> {
  declare id: CreationOptional<string>;
  declare path: string;
}