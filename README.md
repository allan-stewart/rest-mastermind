# rest-mastermind
A server built in [Node.js](https://nodejs.org/) for hosting a mastermind game.
The server provides a RESTful JSON API for the game along with an introduction
page, scoreboard, and example clients for playing the game.

The intent of this project is to provide something fun for groups of developers
to hack on at meetups or other gatherings.


## Getting things running

After cloning the repository, run `npm install` to get the dependencies,
then run the server via `npm start`.

By default the server will run on port 3000, but this can be changed by editing
the `config.json` file.
(The rest of this README will assume you are running the default port and
accessing via `localhost`; update with the appropriate host / IP address
and port as necessary.)

With the server running, you can then visit the intro page at:
[http://localhost:3000/](http://localhost:3000/)

When hosting this in a group, the facilitator should explain the game and then
may want to display the scoreboard page:
[http://localhost:3000/scoreboard.html](http://localhost:3000/scoreboard.html)


## Playing the game

The idea is that the players will play the game by writing their own code that
calls the API. Because it is REST-based, it should be simple for players to use
whatever languages they want, including client-side JavaScript (the server
should support CORS requests).

Developers with little experience with JSON-based REST APIs will hopefully learn
some of the basic concepts that are used to call many APIs across the web.
More experienced developers may choose to make more complicated user interfaces,
or even opt to create algorithms / AI for playing the game.

There are also two reference implementations provided.
The first is a JavaScript page hosted by the server at:
[http://localhost:3000/play.html](http://localhost:3000/play.html)

The second is the [play.js](play.js) node script.
Run `node play.js` to get usage information.
