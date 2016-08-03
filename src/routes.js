'use strict';

let Games = require('./games.js');
let uuid = require('node-uuid');

let games = new Games(uuid.v4);
setInterval(() => { games.removeInactivePlayers(300000)}, 30000);

let maxNameLength = 30;

exports.registerRoutes = app => {
  app.get('/api', (request, response) => {
    response.send({
      name: "REST Mastermind server",
      endpoints: [
        { endpoint: '/api/stats', method: 'GET', purpose: 'Get the stats for all current players.' },
        { endpoint: '/api/player', method: 'POST', body: { name: 'Player Name' }, purpose: 'Register a new player.' },
        { endpoint: '/api/player/{playerId}', method: 'GET', purpose: 'Get the stats for a specific player.' },
        { endpoint: '/api/player/{playerId}/new-game', method: 'POST', body: {}, purpose: 'Start a new game for the player.' },
        { endpoint: '/api/player/{playerId}/guess', method: 'POST', body: { guess: '1234' }, purpose: 'Make a guess in the current game.' }
      ]
    });
  });

  app.get('/api/stats', (request, response) => {
    response.send(games.getAllPlayerStats());
  });

  app.post('/api/player', (request, response) => {
    let name = request.body.name;
    if (!name) {
      response.status(400).send({error: 'You must provide a name'});
      return;
    }
    if (name.length > maxNameLength) {
      response.status(400).send({error: `Names may not be longer than ${maxNameLength} characters`});
      return;
    }
    if (games.getAllPlayerStats().some(x => x.name.toLowerCase() == name.toLowerCase())) {
      response.status(409).send({error: `There is already a player with the name ${name}`});
      return;
    }
    response.send(games.addPlayer(name));
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
