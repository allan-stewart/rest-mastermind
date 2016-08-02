var request = require('request');

var baseUri = 'http://localhost:3000/api';
var commands = {
  'api': api,
  'register': register,
  'new-game': newGame,
  'guess': guess,
  'stats': stats
};
var command = commands[process.argv[2]];

if (command === undefined) {
  if (process.argv[2]) {
    console.log('Unknown command:' + process.argv[2]);
  }
  console.log();
  console.log('Usage:');
  console.log('  node play.js api                       - Call the base API.');
  console.log('  node play.js register <name>           - Register a new player.');
  console.log('  node play.js new-game <playerId>       - Create a new game.');
  console.log('  node play.js guess <playerId> <guess>  - Make a guess in a current game.');
  console.log('  node play.js stats [playerId]          - Get stats for all players or a specific player.');
} else {
  command();
}

function call(options) {
  logRequest(options);

  options.json = true;
  request(options, function (error, response, body) {
    if (error) {
      console.error(error);
      return;
    }
    logResponse(response, body);
  });
}

function logRequest(options) {
  console.log('=== REQUEST ===');
  console.log(options.method || 'GET', options.uri);
  if (options.method == 'POST') {
    console.log('Content-Type: application/json');
    console.log();
    console.log(options.body);
  }
  console.log();
}

function logResponse(response, body) {
  console.log('=== RESPONSE ===');
  console.log('Status:', response.statusCode);
  console.log();
  console.log(JSON.stringify(body, null, 2));
}

function api() {
  call({
    uri:  baseUri
  });
}

function register() {
  var name = process.argv[3];
  call({
    method: 'POST',
    uri: baseUri + '/player',
    body: {name: name}
  });
}

function newGame() {
  var playerId = process.argv[3];
  call({
    method: 'POST',
    uri: baseUri + '/player/' + playerId + '/new-game'
  });
}

function guess() {
  var playerId = process.argv[3];
  var guess = process.argv[4];
  call({
    method: 'POST',
    uri: baseUri + '/player/' + playerId + '/guess',
    body: {guess: guess}
  });
}

function stats() {
  var playerId = process.argv[3];
  var uri = playerId ? baseUri + '/player/' + playerId : baseUri + '/stats';
  call({
    uri: uri
  });
}
