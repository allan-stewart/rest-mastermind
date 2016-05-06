'use strict';

let Games = require('./games.js');
let uuid = require('node-uuid');

let games = new Games(uuid.v4);

exports.registerRoutes = app => {
  app.get('/api/stats', (request, response) => {
    response.send(games.getAllPlayerStats());
  });

  app.post('/api/player', (request, response) => {
    response.send(games.addPlayer(request.body.name));
  });

  app.post('/api/player/:playerId/new-game', (request, response) => {
    response.send(games.newGame(request.params.playerId));
  });

  app.post('/api/player/:playerId/guess', (request, response) => {
    response.send(games.guess(request.params.playerId, request.body.guess));
  });

  app.get('/api/player/:playerId/stats', (request, response) => {
    response.send(games.getPlayerStats(request.params.playerId));
  });
};
