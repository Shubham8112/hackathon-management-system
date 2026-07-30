const Participant = require("../models/Participant");
const Hackathon = require("../models/Hackathon");

const registerParticipant = async (req, res)=>{
    try{
        const userId = req.user.id;
        const hackathonId = req.params.hackathonId;

        const hackathon = await Hackathon.findById(hackathonId);

        if(!hackathon){
            return res.status(404).json({
                success:false,
                message: "Hackathon not found",
            });
        }

        const existingParticipant = await Participant.findOne({
            user: userId,
            hackathon: hackathonId,
        });

        if(existingParticipant){
            return res.status(400).json({
                success: false,
                message: "You have already registered for this hackathon",
            })
        }

        const participant = await Participant.create({
            user:userId,
            hackathon: hackathonId,
        });

        res.status(201).json({
            success:true,
            message: "Registration successfully",
        });

    }catch(error){
        res.status(500).json({
            success: false,
            mesage: error.message,
        });
    }
};

const getMyHackathons = async (req,res)=>{
    try{
        const userId = req.user.id;

        const participant = await Participant.find({
            user: userId,
        }).populate("hackathon");

        const hackathon = participant.map(
            (participant) => participant.hackathon
        );

        res.status(200).json({
            success:true,
            participant,
        });
    }catch(error) {
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};

 
module.exports = {
    registerParticipant,
    getMyHackathons,
};