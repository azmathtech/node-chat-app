require('./config/config');

const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');

// console.log(__dirname + '/../public');
// console.log(publicPath);

var app = express();
const port = process.env.PORT;

app.use(express.static(publicPath)); //middleware

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
