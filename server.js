'use strict';

const express = require('express');
const app = express();
let expressWs = require('express-ws')(app);

// Listen websocket
app.ws('/socketserver', function(ws, req) {
  console.log("ws client ip ["+req.ip+"]");
});
let aWss = expressWs.getWss('/socketserver');

app.get('/scan', (req, res) => {
  let id = req.query.id;
  if (id) {
    console.log("scanned id ["+id+"]");  

    // Broadcast message to websocket clients
    aWss.clients.forEach(function (client) {
      client.send(id);
    });
  }
  res.status(200).send().end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
