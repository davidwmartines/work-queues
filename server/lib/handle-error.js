'use strict';

module.exports = function (res, statusCode = 500) {
  return function (err) {
    console.error(err);
    statusCode = err.statusCode || statusCode;
    res.status(statusCode).json(err);
  };
};