import { Controller } from '../../../utils/controller-base.js';
import _ from 'lodash';
import { error, success } from '../../../utils/responseHandlers.js';
import {
  BadRequestError,
  InternalServerError,
} from '../../../utils/api-errors.js';
import { httpStatus } from '../../../utils/httpStatus.js';

export class TaskController extends Controller {
  constructor() {
    super();
  }

  async getTask() {
    try {
      return success(this.res, httpStatus.OK);
    } catch (err) {
      console.error(err);
      return error(this.res, new InternalServerError('Something went wrong!'));
    }
  }

  async createTask() {
    try {
      return success(this.res, httpStatus.OK);
    } catch (err) {
      console.error(err);
      return error(this.res, new InternalServerError('Something went wrong!'));
    }
  }

  async deleteTask() {
    try {
      return success(this.res, httpStatus.OK);
    } catch (err) {
      console.error(err);
      return error(this.res, new InternalServerError('Something went wrong!'));
    }
  }

  async editTask() {
    try {
      return success(this.res, httpStatus.OK);
    } catch (err) {
      console.error(err);
      return error(this.res, new InternalServerError('Something went wrong!'));
    }
  }
}
