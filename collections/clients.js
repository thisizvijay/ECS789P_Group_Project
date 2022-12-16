const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ClientModel = new Schema({
  id: ObjectId,
  full_name: String,
  gender: {
    type: String,
    enum: ["Male", "Female", "Others", "Not Specified"],
    default: "Not Specified",
  },
  age: Number,
  email: {
    type: String,
    required: false,
  },
  phone_number: String,
  client_type: {
    type: String,
    enum: ["Private", "Corporate"],
    default: "Private",
  },
  regular_bookings: {
    type: Object,
    required: false,
  },
  bank_account:{
    type: Object,
    required: false,
  },
  discount: {
    type: Number,
    default: 0,
  },
});
const Clients = mongoose.model("clients", ClientModel);

module.exports = { Clients };
