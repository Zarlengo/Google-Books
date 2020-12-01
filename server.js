const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
const PORT = process.env.PORT || 3001;

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

  // app.listen(PORT, () => {
  //   console.log(`🌎 ==> API server now on port ${PORT}!`);
  // });
  const server = require('http').createServer(app);
  const io = require("socket.io")(server, {
    cors: {
      methods: ["GET", "POST"],
      allowedHeaders: ["google-books-header"],
      credentials: true,
    }
  });



  io.on('connection', socket => {
    console.log('a user connected');
    
    socket.on('disconnect', reason => {
      console.log('user disconnected');
    });
  
    socket.on('book', data => {
      console.log(data);
      socket.broadcast
      .emit('book change', data)
    });
  });
    
  server.listen(PORT, () => {
    console.log(`Socket is listening on port ${ PORT }!`);
  });

});
