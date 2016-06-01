var playerId = null;

$().ready(function () {
  $.ajaxSetup({
    contentType: "application/json; charset=utf-8"
  });

  $('#new-player-form').on('submit', submitNewPlayer);
  $('#guess-form').on('submit', guess);
  $('#new-game-button').on('click', newGame);
});

function get(url) {
  return $.ajax({type: "GET", url: url});
}

function post(url, data) {
  return $.ajax({type: "POST", url: url, data: JSON.stringify(data)});
}

function submitNewPlayer(event) {
  event.preventDefault();
  $('#new-player').hide();
  $('#registering').show();
  var data = { name: $('#new-player-form input').val() };
  console.log('Registering new user: ' + data.name);
  post('/api/player', data).done(playerRegistered);
  return false;
}

function playerRegistered(data) {
  console.log('Player id:', data.playerId);
  playerId = data.playerId;
  $('#registering').hide();
  $('#stats').show();

  loadStats();
  newGame();
}

function newGame() {
  $('#loading-game').show();
  $('#new-game-button').hide();
  $('#play').hide();
  post('/api/player/' + playerId + '/new-game', {}).done(function (data) {
    $('#loading-game').hide();
    $('#play').show();
    $('#guesses').html('');
    $('#guess-form').show();
    $('#remainingGuesses').html('(' + data.remainingGuesses + ' guesses remain)');
  });
}

function loadStats() {
  get('/api/player/' + playerId).done(function (data) {
    var html = buildStatBlock('Wins', 'win', data.wins) + buildStatBlock('Losses', 'loss', data.losses);
    $('#stats').html(html);
  });
}

function buildStatBlock(label, type, value) {
  var block = '<div class="stat">[label]<span class="[type]">[value]</span></div>'
  block = block.replace('[label]', label);
  block = block.replace('[type]', type);
  block = block.replace('[value]', value);
  return block;
}

function guess(event) {
  event.preventDefault();
  var data = { guess: $('#guess-form input').val() };
  console.log('Guess: ' + data.guess);
  post('/api/player/' + playerId + '/guess', data).done(guessed);
  return false;
}

function guessed(data) {
  var html = '<div>Guess: ' + data.guess +
    ', correctDigits: ' + data.correctDigits +
    ', misplacedDigits: ' + data.misplacedDigits +
    '</div>';
  $('#guesses').append(html);
  $('#remainingGuesses').html('(' + data.remainingGuesses + ' guesses remain)');

  if (data.wasCorrect || data.remainingGuesses < 1) {
    loadStats();
    var html = '<div>You ' + (data.wasCorrect ? 'won!': 'lost') + '</div>';
    $('#guesses').append(html);
    $('#new-game-button').show();
    $('#guess-form').hide();
  }
}
