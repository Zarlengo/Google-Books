const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const IOPORT = process.env.IOPORT || 3002;
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', (client) => {

});
server.listen(IOPORT);

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

  app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
});
