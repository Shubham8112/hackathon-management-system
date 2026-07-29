const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
    createHackathon,
    getAllHackathons,
    getHackathonById,
    updateHackathon
} = require("../controllers/hackathonController");

router.get("/", getAllHackathons);

router.get("/:id",getHackathonById);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("admin","organizer"),
    updateHackathon
);

router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin", "organizer"),
    createHackathon
);

module.exports = router;