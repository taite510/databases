var db = require('../db').db;

module.exports = {
  getAll: function (callback) {
    const queryString = 'SELECT users.username, messages.message, rooms.roomname FROM messages, users, rooms where users.id = messages.id_user and rooms.id = messages.id_room';
    const queryArgs = [];
    db.query(queryString, queryArgs, (err, results) => {
      if (err) {
        console.log(err);
      }
      callback(null, results);
    });
  }, // a function which produces all the messages
  create: function (messageObj, callback) {
    var queryString = 'SELECT id FROM users where username = ?';
    var queryArgs = [messageObj.username];
    db.query(queryString, queryArgs, (err, results) => {
      if (err) {
        console.log(err);
      }
      console.log(results[0]);
      var checkRoomString = 'SELECT * FROM rooms where roomname = ?';
      var checkRoomArgs = [messageObj.roomname];
      db.query(checkRoomString, checkRoomArgs, (err, roomResults) => {
        if (err) {
          console.log(err);
        }
        if (roomResults.length !== 0) {
          var newQueryString = 'INSERT INTO messages (id_user, id_room, message) VALUES (?,?,?)';
          var newQueryArgs = [results[0].id, roomResults[0].id, messageObj.message];
          db.query(newQueryString, newQueryArgs, (err, results) => {
            if (err) {
              console.log(err);
            }
            callback(null, results);
          });
        } else {
          var newRoomQuery = 'INSERT INTO rooms (roomname) VALUES (?)';
          var newRoomArgs = [messageObj.roomname];
          db.query(newRoomQuery, newRoomArgs, (err, newRoomResults) => {
            // newRoomResults.insertId
            var newQueryString = 'INSERT INTO messages (id_user, id_room, message) VALUES (?,?,?)';
            var newQueryArgs = [results[0].id, newRoomResults.insertId, messageObj.message];
            db.query(newQueryString, newQueryArgs, (err, results) => {
              if (err) {
                console.log(err);
              }
              callback(null, results);
            });
          });
        }
      });
      // var newQueryString = 'INSERT INTO messages (id_user, id_room, message) VALUES (?,?,?)';
      // var newQueryArgs = [results[0].id, 1, messageObj.message];
      // db.query(newQueryString, newQueryArgs, (err, results) => {
      //   if (err) {
      //     console.log(err);
      //   }
      //   callback(null, results);
      // });

      //callback(null, results);
    });
  } // a function which can be used to insert a message into the database
};
