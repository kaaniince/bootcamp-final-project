const express = require("express");
const authController = require("../controllers/auth");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.put("/update-profile", authMiddleware, authController.updateProfile);
router.post("/logout", authMiddleware, authController.logout);
router.get("/me", authMiddleware, authController.getCurrentUser);

module.exports = router;
