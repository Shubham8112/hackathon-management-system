const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {registerParticipant} = require("../controllers/participantController");

router.post(
  "/register/:hackathonId",
  authMiddleware,
  registerParticipant
);

module.exports = router;