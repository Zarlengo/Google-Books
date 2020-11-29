const express = require('express');
const app = express();

const path = require('path');

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 3001;

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${ process.env.PORT || 3001 }`,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

const router = express.Router();
const mongoose = require('mongoose');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/googleBook',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
).then(() => {
  // Define API routes here
  app.use('/api', require('./utils/api')(mongoose));
  console.log('Database is connected');

  // Send every other request to the React app
  // Define any API routes before this runs
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
  });

  http.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });

  io.on('connection', (socket) => {
    console.log('new client connected');
    socket.emit('connection', null);

    socket.on('send-message', message => {
      io.emit('message', message);
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
    })
  });
});
