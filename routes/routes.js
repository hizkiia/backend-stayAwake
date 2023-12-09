const express = require('express');
const router = express.Router();
const handler = require('../handler/handler');

router.post('/registerUser', handler.registerUser);
router.post('/registerCompany', handler.registerCompany);
router.get('/getUser/:kodeReferral', handler.getUserbyReferral);
router.post('/login', handler.login);

module.exports = router;