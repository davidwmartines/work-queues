'use strict';

const express = require('express');
const controller = require('./tokens.controller');
const pause = require('connect-pause');

//mock some latency for demo purposes.
const latencyMs = 1000;

const router = express.Router();

router.post('/', pause(latencyMs), controller.create);

module.exports = router;