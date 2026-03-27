const express = require('express');
const router = express.Router();

const getUserController = require('../controllers/user.controller.js');
router.get('/', getUserController);

module.exports = router;

