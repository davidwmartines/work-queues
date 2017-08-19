'use strict';
// const express = require('express');
//const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('../config/environment');
const jwt = require('express-jwt');
module.exports = function (app) {

  app.set('clientPath', path.join(config.root, 'client'));

  //not yet...
  //app.use(express.static(app.get('clientPath')));

  //app.use(morgan('dev'));

  app.use('/api/*', jwt({
    secret: config.jwt.secret,
    userProperty: config.jwt.userProperty
  }).unless({
    path: ['/api/tokens', {
      method: 'POST'
    }]
  }));

  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());

};