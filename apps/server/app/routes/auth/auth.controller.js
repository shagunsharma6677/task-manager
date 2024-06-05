import { Controller } from '../../../utils/controller-base.js';
import _ from 'lodash';
import { error, success } from '../../../utils/responseHandlers.js';
import {
  BadRequestError,
  InternalServerError,
} from '../../../utils/api-errors.js';
import { httpStatus } from '../../../utils/httpStatus.js';

export class AuthController extends Controller {
  constructor() {
    super();
  }

  async register() {
    try {
      return success(this.res, httpStatus.OK, { message: 'Login successful!' });
    } catch (err) {
      console.error(err);
      return error(this.res, new InternalServerError('Something went wrong!'));
    }
  }

  async login() {
    try {
      return success(this.res, httpStatus.OK, { message: 'Login successful!' });
    } catch (err) {
      console.error(err);
      return error(this.res, new InternalServerError('Something went wrong!'));
    }
  }
}
