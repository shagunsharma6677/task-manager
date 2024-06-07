import { InternalServerError } from '../../../utils/api-errors.js';
import { Controller } from '../../../utils/controller-base.js';
import { httpStatus } from '../../../utils/httpStatus.js';
import { error, success } from '../../../utils/responseHandlers.js';
import { createTask, deleteTask, editTask, getTask } from './task.utils.js';

export class TaskController extends Controller {
  constructor() {
    super();
  }

  async getUserTask() {
    try {
      const tasks = await getTask();

      return success(this.res, httpStatus.OK, tasks);
    } catch (err) {
      console.error(err);
      return error(this.res, new InternalServerError('Something went wrong!'));
    }
  }

  async createUserTask() {
    try {
      const { title, description, status } = this.req.body;

      if (!title || !description || !status) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const create = await createTask({ title, description, status });
      return success(this.res, httpStatus.OK), create;
    } catch (err) {
      console.error(err);
      return error(this.res, new InternalServerError('Something went wrong!'));
    }
  }

  async deleteUserTask() {
    try {
      const { taskId } = this.req.params;

      const result = await deleteTask({ taskId });

      return success(this.res, httpStatus.OK, result);
    } catch (err) {
      console.log(err);
      return error(this.res, new InternalServerError('Something went wrong!'));
    }
  }

  async editUserTask() {
    try {
      const { taskId } = this.req.params;
      const taskData = this.req.body;
      const res = await editTask({ taskId, taskData });
      return success(this.res, httpStatus.OK, res);
    } catch (err) {
      console.error(err);
      return error(this.res, new InternalServerError('Something went wrong!'));
    }
  }
}
