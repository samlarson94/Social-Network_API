const { connect, connection } = require('mongoose');

//Revisit after creating Heroku application

// const connectionString =
//   process.env.MONGODB_URI || 'mongodb://localhost:27017/studentsDB';

connect('mongodb://localhost/commentExample', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;