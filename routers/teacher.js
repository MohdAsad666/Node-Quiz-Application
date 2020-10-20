const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
router.get('/signup',teacherController.signup);
router.get('/login',teacherController.login);
router.post('/signin',teacherController.signin);
router.post('/create',teacherController.create);
module.exports = router;