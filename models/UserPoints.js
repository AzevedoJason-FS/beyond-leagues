const mongoose = require("mongoose");

const userPointsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  bet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Players_Fantasy",
  },
  chosen_odd: {
    type: Number
  },
  winning_odd: {
    type: Number
  },
  win_amount: {
    type: String,
  },
  new_balance: {
    type: String,
  },
});

module.exports = mongoose.model("User_Bets", userPointsSchema);
