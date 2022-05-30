import { isErrorInstance } from '../services/type-guards';
import { User } from '../typings/types';
import Users from './user.mongo';

const getUserById = async (id: string) => {
  try {
    const user = await Users.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    if (isErrorInstance(error)) throw new Error(error.message);
  }
};

const getUserByUsername = async (username: string) => {
  try {
    const user = await Users.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    if (isErrorInstance(error)) throw new Error(error.message);
  }
};

const createUser = async (user: User) => {
  try {
    const created = await Users.create(user);
    return created;
  } catch (error) {
    if (isErrorInstance(error)) throw new Error(error.message);
  }
};

export { getUserById, getUserByUsername, createUser };
