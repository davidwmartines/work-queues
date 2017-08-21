'use strict';

module.exports = (websockets, bus) => {

  registerHeartbeatTest();
  registerWorkItemCreatedNotification();

  function registerHeartbeatTest() {
    //simple connection heartbeat test
    websockets.registerSocketWorker((context) => {
      console.log('starting heartbeat socket worker');
      const intervalId = setInterval(() => {
        context.send({
          event: 'heartbeat',
          message: new Date()
        });
      }, 3000);
      context.socket.on('close', () => {
        console.log('stopping heartbeat socket worker');
        clearInterval(intervalId);
      });
    });
  }

  function registerWorkItemCreatedNotification() {
    websockets.registerSocketWorker((context) => {
      console.log('starting WorkItemCreatedNotification socket worker');
      bus.subscribe({
        exchangeName: 'notifications',
        routingKey: `notifications.workitem.created.user.${context.user.id}`
      }, (message) => {
        context.send({
          event: 'workitem.created',
          message: message
        });
      }).then((subscription) => {
        context.socket.on('close', () => {
          console.log('stopping WorkItemCreatedNotification socket worker');
          bus.unsubscribe(subscription);
        });
      });
    });
  }
};