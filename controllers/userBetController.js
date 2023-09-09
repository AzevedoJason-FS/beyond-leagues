const Bets = require("../models/UserPoints.js");
const User = require('../models/User')
const asyncHandler = require("express-async-handler");

// @desc GET all Matches
// @desc GET /Matches
// @access Private
const getAllBetsById = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const bets = await Bets.find({ user_id: userId})
    .lean()
    .populate({       path: "bet",
    select: ["name"]})
    // .populate({
    //   path: "opponents",
    //   select: ["name", "logo", "slug", "league"],
    //   populate: { path: "league", select: ["name", "logo", "slug"] },
    // });

  if (!bets?.length) {
    return res.status(400).json({ messsage: "No Bets Found" });
  }
  res.json(bets);
});

// @desc POST new match
// @desc POST /matches
// @access Private
const createNewBet = asyncHandler(async (req, res) => {
  const {
    user_id,
    bet,
    chosen_odd,
    winning_odd,
    win_amount,
    new_balance
  } = req.body;

  // Confirm data
  if (!user_id || !bet || !win_amount || !new_balance, !chosen_odd) {
    return res.status(400).json({ message: "All Fields Are Required " });
  }

  const betObject = {
    user_id,
    bet,
    chosen_odd,
    winning_odd,
    win_amount,
    new_balance
  };

  // Create and Store new team
  const createBet = await Bets.create(betObject);
  const userBalance = await User.findOneAndUpdate({ _id: user_id }, { money:  new_balance});


  if (createBet && userBalance) {
    //created
    res
      .status(201)
      .json({ message: `New bet for user ${createBet.user_id} created` });
  } else {
    res.status(400).json({ message: "Invalid bet data received " });
  }
});

const award = asyncHandler(async (req, res) => {
  const { user_id, win_amount } = req.body;

  // Confirm data
  if (!user_id || !win_amount) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const ww = await User.findOneAndUpdate({ _id: user_id }, { money: win_amount});


  if (ww) {
    return res.status(400).json({ message: "Updated" });
  } else {
    res.status(400).json({ message: "Invalid bet data received " });
  }
})

// @desc PATCH a match
// @desc PATCH /match
// @access Private
// const updateMatch = asyncHandler(async (req, res) => {
//   const { id, winner } = req.body;

//   // Confirm data
//   if (!id) {
//     return res.status(400).json({ message: "An ID is required" });
//   }

//   await Matches.findOneAndUpdate({ _id: id }, { winner });

//   res.json({ message: `updated` });
// });

// @desc DELETE a team
// @desc DELETE /PlayerFantasy
// @access Private
// const deleteMatch = asyncHandler(async (req, res) => {
//   const { id } = req.body;

//   if (!id) {
//     return res.status(400).json({ message: "role ID Required" });
//   }

//   const team = await PlayerFantasy.findById(id).exec();

//   if (!team) {
//     return res.status(400).json({ message: "Team Not Found" });
//   }

//   const result = await PlayerFantasy.deleteOne();

//   const reply = `name ${result.name} with ID ${result.id} Deleted`;

//   res.json(reply);
// });

module.exports = {
  getAllBetsById,
  createNewBet,
  award
};
