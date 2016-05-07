'use strict';

let Games = require('../src/games.js');
let assert = require('assert');

describe('Games', () => {
  let subject;
  let idsGenerated = 0;
  let idGenerator = () => { return '' + (idsGenerated++) };

  beforeEach(() => {
    subject = new Games(idGenerator);
  });

  describe('initial state', () => {
    it('should not have any players', () => {
      let result = subject.getAllPlayerStats();
      assert.equal(result.length, 0);
    });
  });

  describe('addPlayer', () => {
    it('should return the id of the new player', () => {
      var result = subject.addPlayer('Tester');
      assert.deepEqual(result, { playerId: '0' });
    });
  });

  describe('getAllPlayerStates', () => {
    it('should return all player states', () => {
      subject.addPlayer('Tester 1');
      subject.addPlayer('Tester 2');
      var result = subject.getAllPlayerStats();
      assert.equal(result.length, 2);
      assert.equal(result[0].name, 'Tester 1');
      assert.equal(result[1].name, 'Tester 2');
    });
  });

  describe('getPlayerState', () => {
    it('should return player state', () => {
      var playerId = subject.addPlayer('Tester').playerId;
      var result = subject.getPlayerStats(playerId);
      assert.equal(result.name, 'Tester');
      assert.equal(result.wins, 0);
      assert.equal(result.losses, 0);
      assert.equal(result.lastGuess, null);
      assert.equal(result.hasActiveGame, false);
    });

    it('should return an error if there is no player found', () => {
      var result = subject.getPlayerStats('fake-id');
      assert.deepEqual(result, { error: 'No player found by id: fake-id' });
    });
  });

  describe('newGame', () => {
    it('should return the result of starting a new game', () => {
      var playerId = subject.addPlayer('Tester').playerId;
      var result = subject.newGame(playerId);
      assert.deepEqual(result, {
        remainingGuesses: 10,
        secretLength: 6
      });
    });

    it('should return an error if there is no player found', () => {
      var result = subject.newGame('fake-id');
      assert.deepEqual(result, { error: 'No player found by id: fake-id' });
    });
  });

  describe('guess', () => {
    it('should return the result of the guess', () => {
      var playerId = subject.addPlayer('Tester').playerId;
      var result = subject.guess(playerId, '123456');
      assert.deepEqual(result, { error: 'No current game.' });
    });

    it('should return an error if there is no player found', () => {
      var result = subject.guess('fake-id');
      assert.deepEqual(result, { error: 'No player found by id: fake-id' });
    });
  });

  describe('removeInactivePlayers', () => {
    it('should remove players that have been inactive for the specified time', (done) => {
      var playerId1 = subject.addPlayer('Tester 1').playerId;
      var playerId2 = subject.addPlayer('Tester 2').playerId;
      setTimeout(() => {
        subject.newGame(playerId2);
        subject.removeInactivePlayers(25);
        var result = subject.getAllPlayerStats();
        assert.equal(result.length, 1);
        assert.equal(result[0].name, 'Tester 2');
        done();
      }, 50);
    });
  });
});
