'use strict';

class Mastermind {
  constructor(secret, allowedGuesses) {
    this.secret = secret;
    this.remainingGuesses = allowedGuesses;
  }

  getSecret() {
    return this.secret;
  }

  checkGuess(guess) {
    if (this.remainingGuesses < 1) {
      return {
        guess: null,
        wasCorrect: false,
        correctDigits: 0,
        misplacedDigits: 0,
        remainingGuesses: 0
      };
    }

    this.remainingGuesses--;
    let result = this.processGuess(guess);

    return {
      guess: guess,
      wasCorrect: guess == this.secret,
      correctDigits: result.correctDigits,
      misplacedDigits: this.getMisplacedDigits(result.remainingCodeDigits, result.remainingGuessDigits),
      remainingGuesses: this.remainingGuesses
    };
  }

  processGuess(guess) {
    var result = {
      correctDigits: 0,
      remainingCodeDigits: [],
      remainingGuessDigits: []
    };

    for (let i = 0; i < Math.max(this.secret.length, guess.length); i++) {
      if (this.secret[i] === guess[i]) {
        result.correctDigits++;
      } else {
        result.remainingCodeDigits.push(this.secret[i]);
        result.remainingGuessDigits.push(guess[i]);
      }
    }

    return result;
  }

  getMisplacedDigits(remainingCodeDigits, remainingGuessDigits) {
    let misplaced = 0;
    for (let i = 0; i < remainingCodeDigits.length; i++) {
      let index = remainingGuessDigits.indexOf(remainingCodeDigits[i]);
      if (index >= 0) {
        misplaced++;
        remainingGuessDigits.splice(index, 1);
      }
    }
    return misplaced;
  }
}

module.exports = Mastermind;
