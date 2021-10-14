var models = require('../models');

module.exports = {
  get: function (req, res) {
    models.messages.getAll((err, results) => {
      if (err) {
        res.send().status(500);
      }
      res.send(results).status(200);
    });
  }, // a function which handles a get request for all messages
  post: function (req, res) {
    models.messages.create(req.body, () => {
      res.send().status(200);
    });
  } // a function which handles posting a message to the database
};
