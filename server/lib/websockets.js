'use strict';
const redis = require('redis');
const WebSocketServer = require('ws').Server;
const url = require('url');
const uuid = require('uuid');
const redisClient = getRedisClient();
const keyspace = 'socket-key:';
const keyExpireSeconds = 10;
const forceReconnectMs = 300000;
const socketWorkers = [];

module.exports.start = function (connectServer) {

  const server = new WebSocketServer({
    server: connectServer
  });

  console.info('Ready for websocket connection.');

  server.on('connection', (socket, req) => {
    console.log('connection opened', req.url);
    const connectUrl = url.parse(req.url, true);
    const key = connectUrl.query.key;
    getValidTokenFromKey(key).then(token => {

      if (!token) {
        console.warn('invalid key', key);
        socket.close(1008);
        return;
      }

      console.log('connected user id', token.user);

      const socketContext = {
        socket: socket,
        socketId: uuid.v1(),
        server: server,
        user: token.user,
        send: message => send(socket, message)
      };

      socketWorkers.forEach(worker => worker(socketContext));

      const reconnectTimeout = setTimeout(function () {
        console.log('forcing reconnect');
        socket.close(1000, 'socket session expired, please reconnect.');
      }, forceReconnectMs);

      socket.on('close', data => {
        console.log('connection closed', data);
        if (reconnectTimeout) {
          clearTimeout(reconnectTimeout);
        }
      });
    });
  });

  function send(socket, message) {
    if (socket.readyState === 1) {
      socket.send(JSON.stringify(message), function ack(err) {
        if (err) {
          console.error('error sending', err);
        }
      });
    }
  }

};

/**
 * Registers a function that starts up a socket worker.
 * @param  {function} workerFunction.  A function that takes a socketContext object.
 */
module.exports.registerSocketWorker = function (workerFunction) {
  socketWorkers.push(workerFunction);
};

/**
 * Issues a one-time key based on authToken, to be able to connect to socket.
 * @param  {object} authToken A decoded jwt.
 * @return {string}           The key.
 */
module.exports.issueKey = function (authToken) {
  const key = uuid.v1();
  return redisClient.setexAsync(keyspace + key, keyExpireSeconds, JSON.stringify(authToken)).then(() => {
    return key;
  });
};

function getValidTokenFromKey(key) {

  //for testing
  if (!key) {
    return Promise.resolve({
      user: {
        id: 0,
        name: 'test'
      }
    });
  }

  const storageKey = keyspace + key;
  return redisClient.getAsync(storageKey).then(res => {
    if (res) {
      return redisClient.delAsync(storageKey).then(() => {
        return JSON.parse(res);
      });
    }
    return Promise.resolve();
  });
}

function getRedisClient() {
  const client = redis.createClient();
  return Promise.promisifyAll(client);
}