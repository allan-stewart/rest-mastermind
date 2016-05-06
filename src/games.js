'use strict';

var Gamer = require('./gamer.js');
var secretGenerator = require('./secretGenerator.js');
var timestamper = require('./timestamper.js');

class Games {
  constructor(idGenerator) {
    this.idGenerator = idGenerator;
    this.players = [];
    this.secretGenerator = new secretGenerator();
  }

  getAllPlayerStats() {
    return this.players.map(player => {
      return player.gamer.getStats();
    });
  }

  addPlayer(name) {
    let playerId = this.idGenerator();
    this.players.push({ playerId, gamer: new Gamer(name, this.secretGenerator, timestamper) });
    return { playerId };
  }

  getPlayerById(playerId) {
    return this.players.find(x => x.playerId == playerId);
  }

  getPlayerStats(playerId) {
    var player = this.getPlayerById(playerId);
    return player ? player.gamer.getStats() : { error: `No player found by id: ${playerId}` };
  }

  newGame(playerId) {
    var player = this.getPlayerById(playerId);
    return player ? player.gamer.newGame() : { error: `No player found by id: ${playerId}` };
  }

  guess(playerId, guess) {
    var player = this.getPlayerById(playerId);
    return player ? player.gamer.guess(guess) : { error: `No player found by id: ${playerId}` };
  }
}

module.exports = Games;
