const mongoose = require('mongoose');

// game schema
const gameSchema = new mongoose.Schema({
  // might need a custom id?

  gameName: { type: String, required: true },

  platform: { type: String, required: true },

  // maybe make genres an array?
  genre: { type: String, required: true },

  imageURL: String,

  // add ratings?

  review: { type: String, required: true },
});

// may need a separate review schema

module.exports = mongoose.model('games', gameSchema);
