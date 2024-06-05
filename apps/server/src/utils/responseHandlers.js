import { httpStatus } from './httpStatus.js';

export function success(res, status = httpStatus.OK, data = {}) {
  res.status(status).json({
    status: 'success',
    statusCode: status,
    data: data,
  });
}

export function error(res, error) {
  res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    statusCode: error.status || httpStatus.INTERNAL_SERVER_ERROR,
    message: error.message,
  });
}
