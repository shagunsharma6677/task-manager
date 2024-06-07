import express from 'express';
import { Globals } from '../../../config/Global.js';
import { AuthController } from './auth.controller.js';
import AuthValidator from './auth.validators.js';
const router = express.Router();

router.post(
  '/register',
  AuthValidator.userSignupValidator(),
  AuthValidator.validate,
  (req, res, next) => {
    const authObj = new AuthController().boot(req, res);
    return authObj.register();
  }
);

router.post(
  '/login',
  AuthValidator.loginValidator(),
  AuthValidator.validate,
  (req, res, next) => {
    const authObj = new AuthController().boot(req, res);
    return authObj.login();
  }
);

router.get('/auth/getAllUsers', Globals.isAuthorised, (req, res, next) => {
  const authObj = new AuthController().boot(req, res);
  return authObj.getAllUsers();
});

router.delete(
  '/auth/:userId/delete',
  Globals.isAuthorised,
  (req, res, next) => {
    const authObj = new AuthController().boot(req, res);
    return authObj.deleteUser();
  }
);

router.patch('/auth/:userId/edit', Globals.isAuthorised, (req, res, next) => {
  const authObj = new AuthController().boot(req, res);
  return authObj.editUser();
});

export default router;
