// const mongoose = require('mongoose');
const { connect, connection } = require('mongoose');

connect('mongodb://localhost/avengersdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;