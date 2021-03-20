const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
  score: Number,
  numberOfQuestions: Number,
  numberOfAnsweredQuestions: Number,
  correctAnswers: Number,
  wrongAnswers: Number,
  username: String
}, {
  collection: 'results'
});

module.exports = mongoose.model('Result', resultSchema);