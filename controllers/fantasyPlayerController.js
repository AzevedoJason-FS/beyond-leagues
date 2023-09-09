const PlayerFantasy = require("../models/PlayerFantasy");
const Bets = require("../models/UserPoints.js");
const User = require('../models/User')
const asyncHandler = require("express-async-handler");

// @desc GET all PlayerFantasy
// @desc GET /PlayerFantasy
// @access Private
const getAllPlayers = asyncHandler(async (req, res) => {
  const player = await PlayerFantasy.find({ active: true })
    .lean()
    .populate({
      path: "team",
      select: ["name", "logo", "slug", "league"],
      populate: { path: "league", select: ["name", "logo", "slug"] },
    })
    .populate({ path: "role", select: ["role_name", "slug"] });

  if (!player?.length) {
    return res.status(400).json({ messsage: "No Player Found" });
  }
  res.json(player);
});

// @desc GET odds PlayerFantasy
// @desc GET /PlayerFantasy
// @access Private
const getAllPlayersByOdds = asyncHandler(async (req, res) => {
  const objective = req.params.objective;
  await PlayerFantasy.find({ odds_obj: objective, active: true })
    .lean()
    .populate({
      path: "team",
      select: ["name", "logo", "slug", "league"],
      populate: { path: "league", select: ["name", "logo", "slug"] },
    })

    .then((match) => {
      if (!match) return res.status(400).json({ messsage: "No Match Found" });

      res.json(match);
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          message: err.message,
        },
      });
    });
});

// @desc POST new player
// @desc POST /PlayerFantasy
// @access Private
const createNewPlayer = asyncHandler(async (req, res) => {
  const { name, image, team, slug, role, odds, odds_obj, multiplier_over, multiplier_under, active } = req.body;

  // Confirm data
  if ((!name || !image || !team || !slug || !role, !odds, !odds_obj, !multiplier_over, !multiplier_under, !active)) {
    return res.status(400).json({ message: "All Fields Are Required " });
  }

  // Check for duplicate
  const duplicate = await PlayerFantasy.findOne({ name }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate player " });
  }

  const teamObject = { name, image, team, slug, role, odds, odds_obj, multiplier_over, multiplier_under, active };

  // Create and Store new team
  const player = await PlayerFantasy.create(teamObject);

  if (player) {
    //created
    res.status(201).json({ message: `New player: ${player.name} created` });
  } else {
    res.status(400).json({ message: "Invalid player data received " });
  }
});

// @desc PATCH a team
// @desc PATCH /PlayerFantasy
// @access Private
// const updatePlayer = asyncHandler(async (req, res) => {
//   const { id, name } = req.body;

//   // Confirm data
//   if (!id || !name) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   const team = await PlayerFantasy.findById(id).exec();

//   if (!team) {
//     return res.status(400).json({ message: "Team Not Found" });
//   }

//   // Check for duplicate
//   const duplicate = await PlayerFantasy.findOne({ name }).lean().exec();
//   // Allow updates to the original team
//   if (duplicate && duplicate?._id.toString() !== id) {
//     return res.status(409).json({ message: "Duplicate team name" });
//   }

//   team.name = name;

//   const updatedPlayer = await PlayerFantasy.save();

//   res.json({ message: `${updatedPlayer.name} updated` });
// });

// update winner
const updateWinner = asyncHandler(async (req, res) => {
  const { id, winner } = req.body;

  // Confirm data
  if (!id || !winner) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const winnerUpdate = await PlayerFantasy.findOneAndUpdate({ _id: id }, { winner:  winner, active: false});
  const ww = await Bets.updateMany({ bet: id }, { winning_odd:  winner});


  if (winnerUpdate && ww) {
    return res.status(400).json({ message: "Updated" });
  } else {
    res.status(400).json({ message: "Invalid bet data received " });
  }
});

// @desc DELETE a team
// @desc DELETE /PlayerFantasy
// @access Private
const deletePlayer = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "role ID Required" });
  }

  const team = await PlayerFantasy.findById(id).exec();

  if (!team) {
    return res.status(400).json({ message: "Team Not Found" });
  }

  const result = await PlayerFantasy.deleteOne();

  const reply = `name ${result.name} with ID ${result.id} Deleted`;

  res.json(reply);
});

module.exports = {
  getAllPlayers,
  getAllPlayersByOdds,
  createNewPlayer,
  updateWinner,
  deletePlayer,
};
