const express = require('express');

const router = express.Router();
const Auth = require('../middleware/auth');
const handler = require('../handler/handler');

router.use(Auth);
router.get('/profile', handler.getAccount);

module.exports = router;