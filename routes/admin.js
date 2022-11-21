const express = require('express');
const adminCont = require('../controllers/adminController');

const router = express.Router();

router.post("/register", adminCont.registerOfficer);

module.exports = router;