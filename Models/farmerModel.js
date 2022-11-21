const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const farmerSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "firstname is Required"],
  },
  lastname: {
    type: String,
    required: [true, "lastname is Required"],
  },
  birthday: {
    type: Date,
    required: [true, "birthday is Required"],
  },
  nic_number: {
    type: String,
    required: [true, "nic_number is Required"],
  },
  district: {
    type: String,
    required: [true, "District is Required"],
  },
  division: {
    type: String,
    required: [true, "password1 is Required"],
  },
  postal_Code: {
    type: Number,
    required: [true, "Postal_Code is Required"],
  },
  phone_number: {
    type: Number,
    required: [true, "phone_number is Required"],
  },
  crop: {
    type: String,
    required: [true, "District is Required"],
  },
  address: {
    type: String,
    required: [true, "District is Required"],
  },
  officer: {
    type: String,
    required: [true, "District is Required"],
  },
  approval: {
    type: String,
    required: [true, "District is Required"],
  },
});


module.exports = mongoose.model("farmers", farmerSchema);