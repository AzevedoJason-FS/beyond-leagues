const Matches = require("../models/Matches");
const asyncHandler = require("express-async-handler");

// @desc GET all Matches
// @desc GET /Matches
// @access Private
const getAllMatches = asyncHandler(async (req, res) => {
  const match = await Matches.find()
    .lean()
    .populate({ path: "league", select: ["name", "logo", "slug", "league"] })
    .populate({
      path: "opponents",
      select: ["name", "logo", "slug", "league"],
      populate: { path: "league", select: ["name", "logo", "slug"] },
    });

  if (!match?.length) {
    return res.status(400).json({ messsage: "No Match Found" });
  } else {
    res.json(match);
  }
});

const getMatchByLeague = asyncHandler(async (req, res) => {
  const leagueId = req.params.league;
  await Matches.find({ name: leagueId})
    .lean()
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

// @desc POST new match
// @desc POST /matches
// @access Private
const createNewMatch = asyncHandler(async (req, res) => {
  const {
    match_date,
    league,
    opponents,
    winner,
    best_of,
  } = req.body;

  // Confirm data
  if (!match_date || !league || !opponents || !best_of ) {
    return res.status(400).json({ message: "All Fields Are Required " });
  }

  const matchObject = {
    match_date,
    league,
    opponents,
    winner,
    best_of,
  };

  // Create and Store new team
  const match = await Matches.create(matchObject);

  if (match) {
    //created
    res
      .status(201)
      .json({ message: `New match on Week: ${match.match_week} created` });
  } else {
    res.status(400).json({ message: "Invalid match data received " });
  }
});

// @desc PATCH a match
// @desc PATCH /match
// @access Private
const updateMatch = asyncHandler(async (req, res) => {
  const { id, winner } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "An ID is required" });
  }

  await Matches.findOneAndUpdate({ _id: id }, { winner });

  res.json({ message: `updated` });
});

// @desc DELETE a team
// @desc DELETE /PlayerFantasy
// @access Private
const deleteMatch = asyncHandler(async (req, res) => {
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
  getAllMatches,
  getMatchByLeague,
  createNewMatch,
  updateMatch,
  deleteMatch,
};
