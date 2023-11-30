const express = require('express');
const router = express.Router();
const handler = require('../handler/handler');

router.post('/register', handler.register);

module.exports = router;