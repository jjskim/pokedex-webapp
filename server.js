'use strict';

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

app.get('/', function(req, res) {
  res.sendFile('public/index.html', {root: '.'});
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
