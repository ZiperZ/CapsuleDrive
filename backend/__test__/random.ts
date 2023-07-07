import { ModelAttributes, Optional } from 'sequelize';
import { Chance } from 'chance';
import Bcrypt from 'bcrypt';

import User from "@Lib/Models/User";
import Repository from "@Lib/Models/Repository";

const chance = new Chance();

export const getRandomUserData = async () => ({
  username: chance.name().slice(0, 48),
  password: await Bcrypt.hash(chance.hash(), 1),
  email: chance.email(),
}) as ModelAttributes<User>;

export const getRandomRepositoryData = async () => ({
  name: chance.sentence({ words: chance.integer({ min:1, max:3 }) }).slice(0, 48),
}) as ModelAttributes<Repository>;