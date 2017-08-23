global.Promise = require('bluebird');

const express = require('express');
const websockets = require('./lib/websockets');
const registerSocketWorkers = require('./lib/register-socket-workers');
const http = require('http');
const config = require('./config/environment');
const Bus = require('amqp-bus').Bus;

const bus = new Bus(config.bus);

// initialize express and the server
const app = express();
const server = http.createServer(app);
app.set('port', (process.env.PORT || config.port));

// configure
require('./config/express')(app);
require('./lib/routes')(app);

// start
startServer(server);

function startServer(server) {
  server.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`);

    bus.on('started', () => {
      console.log('Bus started');
      websockets.start(server);
      registerSocketWorkers(websockets, bus);
    });
    bus.on('error', (e) => {
      console.error(e);
    });
    bus.on('debug', (e) => {
      console.log(e);
    });

    bus.start();
  });
}