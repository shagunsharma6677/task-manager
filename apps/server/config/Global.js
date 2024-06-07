import jwt from 'jsonwebtoken';
import User from '../app/models/user.model.js';
const { sign, verify } = jwt;

export class Globals {
  static async generateToken(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let token = sign(
          {
            id: id,
            algorithm: 'HS256',
          },
          process.env.jwtSecret
        );

        return resolve(token);
      } catch (err) {
        console.log('Get token', err);
        return reject({ message: err, status: 0 });
      }
    });
  }
  // Validating Token
  static async isAuthorised(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];

      if (!token)
        return res.status(401).json({ status: 0, message: 'TOKEN_WITH_API' });

      const decoded = verify(JSON.parse(token), process.env.jwtSecret);

      if (!decoded.id) {
      }
      const userExist = await User.findById(decoded.id);

      if (!userExist)
        return res
          .status(401)
          .json({ status: 0, message: 'USER_NOT_EXIST_OR_DELETED' });

      req.currentUser = userExist;

      next();
    } catch (err) {
      console.log('Token authentication', err);
      return res.send({ status: 0, message: err });
    }
  }

  static decodeUserVerificationToken(token) {
    return new Promise(async (resolve, reject) => {
      const user = await User.findOne({ token: token });
      if (user && user.token) {
      }
      return resolve(true);
    });
  }
}
