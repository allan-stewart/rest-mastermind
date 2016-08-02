'use strict';

let express = require('express');
let bodyParser = require('body-parser');
var cors = require('cors');
let routes = require('./src/routes.js');

let app = express();
app.use(bodyParser.json());
app.use(express.static('www'));
app.use(cors());

routes.registerRoutes(app);

app.listen(3000, () => {
  console.log(`Mastermind server listening on port 3000`);
});
