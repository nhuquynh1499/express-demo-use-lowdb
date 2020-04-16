const md5 = require('md5');

const db = require('../db');

module.exports.login = (req, res) => {
  res.render('auth/login');
};

module.exports.postLogin = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var user = db.get('users').find({ email: email }).value();

  // Không có tài khoản này nhá.
  if (!user) {
    res.render('auth/login', {
      errors: [
        'User does not exist.'
      ],
      value: req.body
    });
    return;
  }
  
  var hashedPassword = md5(password);

  // Sai password rồi, chết chưa con.
  if (user.password !== hashedPassword) {
    res.render('auth/login', {
      errors: [
        'Wrong password.'
      ],
      value: req.body
    });
    return;
  }

  res.cookie('userId', user.id, {
    signed: true
  });
  // Đúng rùi bạn ơi, may quá.
  res.redirect('/users');
};
