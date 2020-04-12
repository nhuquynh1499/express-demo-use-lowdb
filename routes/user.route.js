const express = require('express');
const shortid = require('shortid');

const db = require('../db');

const router = express.Router();
// Load data: users from db.json up website with link: http://localhost:3000/users
router.get('/', (req, res) => {
  res.render('users/index', {
    users: db.get('users').value()
  });
})

//Search a user at website: http://localhost:3000/users
router.get('/search', (req, res) => {
  var q = req.query.q;
  var matchedUsers = db.get('users').filter({ name: q}).value()
  res.render('users/index', {
    users: matchedUsers,
    contentSearch: q
  });
})

// Load data from users/create.pug up website with link: http://localhost:3000/users/create
router.get('/create', (req, res) => {
  res.render('users/create');
})

//View a user
router.get('/:id', (req, res) => {
  var id = req.params.id;

  var user = db.get('users').find({ id: id }).value();

  res.render('users/view', {
    user: user
  });
})

// Add a user at website: http://localhost:3000/users/create and back website: http://localhost:3000/users
router.post('/create', (req, res) => {
  req.body.id = shortid.generate(); 
  db.get('users').push(req.body).write();
  res.redirect('/users');
})

module.exports = router;
