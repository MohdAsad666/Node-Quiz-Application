const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
router.get('/signup',studentController.signup);
router.get('/login',studentController.login);
router.post('/signin',studentController.signin);
router.post('/create',studentController.create);
module.exports = router;