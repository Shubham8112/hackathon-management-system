const { message } = require("statuses");
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

const getHackathonById = async (req, res) => {
    try {
        const hackathon = await Hackathon.findById(req.params.id).populate(
            "organizer",
            "name email"
        );

        if (!hackathon) {
            return res.status(404).json({
                success: false,
                message: "Hackathon not found"
            });
        }

        res.status(200).json({
            success: true,
            hackathon
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
const updateHackathon = async(req,res) =>{
    try{
        const hackathon = await Hackathon.findByIdAndUpdate(
            req.param.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if(!hackathon){
            return res.status(404).json({
                success:false,
                message: "Hackathon not found"
            });
        }

        res.status(200).json({
            success:true,
            message:"Hackathon updated successfully",
            hackathon
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Server Error",
            error: error.message
        });
    }
};
module.exports = {
  createHackathon,
  getAllHackathons,
  getHackathonById,
  updateHackathon
};