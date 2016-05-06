$().ready(function () {
  loadStats();
  setInterval(loadStats, 5000);
});

function get(url) {
  return $.ajax({type: "GET", url: url});
}

function loadStats() {
  get('/api/stats').done(function (data) {
    data.sort(sorter);
    var headers = ['Player', 'Wins', 'Losses', 'Last Guess', 'Active Game?'];
    var html = '<table>' +
      '<tr>' + headers.reduce(reduceHeaders, '') + '</tr>' +
      data.map(mapData).join('') +
      '</table>';
    $('body').html(html);
  });
}

function sorter(a, b) {
  var aValue = a.wins - a.losses;
  var bValue = b.wins - b.losses;
  return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
}

function reduceHeaders(prev, current) {
  return prev + '<th>' + current + '</th>'
}

function mapData(item) {
  return '<tr><td>' + item.name +
    '</td><td>' + item.wins +
    '</td><td>' + item.losses +
    '</td><td>' + (item.lastGuess ? item.lastGuess.guess : '') +
    '</td><td>' + item.hasActiveGame +
    '</td></tr>';
}
