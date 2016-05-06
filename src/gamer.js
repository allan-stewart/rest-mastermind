'use strict';

var Mastermind = require('./mastermind.js');

var secretLength = 6;
var guessesPerGame = 10;

class Gamer {
  constructor(name, secretGenerator) {
    this.stats = {
      name,
      wins: 0,
      losses: 0,
      lastGuess: null,
      isPlaying: false
    };
    this.game = null;
    this.secretGenerator = secretGenerator;
  }

  getStats() {
    return this.stats;
  }

  newGame() {
    this.game = new Mastermind(this.secretGenerator.generateWithLength(secretLength), guessesPerGame);
    this.stats.isPlaying = true;
    return { secretLength, remainingGuesses: guessesPerGame };
  }

  guess(guess) {
    if (!this.game) {
      return {error: 'No current game.'}
    }
    var result = this.game.checkGuess(guess);
    this.stats.lastGuess = result;
    if (result.wasCorrect) {
      this.stats.wins++;
      this.clearGame();
    }
    if (result.remainingGuesses < 1) {
      this.stats.losses++;
      this.clearGame();
    }
    return result;
  }

  clearGame() {
    this.stats.isPlaying = false;
    this.game = null;
  }
}

module.exports = Gamer;
