const router = require('express').Router();
const {getUcenici} = require('../controllers/uceniciController');

router.get('/',getUcenici);