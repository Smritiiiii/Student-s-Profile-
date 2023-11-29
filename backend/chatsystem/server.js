const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Set up MongoDB connection
mongoose.connect('mongodb://localhost/chatapp')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a MongoDB model for storing chat messages
const chatMessageSchema = new mongoose.Schema({
  user: String,
  message: String,
});
const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

// Socket.IO handling
io.on('connection', (socket) => {
  console.log('User connected');

  // Listen for new messages
  socket.on('send-message', (data) => {
    const { user, message } = data;
    
    // Save the message to MongoDB
    const chatMessage = new ChatMessage({ user, message });
    chatMessage.save();

    // Broadcast the message to all connected clients
    io.emit('receive-message', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(9002, () => {
  console.log('Server is running on port 9002');
});
