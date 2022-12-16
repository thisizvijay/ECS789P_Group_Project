const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const VehicleModel = new Schema({
  id: ObjectId,
  registration_number: String,
  registration_date: Date,
  identification_number: String,
  type_of_vehicle: String,
  manufacturer: String,
  model: String,
  fuel: String,
  latest_mot: Date,
  insurance: Object,
  owners: Array,
  allowed_passengers: Number,
  status: {
    type: String,
    enum: ["roadworthy", "in_for_service", "awaiting_repair", "written_off"],
    default: "roadworthy",
  },
  driver_id: { type: mongoose.Schema.Types.ObjectId, ref: "drivers" },
});

const Vehicles = mongoose.model("vehicles", VehicleModel);

exports.Vehicles = Vehicles;
