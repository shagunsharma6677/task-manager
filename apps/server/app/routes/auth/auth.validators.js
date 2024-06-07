import { check, validationResult } from 'express-validator';
import commonlyUsedPasswords from '../../../config/commonlyUsedPasswords.js';

export default class Validators {
  static userSignupValidator() {
    try {
      return [
        ...Validators.userNameValidator(),
        ...Validators.authUserPasswordValidator(),
      ];
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  static emailValidator() {
    try {
      return [check('email').isEmail().withMessage('VALID_EMAIL')];
    } catch (error) {
      return error;
    }
  }

  static userNameValidator() {
    try {
      return [check('username').exists().withMessage('username')];
    } catch (error) {
      return error;
    }
  }
  static authUserPasswordValidator() {
    try {
      return [
        check('password')
          .not()
          .isIn(commonlyUsedPasswords)
          .withMessage('COMMONLY_USED_PASSWORD')
          .isLength({ min: 4 })
          .withMessage('PASSWORD_VALIDATION_LENGTH')
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d].*/)
          .withMessage('PASSWORD_VALIDATION'),
      ];
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static loginValidator() {
    try {
      return [
        ...Validators.userNameValidator(),
        ...Validators.authUserPasswordValidator(),
      ];
    } catch (error) {
      throw new Error(error);
    }
  }

  static validate(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ status: 0, message: errors.array() });
      }
      next();
    } catch (error) {
      console.log('error', error);
      return res.send({ status: 0, message: error });
    }
  }
}
