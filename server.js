const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Existing user routes
const userRouter = require('./routes/users');
app.use("/users", userRouter);

// WebSocket connection setup
wss.on('connection', (ws) => {
    console.log('connection')
    ws.on('message', (message) => {
        console.log('Received:', message);
        // You can add code here to handle messages from your Arduino or phone app
    });

    ws.send('Connection established');
});

// Additional routes for device control
app.post('/device-control', (req, res) => {
    // Handle device control logic here
    res.json({ success: true, message: "Device control command received" });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = app;
