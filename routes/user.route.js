const express = require('express');

const controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();
// Load data: users from db.json up website with link: http://localhost:3000/users
router.get('/', controller.index);

//Search a user at website: http://localhost:3000/users
router.get('/search', controller.search);

// Load data from users/create.pug up website with link: http://localhost:3000/users/create
router.get('/create', controller.create);

//View a user
router.get('/:id', controller.get);

// Add a user at website: http://localhost:3000/users/create and back website: http://localhost:3000/users
router.post('/create', validate.postCreate, controller.postCreate)

module.exports = router;
