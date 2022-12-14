//Express server
const express = require("express");
//Socket server
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");
const cors = require('cors')

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Http server
    this.server = http.createServer(this.app);

    //Config de sockets
    this.io = socketio(this.server, {
      /** configuraciones */
    });
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));
    this.app.use(cors())
  }

  configurarSockets() {
    new Sockets(this.io);
  }

  execute() {
    this.middlewares();

    this.configurarSockets();

    this.server.listen(this.port, () => {
      console.log("Server running on port: ", this.port);
    });
  }
}

module.exports = Server;
