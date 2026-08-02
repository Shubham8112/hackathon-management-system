const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {registerParticipant, getMyHackathons, updateParticipantStatus} = require("../controllers/participantController");
const roleMiddleware = require("../middleware/roleMiddleware");

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
module.exports = router;