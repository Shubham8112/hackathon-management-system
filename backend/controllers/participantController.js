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

const getHackathonParticipants = async (req,res)=>{
    try{
        const hackathonId = req.params.id;

        const participants = await Participant.find({
            hackathon: hackathonId,
        }).populate("user","name email");

        res.status(200).json({
            success: true,
            participants,
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateParticipantStatus = async (req, res) => {
    try {
        const participantId = req.params.participantId;
        const { status } = req.body;

        const participant = await Participant.findByIdAndUpdate(
            participantId,
            { status },
            { returnDocument: "after" }
        );

        if (!participant) {
            return res.status(404).json({
                success: false,
                message: "Participant not found",
            });
        }

        // This should be OUTSIDE the if block
        res.status(200).json({
            success: true,
            message: "Participant status updated successfully",
            participant,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const cancelRegistration = async (req, res) => {
    try {
        const participantId = req.params.participantId;

        const participant = await Participant.findOneAndDelete({
            _id: participantId,
            user: req.user.id,
        })

        if(!participant){
            return res.status(404).json({
                success: false,
                message: "Participant not found",
            });
        }

        res.status(200).json({
            success:true,
            message: "Registration cancelled successfully",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
module.exports = {
    registerParticipant,
    getMyHackathons,
    getHackathonParticipants,
    updateParticipantStatus,
    cancelRegistration,
};