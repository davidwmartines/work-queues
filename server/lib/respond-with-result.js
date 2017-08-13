'use strict';

module.exports = function(res, statusCode = 200) {
  return function(entity) {
    if (entity) {
      statusCode = entity.statusCode || statusCode;
      res.status(statusCode).json(entity);
    }
    res.status(404).send();
  };
};