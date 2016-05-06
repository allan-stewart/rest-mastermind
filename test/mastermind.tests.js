'use strict';

let Mastermind = require('../src/mastermind.js');
let assert = require('assert');

describe('Mastermind', () => {
  let subject;

  beforeEach(() => {
    subject = new Mastermind('123256', 3);
  });

  describe('new instance', () => {
    it('should have the secret', () => {
      assert.equal(subject.getSecret(), '123256');
    });
  });

  describe('checkGuess', () => {
    it('should return the guess', () => {
      let result = subject.checkGuess('111111');
      assert.equal(result.guess, '111111');
    });

    it('should return correct if the guess matches the secret', () => {
      let result = subject.checkGuess('123256');
      assert.equal(result.wasCorrect, true);
    });

    it('should return failure if the guess does not match the secret', () => {
      let result = subject.checkGuess('123456');
      assert.equal(result.wasCorrect, false);
    });

    it('should return the number of correctly placed digits', () => {
      let result = subject.checkGuess('124357');
      assert.equal(result.correctDigits, 3);
    });

    it('should return the number of misplaced digits', () => {
      let result = subject.checkGuess('126357');
      assert.equal(result.misplacedDigits, 2);
    });

    it('should return the number of remaining guesses', () => {
      let result = subject.checkGuess('126357');
      assert.equal(result.remainingGuesses, 2);
    });

    it('should handle a guess shorter than the secret', () => {
      let result = subject.checkGuess('125');
      assert.deepEqual(result, {
        guess: '125',
        wasCorrect: false,
        correctDigits: 2,
        misplacedDigits: 1,
        remainingGuesses: 2
      });
    });

    it('should handle a guess longer than the secret', () => {
      let result = subject.checkGuess('12345678');
      assert.deepEqual(result, {
        guess: '12345678',
        wasCorrect: false,
        correctDigits: 5,
        misplacedDigits: 0,
        remainingGuesses: 2
      });
    });

    it('should return a defined state when guessing and there were no remaining guesses', () => {
      subject.checkGuess('111111');
      subject.checkGuess('222222');
      subject.checkGuess('333333');
      let result = subject.checkGuess('123256');
      assert.deepEqual(result, {
        guess: null,
        wasCorrect: false,
        correctDigits: 0,
        misplacedDigits: 0,
        remainingGuesses: 0
      });
    });
  });
});
