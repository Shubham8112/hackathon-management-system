const User = require("../models/User");
const Hackathon = require("../models/Hackathon");
const Participant = require("../models/Participant");

const getDashboard = async (req, res) =>{
  try{
    const totalUsers = await User.countDocuments();
    const totalHackathons = await Hackathon.countDocuments();
    const totalParticipants = await Participant.countDocuments();

    res.status(200).json({
      success:true,
      dashboard:{
        totalUsers,
        totalHackathons,
        totalParticipants,
      },
    });
  }catch(error){
    res.status(500).json({
      suucess:false,
      message:error.message,
    });
  }
};


module.exports = {
  getDashboard,
};