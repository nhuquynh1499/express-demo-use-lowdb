const shortid = require('shortid');
const db = require('../db');

module.exports.index = (req, res) => {
  res.render('users/index', {
    users: db.get('users').value()
  });
};

module.exports.search = (req, res) => {
  var q = req.query.q;
  var matchedUsers = db.get('users').filter({ name: q}).value()
  res.render('users/index', {
    users: matchedUsers,
    contentSearch: q
  });
};

module.exports.create = (req, res) => {
  res.render('users/create');
};

module.exports.get = (req, res) => {
  var id = req.params.id;

  var user = db.get('users').find({ id: id }).value();

  res.render('users/view', {
    user: user
  });
};

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate(); 
  var errors = [];

  if (!req.body.name) {
    errors.push('Name is required.');
  }

  if (!req.body.phone) {
    errors.push('Phone is required.');
  }

  if (errors.length) {
    res.render('users/create', {
      errors: errors,
      values: req.body
    });
    return;
  }

  db.get('users').push(req.body).write();
  res.redirect('/users');
};