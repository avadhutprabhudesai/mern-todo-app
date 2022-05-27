const User = require('./user.mongo');

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createUser = async (user) => {
  try {
    const created = await User.create(user);
    return created;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getUserById,
  getUserByUsername,
  createUser,
};
