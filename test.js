var express = require('express');
var app = express();
var countdown = require('./index')
app.get('/*', function (req, res) {
  countdown(req, res)
});
var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Example app listening at port %s', port);
});
module.exports = server;
