const express = require('express');
const router = express.Router();
const passport = require('passport');
const studentController = require('../controllers/studentController');
router.get('/signup',studentController.signup);
router.get('/login',studentController.login);
router.post('/signin',passport.authenticate('student',{failureRedirect:'/student/login'}),studentController.signin);
router.post('/create',studentController.create);
module.exports = router;