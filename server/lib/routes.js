'use strict';
//const path = require('path');

module.exports = function (app) {

  app.route('/api/status')
    .get((req, res) => {
      res.json({
        status: 'online'
      });
    });

  app.use('/api/tokens', require('./api/tokens'));
  // app.use('/api/socket-keys', require('./api/socket-keys'));
  // app.use('/api/items', require('./api/items'));
  // app.use('/api/assignments', require('./api/assignments'));

  // app.route('/*')
  //   .get((req, res) => {
  //     res.sendFile(path.resolve(app.get('clientPath') + '/index.html'));
  //   });
};