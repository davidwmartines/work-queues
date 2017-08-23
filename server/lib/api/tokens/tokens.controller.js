'use strict';
const respondWithResult = require('../../respond-with-result');
const handleError = require('../../handle-error');
const config = require('../../../config/environment');
const jwt = require('jsonwebtoken');

const demoUsers = [{
  id: 1,
  username: 'user1',
  name: 'User One'
}, {
  id: 2,
  username: 'user2',
  name: 'User Two'
}, {
  id: 3,
  username: 'user3',
  name: 'User Three'
}];

/**
 * Handles POST requests to authenticate and return a new token
 */
module.exports.create = (req, res) => {
  return getUser(req)
    .then(makeResult)
    .then(respondWithResult(res))
    .catch(handleError(res));
};

/**
 * Handles DELETE requests to logout and invalidate the token.
 */
module.exports.remove = (req, res) => {
  if (req.token && req.token.user) {
    const user = req.token.user;
    console.log(`${user.username} logging out...`);
  }
  res.status(204).send();
};


function getUser(req) {
  return Promise.resolve(demoUsers.find(u => u.username === req.body.username));
}

function makeResult(user) {
  if (user) {
    return makeToken(user)
      .then(token => {
        return {
          token: token,
          user: user
        };
      });
  }
  return Promise.reject({
    statusCode: 403,
    message: 'invalid credentials'
  });
}

function makeToken(user) {
  return new Promise((resolve) => {
    const token = jwt.sign({
      user: user
    }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn
    });
    return resolve(token);
  });
}