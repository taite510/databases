var db = require('../db').db;

module.exports = {
  getOne: function(id, callback) {
    const queryString = 'SELECT roomname FROM rooms where id = ?';
    const queryArgs = [id];
    db.query(queryString, queryArgs, (err, results) => {
      if (err) {
        console.log(err);
      }
      callback(null, results[0].roomname);
    });
  }
};