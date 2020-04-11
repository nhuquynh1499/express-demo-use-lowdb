const express = require('express');
const app = express();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const port = 3000;

// Default db.json
db.defaults({users: []}).write();

// Default epress
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// Default pug
app.set('view engine', 'pug');
app.set('views', './views');

// Load data from index.pug up website with link: http://localhost:3000/
app.get('/', (req, res) => {
  res.render('index');
})

// Load data: users from db.json up website with link: http://localhost:3000/users
app.get('/users', (req, res) => {
  res.render('users/index', {
    users: db.get('users').value()
  });
})

//Search a user at website: http://localhost:3000/users
app.get('/users/search', (req, res) => {
  var q = req.query.q;
  var matchedUsers = db.get('users').filter((user) => {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  }).value()
  res.render('users/index', {
    users: matchedUsers,
    contentSearch: q
  });
})

// Load data from users/create.pug up website with link: http://localhost:3000/users/create
app.get('/users/create', (req, res) => {
  res.render('users/create');
})

// Add a user at website: http://localhost:3000/users/create and back website: http://localhost:3000/users
app.post('/users/create', (req, res) => {
  db.get('users').push(req.body).write();
  res.redirect('/users');
})

app.listen(port, () => {
  console.log('Server listening on port ' + port);
})