const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AmountModel=new Schema({
  amount: Number,
  currency: {
    type: String,
    enum: ["GBP", "USD"],
    default: "GBP",
  },
})

const BookingModel = new Schema({
  id: ObjectId,
  client_id: {type: mongoose.Schema.Types.ObjectId, ref: 'clients'},
  vehicle_id:{type: mongoose.Schema.Types.ObjectId, ref: 'vehicles'},
  driver_id:{type: mongoose.Schema.Types.ObjectId, ref: 'drivers'},
  pickup_location:Object,
  drop_location:Object,
  no_of_passengers:{
    type:Number,
    default:2
  },
  status:{
    type:String,
    enum:["pending","in-progress","completed","unfullfilled","cancelled",]
  },
  remarks:String,
  waiting_time_charge:AmountModel,
  service_fees:AmountModel,
  tax_fees:AmountModel,
  total_amount:AmountModel,
  trip_distance:Number,
  waiting_time_in_minutes:Number,
  total_trip_time_in_minutes:Number,
  on_peak:{
    type:Boolean,
    default:false,
  },
  is_regular_booking:{
    type:Boolean,
    default:false,
  },
  booking_date:Date,
  driver_rating:{
    type:Number,
    required:false
  },
  operator_rating:{
    type:Number,
    required:false
  }
});
const Bookings = mongoose.model('bookings', BookingModel);


module.exports={Bookings};