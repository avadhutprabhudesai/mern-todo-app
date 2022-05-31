import { User } from '../typings/types';
import Users from './user.mongo';

const getUserById = async (id: string): Promise<User> => {
  const user: User = (await Users.findById(id)) as User;
  return user;
};

const getUserByUsername = async (username: string): Promise<User> => {
  const user = await Users.findOne({ username });
  return user;
};

const createUser = async (user: User): Promise<User> => {
  const created = await Users.create(user);
  return created;
};

export { getUserById, getUserByUsername, createUser };
