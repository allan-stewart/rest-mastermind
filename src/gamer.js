'use strict';

var Mastermind = require('./mastermind.js');

var secretLength = 6;
var guessesPerGame = 10;

class Gamer {
  constructor(name, secretGenerator, timestamper) {
    this.stats = {
      name,
      wins: 0,
      losses: 0,
      lastGuess: null,
      hasActiveGame: false,
      lastAction: timestamper()
    };
    this.game = null;
    this.secretGenerator = secretGenerator;
    this.timestamper = timestamper;
  }

  getStats() {
    return this.stats;
  }

  newGame() {
    if (this.stats.hasActiveGame) {
      this.stats.losses++;
    }
    this.game = new Mastermind(this.secretGenerator.generateWithLength(secretLength), guessesPerGame);
    this.stats.hasActiveGame = true;
    this.stats.lastAction = this.timestamper();
    return { secretLength, remainingGuesses: guessesPerGame };
  }

  guess(guess) {
    this.stats.lastAction = this.timestamper();
    if (!this.game) {
      return {error: 'No current game.'}
    }
    var result = this.game.checkGuess(guess);
    this.stats.lastGuess = result;
    if (result.wasCorrect) {
      this.stats.wins++;
      this.clearGame();
    } else {
      if (result.remainingGuesses < 1) {
        this.stats.losses++;
        this.clearGame();
      }
    }
    return result;
  }

  clearGame() {
    this.stats.hasActiveGame = false;
    this.game = null;
  }
}

module.exports = Gamer;
