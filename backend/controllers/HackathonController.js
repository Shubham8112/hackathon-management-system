const Hackathon = require("../models/Hackathon");

const createHackathon = async (req, res) => {
  try {
    const {
      title,
      description,
      startDate,
      endDate,
      registrationDeadline,
      location,
      mode,
    } = req.body;

    const hackathon = await Hackathon.create({
      title,
      description,
      startDate,
      endDate,
      registrationDeadline,
      location,
      mode,
      organizer: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Hackathon created successfully",
      hackathon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
const getAllHackathons = async (req, res) => {
    try {
        const hackathons = await Hackathon.find().populate(
            "organizer",
            "name email"
        );

        res.status(200).json({
            success: true,
            count: hackathons.length,
            hackathons
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
module.exports = {
  createHackathon,
  getAllHackathons
};