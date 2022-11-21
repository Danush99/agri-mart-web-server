const express = require('express');
const officer = require('../Controllers/officercon');

const router = express.Router();

router.get('/getPaygrades', hr_manager.getPaygrades);
router.post("/register", officer.registerEmployee);

module.exports = router;