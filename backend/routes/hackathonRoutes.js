const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
    createHackathon,
    getAllHackathons
} = require("../controllers/hackathonController");

router.get("/", getAllHackathons);

router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin", "organizer"),
    createHackathon
);

module.exports = router;