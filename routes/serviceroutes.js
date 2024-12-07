const express = require('express');
const { getServices } = require('../controllers/servicecontroller');
const router = express.Router();

router.get('/', getServices);


module.exports = router;
