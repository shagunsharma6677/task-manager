import { error } from '../../../utils/responseHandlers.js';
import User from '../../models/user.model.js';

export const findByUsername = async (username) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return error(null, { status: 404, message: 'User not found' });
    }
    return user;
  } catch (err) {
    console.log(err);
    return error(err);
  }
};

export async function createUser(username, password) {
  try {
    const newUser = new User({
      username,
      password,
    });

    const savedUser = await newUser.save();

    return savedUser;
  } catch (error) {
    return error(null, {
      status: 500,
      message: 'Failed to create user: ' + error.message,
    });
  }
}

export async function getUsers() {
  try {
    const users = await User.find({});

    return users;
  } catch (error) {
    return error(null, {
      status: 500,
      message: 'Failed to create user: ' + error.message,
    });
  }
}

export const deleteUser = async ({ userId }) => {
  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      throw new Error('user not found');
    }
    return user;
  } catch (err) {
    console.error(`Error deleting user with ID ${userId}:`, err);
    throw new Error('Error deleting user: ' + err.message);
  }
};

export const editUser = async ({ userId, username, password }) => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { username, password },
      { new: true }
    );

    if (!user) {
      throw new Error('User not found');
    }

    await user.save();
    return user;
  } catch (err) {
    throw new Error('Error creating user: ' + err.message);
  }
};
