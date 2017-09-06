'use strict';


const express = require('express');
const bodyParser = require('body-parser').urlencoded({extended: true});
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoed({extended: true}));
app.use(express.static('./public'));

app.get('/', function(req, res) {
  res.sendFile('public/index.html', {root: '.'});
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
