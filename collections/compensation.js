const mongoose = require("mongoose");
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
const CompensationModel = new Schema({
  id: ObjectId,
  driver_id: { type: mongoose.Schema.Types.ObjectId, ref: "drivers" },
  operator_id: { type: mongoose.Schema.Types.ObjectId, ref: "operators" },
  transaction_reference: String,
  transaction_amount: AmountModel,
  transaction_for:{
    type: String,
    enum: ["driver", "operator"],
  },
  type_of_transaction: {
    type: String,
    enum: ["salary","maintainance"],
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed", "unfullfilled", "cancelled"],
  },
  bank_account:Object,
  payment_date:Date,
});
const Compensation = mongoose.model("compensation", CompensationModel);

module.exports = { Compensation };
