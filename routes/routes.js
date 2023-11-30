const express = require('express');
const router = express.Router();
const handler = require('../handler/handler');

router.post('/register', handler.register);
router.post('/login', handler.login);

module.exports = router;