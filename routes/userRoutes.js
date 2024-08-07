const express = require('express');
const router = express.Router();
const Cuser = require('../controllers/Cuser');

router.post('/', Cuser.createUser);

module.exports = router;
