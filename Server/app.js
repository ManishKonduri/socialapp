const express = require('express');
const router = require('./routes/router');
const body = require('body-parser');
const cors = require('cors');


const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');

const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server
});

const clients = {};
// I'm maintaining all active users in this object
const users = {};
// The current editor content is maintained here.
let editorContent = null;
// User activity history.
let userActivity = [];



const sendMessage = (json) => {
  // We are sending the current data to all connected clients
  Object.keys(clients).map((client) => {
    clients[client].sendUTF(json);
  });
}

const typesDef = {
  USER_EVENT: "userevent",
  CONTENT_CHANGE: "contentchange"
}

// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

wsServer.on('request', function(request) {
  var userID = getUniqueID();
  console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));
  connection.on('message', function(message) {
    console.log(message)
    if (message.type === 'utf8') {
      const dataFromClient = JSON.parse(message.utf8Data);
      const json = { type: dataFromClient.type };
      if (dataFromClient.type === typesDef.USER_EVENT) {
        users[userID] = dataFromClient;
        userActivity.push(`${dataFromClient.username} joined to edit the document`);
        json.data = { users, userActivity };
      } else if (dataFromClient.type === typesDef.CONTENT_CHANGE) {
        editorContent = dataFromClient;

        json.data = { editorContent, userActivity };
      }
      sendMessage(JSON.stringify(json));
    }
  });
  // user disconnected
  // connection.on('close', function(connection) {
  //   console.log((new Date()) + " Peer " + userID + " disconnected.");
  //   const json = { type: typesDef.USER_EVENT };
  //   userActivity.push(`${users[userID].username} left the document`);
  //   json.data = { users, userActivity };
  //   delete clients[userID];
  //   delete users[userID];
  //   sendMessage(JSON.stringify(json));
  // });
});

const app = express();
const port = 4000;
app.use(cors());
app.use(body.json());


app.use('/',router);

app.listen(4000);