const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {registerParticipant, getMyHackathons} = require("../controllers/participantController");

router.post(
  "/register/:hackathonId",
  authMiddleware,
  registerParticipant
);

router.get(
  "/my-hackathons",
  authMiddleware,
  getMyHackathons
)
module.exports = router;