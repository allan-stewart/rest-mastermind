'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let routes = require('./src/routes.js');

let app = express();
app.use(bodyParser.json());

routes.registerRoutes(app);

app.listen(3000, () => {
  console.log(`Mastermind server listening on port 3000`);
});
