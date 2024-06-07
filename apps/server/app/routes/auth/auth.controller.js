import bcryptjs from 'bcryptjs';
import _ from 'lodash';
import { Globals } from '../../../config/Global.js';
import { InternalServerError } from '../../../utils/api-errors.js';
import { Controller } from '../../../utils/controller-base.js';
import { httpStatus } from '../../../utils/httpStatus.js';
import { error, success } from '../../../utils/responseHandlers.js';
import {
  createUser,
  deleteUser,
  editUser,
  findByUsername,
  getUsers,
} from './auth.utils.js';

export class AuthController extends Controller {
  constructor() {
    super();
  }

  async register() {
    try {
      const { username, password } = this.req.body;
      if (_.isEmpty(username) || _.isEmpty(password)) {
        return error(
          this.res,
          new BadRequestError('Username, email, and password are required')
        );
      }

      const hashedPassword = await bcryptjs.hash(password, 10);

      const newUser = await createUser(username, hashedPassword);

      return success(this.res, httpStatus.CREATED, {
        message: 'User registered successfully!',
        token,
      });
    } catch (err) {
      console.error(err);
      return error(this.res, new InternalServerError('Something went wrong!'));
    }
  }

  async login() {
    try {
      const { username, password } = this.req.body;

      const existingUser = await findByUsername(username);

      if (_.isEmpty(username) || _.isEmpty(password)) {
        return error(
          this.res,
          new BadRequestError('Username and password are required')
        );
      }
      if (!existingUser) {
        return error(this.res, new NotFoundError('User not found'));
      }
      const passwordMatch = await bcryptjs.compare(
        password,
        existingUser.password
      );

      if (!passwordMatch) {
        return error(this.res, new UnauthorizedError('Incorrect password'));
      }
      const token = await Globals.generateToken(existingUser._id);

      return success(this.res, httpStatus.OK, {
        message: 'Login successful!',
        token,
      });
    } catch (err) {
      console.error(err);
      return error(this.res, new InternalServerError('Something went wrong!'));
    }
  }

  async getAllUsers() {
    try {
      const allUsersRes = await getUsers();

      return success(this.res, httpStatus.OK, {
        message: 'Get all users succesfull',
        data: allUsersRes,
      });
    } catch (err) {
      console.error(err);
      return error(this.res, new InternalServerError('Something went wrong!'));
    }
  }

  async deleteUser() {
    try {
      const { userId } = this.req.params;

      const result = await deleteUser({ userId });

      return success(this.res, httpStatus.OK, result);
    } catch (err) {
      console.log(err);
      return error(this.res, new InternalServerError('Something went wrong!'));
    }
  }

  async editUser() {
    try {
      const { userId } = this.req.params;
      const userData = this.req.body;

      if (!userId || !userData) {
        return error(this.res, new BadRequest('Invalid input data!'));
      }

      if (userData.password !== userData.newPassword) {
        return error(this.res, new BadRequest('Password are not same'));
      }

      const hashedPassword = await bcryptjs.hash(userData.password, 10);
      const res = await editUser({
        userId,
        username: userData.username,
        password: hashedPassword,
      });
      return success(this.res, httpStatus.OK, res);
    } catch (err) {
      console.error(err);
      return error(this.res, new InternalServerError('Something went wrong!'));
    }
  }
}
