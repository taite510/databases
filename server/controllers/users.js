var models = require('../models');

module.exports = {
  get: function (req, res) {},
  post: function (req, res) {
    models.users.getAll((err, results) => {
      var usernames = results.map(username => {
        return username.username;
      });
      if (usernames.indexOf(req.body.username) === -1) {
        models.users.create(req.body.username, (err, results) => {
          res.send().status(200);
        });
      } else {
        res.send().status(200);
      }
    });
  }
};
