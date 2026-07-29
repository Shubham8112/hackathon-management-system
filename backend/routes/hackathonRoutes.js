const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
    createHackathon,
    getAllHackathons,
    getHackathonById,
    updateHackathon,
    deleteHackathon
} = require("../controllers/HackathonController");

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

router.delete("/:id",authMiddleware,roleMiddleware("admin","organizer"),deleteHackathon);
module.exports = router;