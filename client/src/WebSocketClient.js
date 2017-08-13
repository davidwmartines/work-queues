import * as http from './http';

class WebSocketClient {

  constructor(init) {
    if (!init || !init.onReceive || (typeof init.onReceive !== 'function')) {
      throw new Error('must init WebSocketClient with an onReceive callback function');
    }
    this.onReceive = init.onReceive;

    this.socket = null;
    this.enableReconnect = false;
    this.reconnectIntervalId = null;
    this.reconnectIntervalMs = 5000;
  }

  /**
   * Opens a new websocket connection.
   */
  open() {

    //start out closed
    this.close();

    http.get('/api/socket-keys')
      .then((response) => {
        if (!response.ok) {
          return;
        }
        response.json().then((key) => {

          if (!key) {
            console.warn('did not receive socket key');
            return;
          }

          const socketUri = 'ws://' + window.location.host + '/socket?key=' + key;

          console.log('opening websocket');

          this.socket = new window.WebSocket(socketUri);

          //now that we are connected, set flag to enable auto-reconnect
          this.enableReconnect = true;

          this.socket.onmessage = (event) => {
            const envelope = JSON.parse(event.data);
            if (envelope.event && envelope.message) {
              this.onReceive(envelope.event, envelope.message);
            } else {
              console.log('unhandled socket message', event.data);
            }
          };

          this.socket.onopen = () => {
            console.log('websocket open');
            clearInterval(this.reconnectIntervalId);
          };

          this.socket.onclose = function (event) {
            console.log('websocket closed', event.code);
            this.socket = null;
            if (this.enableReconnect) {
              if (event.code === 1000) {
                // server closed normally, meaning ui should reconnect
                this.open();
              } else {
                // was abnormal, start reconnect loop
                this.reconnectIntervalId = setInterval(() => {
                  console.log('attempting reconnect...');
                  this.open();
                }, this.reconnectIntervalMs);
              }
            }
          };

          this.socket.onerror = (event) => {
            console.error(event);
          };

        });

      });
  }

  /**
   * Cleanly closes the websocket connection, if open.
   */
  close() {
    // since we are intiating close, turn off the reconnect flag.
    this.enableReconnect = false;

    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  /**
   * Will open a new websocket connection if we are not already connected.
   */
  ensure() {
    if (!this.socket) {
      this.open();
    }
  }

}

export default WebSocketClient;