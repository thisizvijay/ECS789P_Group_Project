const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const DriverModel = new Schema({
  id: ObjectId,
  full_name: String,
  gender: {
    type: String,
    enum: ["Male", "Female", "Others", "Not Specified"],
    default: "Not Specified",
  },
  date_of_birth: Date,
  driver_code: String,
  email: String,
  phone_number: String,
  ni_number: String,
  address: Object,
  license_number: String,
  shift:Object,
  bank_account: Object,
  componensation: Object,
  experience: Array,
});
const Drivers = mongoose.model("drivers", DriverModel);

module.exports = { Drivers };
