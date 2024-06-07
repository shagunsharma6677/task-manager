import express from 'express';
import { Globals } from '../../../config/Global.js';
import { TaskController } from './task.controller.js';
const router = express.Router();

router.post('/create', Globals.isAuthorised, (req, res, next) => {
  const authObj = new TaskController().boot(req, res);
  return authObj.createUserTask();
});

router.get('/getAll', Globals.isAuthorised, (req, res, next) => {
  const authObj = new TaskController().boot(req, res);
  return authObj.getUserTask();
});

router.get('/:taskId/get', (req, res, next) => {
  const authObj = new TaskController().boot(req, res);
  return authObj.getUserTask();
});

router.delete('/:taskId/delete', Globals.isAuthorised, (req, res, next) => {
  const authObj = new TaskController().boot(req, res);
  return authObj.deleteUserTask();
});

router.patch('/:taskId/edit', Globals.isAuthorised, (req, res, next) => {
  const authObj = new TaskController().boot(req, res);
  return authObj.editUserTask();
});

export default router;
