const router = require('express').Router();
const controller = require('../controllers/authController');

// POST /api/signup
router.post('/signup', controller.signup);

// POST /api/login
router.post('/login', controller.login);

module.exports = router;
