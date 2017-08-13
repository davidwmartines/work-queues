global.Promise = require('bluebird');

const express = require('express');
const websockets = require('./lib/websockets');
const http = require('http');
const config = require('./config/environment');

// initialize express and the server
const app = express();
const server = http.createServer(app);
app.set('port', (process.env.PORT || config.port));

// configure
require('./config/express')(app);
require('./lib/routes')(app);
registerSocketWorkers();

// start
startServer(server);

//TODO: move socket worker registration to separate file
function registerSocketWorkers() {

  //simple connection heartbeat test
  websockets.registerSocketWorker((context) => {
    setInterval(() => {
      context.send({
        event: 'heartbeat',
        message: new Date()
      });
    }, 3000);
  });
}

function startServer(server) {
  server.listen(app.get('port'), () => {

    console.log(`Find the server at: http://localhost:${app.get('port')}/`);

    websockets.start(server);
  });
}