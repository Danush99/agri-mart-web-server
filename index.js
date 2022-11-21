const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const app = express();
const port = process.env.PORT || 5000;


//dbpart
const localhostUri="mongodb://localhost:27017/Agri-Mart"
const  uri = process.env.ATLAS_URI
const mongoose = require("mongoose");

app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    })
  );
  

app.use(bodyParser.urlencoded({extended: true}));
//app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);


mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("DB connection successfull");
}).catch((err)=>{
    console.log(err.message);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});