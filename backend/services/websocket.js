const WebSocket = require("ws");
let wss;

const initWebSocket = (server) => {
  wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("New client connected");

    ws.on("message", (message) => {
      console.log("Received:", message);
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
};

const broadcastMessage = (message) => {
  if (wss) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }
};

module.exports = {
  initWebSocket,
  broadcastMessage,
};
