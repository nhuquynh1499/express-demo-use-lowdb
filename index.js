const express = require('express');
const app = express();

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/users', (req, res) => {
  res.render('users/index', {
    users: [
      { id: 1, name: 'Thinh' },
      { id: 2, name: 'Quynh'},
      { id: 3, name: 'Tan'}
    ]
  });
})

app.listen(port, () => {
  console.log('Server listening on port ' + port);
})