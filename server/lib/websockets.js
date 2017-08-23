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

/**
 * Starts a WebSocketServer.
 * 
 * When a new connection is opened by a client the following occurs:
 *  1. Get the 'key' from the connection url querystring.  The key should be a
 *      valid one-time key, previously acquired via the issueKey function.
 *  2. Retrieve the associated user object using the key and establish a 'context' object.
 *      The context object contains a reference to the current user and the open socket instance,
 *      which is used by worker functions to send messages to a specific socket (i.e. user).
 *  3. Start up all worker functions that were previoulsy registered via registerSocketWorker during app configuration.
 *      An executing socket worker function should use the context to send outbound messages as needed.
 *      It is expected that a socket worker will subscribe to receive events from some external system (e.g. mesage queue)
 *      which are relevant to the associated user.
 *  4. Start a force-reconnect timer, which will disconnect the client after a set interval
 *      and require the client to reconnect.
 * 
 * Socket workers should listen for the 'close' event of the socket of their context, so they can
 * terminate as needed.
 */
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

      console.log('connected user', token.user);

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

      socket.on('error', err => {
        console.log('socket error', err);
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