const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ShiftHistoryModel = new Schema({
  id: ObjectId,
  role:{
    type:String,
    enum:["operator","driver"]
  },
  drivers_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "drivers",
  },
  operator_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "operators",
  },
  shift:Object,
  shift_start_time:Date,
  shift_end_time:Date,
});
const ShiftHistory = mongoose.model('shift_history', ShiftHistoryModel);


module.exports={ShiftHistory};