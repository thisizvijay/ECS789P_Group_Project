const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OperatorModel = new Schema({
  id: ObjectId,
  full_name: String,
  gender:{
    type:String,
    enum:["Male","Female","Others","Not Specified"],
    default:"Not Specified"
  },
  date_of_birth:Date,
  email: String,
  phone_number:String,
  operator_code:String,
  ni_number:String,
  address:Object,
  shift:Object,
  bank_account:Object,
  componensation:Object,
  experience: Array,
});
const Operators = mongoose.model('operators', OperatorModel);


module.exports={Operators};