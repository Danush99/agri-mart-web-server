// helpers
//const prisma = require('../config/client');
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const validate = require('../utils/validation');
const token = require('../utils/token');
const jwt = require('jsonwebtoken');
const allowedRoles = require('../config/allowedRoles');
const User = require("../Models/authModel");

// functions 
const loginData_Compare = async (email,password) => {
    const user = await User.findOne({ email });
    const compareData = {obj:"",msg:"",status:""}
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      //console.log("line 17: ",auth)
      if (auth) {
        compareData.obj=user;
        compareData.status=200;
        compareData.msg="success";
        return compareData;
      }
      compareData.obj=false;
      compareData.status=402;
      compareData.msg=`The password that you've entered is incorrect.`;
      return compareData;
    }
    compareData.obj=false;
    compareData.status=401;
    compareData.msg=`The email address you entered isn't connected to an account.`;
    return compareData;
  };

const handleLogin = async (req, res) => {
    console.log(req.body);
    const { email, password, userType } = req.body; 
    const validation = validate.login_validation({ email, password });
    if (validation.error) {
        return res.status(400).json({
            "message": validation.error.details
        });
    }

    //----------Tried to use "prisma" ::::
    // const auth = await Officer.login(email, password);
    // if (!auth) {
    //     return res.status(404).json({ "message": `User :${email} does not exist...` });
    // }
    //const authObject = await getAuthObject(auth);
    // const result = await prisma.Auth.update({
    //     where: {
    //         id: user_id
    //     },
    //     data: {
    //         refresh_token,
    //         logged_at: new Date()
    //     }
    // });
    // console.log(result)

    // const auth = User.login(email, password);
    // const access_token = token.getAccessToken(auth);
    // const refresh_token = token.getRefreshToken(auth);
    // res.cookie('jwt', refresh_token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
    // return res.status(200).json({
    //     "message": "Login successful",
    //     "access_token": access_token,
    //     "user_type":auth.userType,
    //     "user_Id":auth._id
    // });

    //------------- login
    const compareData = await loginData_Compare(email,password);
    if(!compareData.obj){
        console.log("compareData : ",compareData);
        return  res.status(compareData.status).json({ "message": compareData.msg})
    }else{
        const auth = compareData.obj;
        console.log("author is :",auth);
        const access_token = token.getAccessToken(auth);
        const refresh_token = token.getRefreshToken(auth);
        res.cookie('jwt', refresh_token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
        return res.status(200).json({
            "message": "Login successful",
            "access_token": access_token,
            "user_type":auth.userType,
            "user_Id":auth._id,
            "user":auth
        });
    }
}

const handleLogout = async (req, res) => {
    // const { user_id } = req.body;
    const cookies = req.cookies;
    console.log("cookiee value :", cookies);

    if (!cookies?.jwt) {
        return res.status(204).json({ "message": "No token found" });
    }

    const refresh_token = cookies.jwt;

    const auth = await prisma.Auth.findUnique({
        where: {
            refresh_token
        }
    })

    if (!auth) {
        return res.status(404).json({ "message": `User does not exist...` });
    }

    const result = await prisma.Auth.update({
        where: {
            refresh_token
        },
        data: {
            refresh_token: null,
        }
    });

    console.log(result)

    res.clearCookie('jwt');
    return res.status(200).json({
        "message": "Logout successful",
    });
}


module.exports = {
    handleLogin,
    handleLogout,
}

