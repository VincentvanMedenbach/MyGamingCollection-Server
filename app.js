const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//  get routes
const accessoryRoutes = require('./api/routes/accessories');
const consoleRoutes = require('./api/routes/consoles');
const gameRoutes = require('./api/routes/games');
const userRoutes = require('./api/routes/users');

//  connect to db
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true
  }
);

//  use middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS stuff
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

//  use routes
app.use('/accessories', accessoryRoutes);
app.use('/consoles', consoleRoutes);
app.use('/games', gameRoutes);
app.use('/users', userRoutes);

//  route does not exist
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
