const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const verifyRoles = require('../Middlewares/verifyRoles');
const verifyJWT = require('../Middlewares/verifyJWT');


router
    .post('/login', authController.handleLogin)
    .get('/logout', authController.handleLogout)
    .post('/register', verifyJWT, verifyRoles(process.env.ADMIN_ROLE), authController.handleNewUser)
    .get('/new-token', authController.handleNewAccessToken)
    .get('/user-types', verifyJWT, verifyRoles(process.env.ADMIN_ROLE), authController.getUserTypes);


module.exports = router;
