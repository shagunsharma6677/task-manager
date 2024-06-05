import express from 'express';
import { TaskController } from './task.controller.js';
const router = express.Router();

router.post('/create', (req, res, next) => {
  const authObj = new TaskController().boot(req, res);
  return authObj.createServer();
});

router.get('/getAll', (req, res, next) => {
  const authObj = new TaskController().boot(req, res);
  return authObj.createServer();
});

router.get('/:taskId/get', (req, res, next) => {
  const authObj = new TaskController().boot(req, res);
  return authObj.createServer();
});

router.delete('/:taskId/delete', (req, res, next) => {
  const authObj = new TaskController().boot(req, res);
  return authObj.deleteServer();
});

router.patch('/:taskId/edit', (req, res, next) => {
  const authObj = new TaskController().boot(req, res);
  return authObj.editServer();
});

export default router;
