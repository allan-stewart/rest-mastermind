'use strict';

let Games = require('./games.js');
let uuid = require('node-uuid');

let games = new Games(uuid.v4);

exports.registerRoutes = app => {
  app.get('/api', (request, response) => {
    response.send({
      name: "REST Mastermind server",
      endpoints: [
        { endpoint: '/api/stats', method: 'GET', purpose: 'Get the stats for all current players.' },
        { endpoint: '/api/player', method: 'POST', body: { name: 'Player Name' }, purpose: 'Register a new player.' },
        { endpoint: '/api/player/{playerId}', method: 'GET', purpose: 'Get the stats for a specific player.' },
        { endpoint: '/api/player/{playerId}/new-game', method: 'POST', body: {}, purpose: 'Start a new game for the player.' },
        { endpoint: '/api/player/{playerId}/guess', method: 'POST', body: { guess: '123456' }, purpose: 'Make a guess in the current game.' }
      ]
    });
  });

  app.get('/api/stats', (request, response) => {
    response.send(games.getAllPlayerStats());
  });

  app.post('/api/player', (request, response) => {
    response.send(games.addPlayer(request.body.name));
  });

  app.get('/api/player/:playerId', (request, response) => {
    response.send(games.getPlayerStats(request.params.playerId));
  });

  app.post('/api/player/:playerId/new-game', (request, response) => {
    response.send(games.newGame(request.params.playerId));
  });

  app.post('/api/player/:playerId/guess', (request, response) => {
    response.send(games.guess(request.params.playerId, request.body.guess));
  });
};
