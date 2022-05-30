import { isErrorInstance } from '../services/type-guards';
import { User } from '../typings/types';
import Users from './user.mongo';

const getUserById = async (id: string): Promise<User | undefined> => {
  try {
    const user: User = (await Users.findById(id)) as User;
    if (!user) {
      throw new Error('User not found');
      return;
    }
    return user;
  } catch (error) {
    if (isErrorInstance(error)) throw new Error(error.message);
    return;
  }
};

const getUserByUsername = async (
  username: string
): Promise<User | undefined> => {
  try {
    const user = await Users.findOne({ username });
    if (!user) {
      throw new Error('User not found');
      return;
    }
    return user;
  } catch (error) {
    if (isErrorInstance(error)) throw new Error(error.message);
    return;
  }
};

const createUser = async (user: User): Promise<User | undefined> => {
  try {
    const created = await Users.create(user);
    return created;
  } catch (error) {
    if (isErrorInstance(error)) throw new Error(error.message);
    return;
  }
};

export { getUserById, getUserByUsername, createUser };
