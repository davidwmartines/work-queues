'use strict';

const express = require('express');
const controller = require('./tokens.controller');
const pause = require('connect-pause');
const jwt = require('express-jwt');
const config = require('../../../config/environment');


//mock some latency for demo purposes.
const latencyMs = 300;

const router = express.Router();

router.post('/', pause(latencyMs), controller.create);

//need to override the 'unless' for deletes
router.delete('/', jwt({
  secret: config.jwt.secret,
  userProperty: config.jwt.userProperty
}), controller.remove);


module.exports = router;