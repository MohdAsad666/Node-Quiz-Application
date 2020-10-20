const express = require('express');
const router = express.Router();
const homeController = require("../controllers/homeController");
router.get('/',homeController.homePage);
router.get('/login',homeController.login);
router.use('/teacher',require('./teacher'));
router.use('/student',require('./student'));
module.exports = router;