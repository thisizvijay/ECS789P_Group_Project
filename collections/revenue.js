const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AmountModel = new Schema({
  amount: Number,
  currency: {
    type: String,
    enum: ["GBP", "USD"],
    default: "GBP",
  },
});
const RevenueModel = new Schema({
  id: ObjectId,
  total_revenue: AmountModel,
  operating_cost: AmountModel,
  drivers_compensation_cost: AmountModel,
  net_profit: AmountModel,
  status: {
    type: String,
    enum: ["profit", "loss"],
  },

  date: Date,
});
const Revenue = mongoose.model("revenue", RevenueModel);

module.exports = { Revenue };
