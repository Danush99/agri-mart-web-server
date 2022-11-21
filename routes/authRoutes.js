const express = require('express');
const { register, login } = require("../controllers/AuthControllers");
const { checkUser } = require("../Middlewares/authMiddleware");
const router = express.Router();

const adminCont = require('../controllers/adminController');
const authController = require('../controllers/authController');
const offCont = require('../controllers/officerController');
const verifyRoles = require('../middlewares/verifyRoles');
const verifyJWT = require('../middlewares/verifyJWT');

// router.post("/", checkUser); 
// router.post("/admin/register", adminCont.registerOfficer);
// router.post("/login", login);

router
    .post('/', authController.handleLogin)
    //.post("/admin", verifyJWT,adminCont.registerOfficer)
    
    .post("/admin/register", adminCont.registerOfficer)
    .get("/admin/getOfficers", adminCont.getOfficers)
    .get("/admin/getUserStats", adminCont.getUserDetails)
    .post("/admin/convertOfficer", adminCont.convertOfficers)
    .post("/officer/farmerVerify", offCont.verifyFarmer)
    .get("/officer/farmerbio/:officerId", offCont.getfarmers)
    .get("/officer/:officerId", offCont.getofficer)
    .get("/admin/:adminId", adminCont.getadmin)
    //.get('/logout', authController.handleLogout)
    //.post('/register', verifyJWT, verifyRoles(process.env.ADMIN_ROLE), authController.handleNewUser)
    //.get('/new-token', authController.handleNewAccessToken)
    //.get('/user-types', verifyJWT, verifyRoles(process.env.ADMIN_ROLE), authController.getUserTypes);

module.exports = router;
//officer/farmerVerify