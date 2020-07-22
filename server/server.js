const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Game = require('./models/gameModel.js');

const PORT = process.env.PORT || 3000;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/gameapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'gameapp',
});

// serve static files under public folder
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../public')));

// GET request to add characters
// app.get('/add', (req, res) => {
//   res.send();
// });

// POST request to add characters
// addGame middleware will add the request body to our database
const addGame = async (req, res, next) => {
  try {
    // console.log('req body: ', req.body);
    const { gameName, platform, genre, imageURL, review } = req.body;
    await Game.create({ gameName, platform, genre, imageURL, review });
    next();
  } catch (error) {
    next({
      log: `error occurred at addGame middleware. error message is: ${error}`,
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

app.post('/api/add', addGame, (req, res) => {
  res.status(200).send('added successfully');
});

// GET games with search parameters
// middleware for finding games with specific params
// params will come from query variable in useEffect which originates from search component
const findGame = async (req, res, next) => {
  try {
    const { name } = req.params;
    // console.log('name', name);
    const specificGames = await Game.find({
      gameName: { $regex: name, $options: 'gi' },
    });
    res.locals.gameList = specificGames;
    next();
  } catch (error) {
    next({
      log: `error occurred at findGame middleware. error message is: ${error}`,
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};
app.get('/api/games/:name', findGame, (req, res) => {
  res.status(200).json(res.locals.gameList);
});

// GET request to my games
// middleware to get all games
const getAllGames = async (req, res, next) => {
  try {
    const gameList = await Game.find();
    res.locals.gameList = gameList;
    next();
  } catch (error) {
    next({
      log: `error occurred at getAllGames middleware. error message is: ${error}`,
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

app.get('/api/games', getAllGames, (req, res) => {
  res.status(200).json(res.locals.gameList);
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

module.exports = app;
