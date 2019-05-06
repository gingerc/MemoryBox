//server side code
const express = require('express');


const app = express ();
const PORT = process.env.PORT || 5000;

var server = require('http').createServer(app).listen(PORT, function() {
    console.log('Server is listening at port: ', PORT);
  });

app.use(express.static('public'));


var { Client } = require('pg');