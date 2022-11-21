const express = require('express');
const officer = require('../controllers/officercon');

const router = express.Router();

router.get('/getPaygrades', hr_manager.getPaygrades);
router.post("/register", officer.registerEmployee);

module.exports = router;