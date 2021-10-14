var db = require('../db').db;

module.exports = {
  getAll: function (callback) {
    const queryString = 'SELECT username FROM users';
    const queryArgs = [];
    db.query(queryString, queryArgs, (err, results) => {
      if (err) {
        console.log(err);
      }
      callback(null, results);
    });
  },
  create: function (username, callback) {
    const queryString = 'INSERT INTO users (username) VALUES (?);';
    const queryArgs = [username];
    db.query(queryString, queryArgs, (err, results) => {
      if (err) {
        console.log(err);
      }
      callback(null, results);
    });
  },
  getOne: function(id, callback) {
    const queryString = 'SELECT username FROM users where id = ?';
    const queryArgs = [id];
    db.query(queryString, queryArgs, (err, results) => {
      if (err) {
        console.log(err);
      }
      callback(null, results[0].username);
    });
  }
};
