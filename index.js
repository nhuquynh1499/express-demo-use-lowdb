const express = require('express');

const userRoute = require('./routes/user.route');

const port = 3000;

// Default epress
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// Default pug
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

// Load data from index.pug up website with link: http://localhost:3000/
app.get('/', (req, res) => {
  res.render('index');
})

app.use('/users', userRoute);

app.listen(port, () => {
  console.log('Server listening on port ' + port);
})