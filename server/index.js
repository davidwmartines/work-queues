global.Promise = require('bluebird');

const express = require('express');
const websockets = require('./lib/websockets');
const http = require('http');

const app = express();
app.set('port', (process.env.PORT || 3001));
const server = http.createServer(app);

registerRoutes(app);
registerSocketWorkers();
startServer(server);

//TODO: move route registration to separate file
function registerRoutes(app) {
  app.get('/api/status', (req, res) => {
    res.json({
      status: 'online'
    });
  });
}

//TODO: move socket worker registration to separate file
function registerSocketWorkers() {

  //simple connection heartbeat test
  websockets.registerSocketWorker((context) => {
    setInterval(() => {
      context.send({
        event: 'heartbeat',
        info: new Date()
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