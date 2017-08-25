'use strict';
const respondWithResult = require('../../respond-with-result');
const handleError = require('../../handle-error');
const websockets = require('../../websockets');

module.exports.create = function(req, res) {
  var token = req.token;
  if (token) {
    return websockets.issueKey(token)
      .then(respondWithResult(res, 201))
      .catch(handleError(res));
  }
  console.warn('tried to get socket-key without auth token');
  res.status(401).send('No Auth Token provided.');
};