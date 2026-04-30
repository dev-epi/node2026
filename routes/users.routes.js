const { create } = require('../controllers/users.controller');

const router = require('express').Router();

router.post('/create' , create)

module.exports = router