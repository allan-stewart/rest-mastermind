'use strict';

let express = require('express');
let bodyParser = require('body-parser');
var cors = require('cors');
let routes = require('./src/routes.js');
let config = require('./config.json');

let app = express();
app.use(bodyParser.json());
app.use(express.static('www'));
app.use(cors());

routes.registerRoutes(app);

app.listen(config.port, () => {
  console.log(`Mastermind server listening on port ${config.port}`);
});
