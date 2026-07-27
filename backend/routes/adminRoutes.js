const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  adminDashboard,
} = require("../controllers/adminController");

// Only Admin can access
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("admin"),
  adminDashboard
);

module.exports = router;