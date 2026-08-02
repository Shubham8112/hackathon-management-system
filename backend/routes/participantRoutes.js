const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {registerParticipant, getMyHackathons, updateParticipantStatus, cancelRegistration} = require("../controllers/participantController");
const roleMiddleware = require("../middleware/roleMiddleware");
const { deleteHackathon } = require("../controllers/HackathonController");

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

router.patch(
  "/:participantId",
  authMiddleware,
  roleMiddleware("admin","organizer"),
  updateParticipantStatus
)

router.delete(
  "/:participantId",
  authMiddleware,
  cancelRegistration
)
module.exports = router;