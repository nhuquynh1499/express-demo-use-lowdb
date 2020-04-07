const express = require('express');
const app = express();

const port = 3000;

var users = [
  { id: 1, name: 'Thinh' },
  { id: 2, name: 'Quynh'},
  { id: 3, name: 'Tan'}
];

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/users', (req, res) => {
  res.render('users/index', {
    users: users
  });
})

app.get('/users/search', (req, res) => {
  var q = req.query.q;
  var matchedUsers = users.filter((user) => {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  })
  res.render('users/index', {
    users: matchedUsers,
    contentSearch: q
  });
})

app.listen(port, () => {
  console.log('Server listening on port ' + port);
})