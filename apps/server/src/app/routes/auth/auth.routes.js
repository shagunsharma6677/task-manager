import express from 'express';
import { AuthController } from './auth.controller.js';
const router = express.Router();

router.post('/users/register', (req, res, next) => {
  const authObj = new AuthController().boot(req, res);
  return authObj.register();
});

router.post('/users/login', (req, res, next) => {
  const authObj = new AuthController().boot(req, res);
  return authObj.login();
});

export default router;
