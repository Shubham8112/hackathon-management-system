const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        hackathon: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hackathon",
            required:true,
        },
        status: {
            type: String,
            enum: ["registered", "approved", "rejected"],
            default: "registered",
        },
    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model("Participant",participantSchema);