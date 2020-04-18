const db = require('../db');

module.exports.index = (req, res) => {
  var page = parseInt(req.query.page) || 1; // n - số thứ tự trang.
  var perPage = 8; // x - số lượng sản phẩm trong 1 trang.

  var start = (page - 1) * perPage;
  var end = page * perPage;

  var numberOfPages = Math.ceil(db.get('products').value().length / 8);
  var products = db.get('products').value().slice(start, end);
  res.render('products/index', {
    //products: db.get('products').drop(start).take(perPage).value();
    products: products,
    numberOfPages: numberOfPages
  });
  //console.log(numberOfPages)
}