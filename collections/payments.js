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
const PaymentModel = new Schema({
  id: ObjectId,
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: "clients" },
  booking_id: { type: mongoose.Schema.Types.ObjectId, ref: "bookings" },
  cash_machine_id: String,
  collected_by: String,
  transaction_reference: String,
  card: String,
  paid_amount: AmountModel,
  type_of_transaction: {
    type: String,
    enum: ["payment", "refund"],
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed", "unfullfilled", "cancelled"],
  },
  refund: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "clients",
  },
  payment_date:Date,
});
const Payments = mongoose.model("payments", PaymentModel);

module.exports = { Payments };
