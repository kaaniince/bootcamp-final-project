//PUBLIC

const userService = require("../services/user");
const authService = require("../services/auth");
const mongooseUser = require("../models/user");

const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: "Email and password are required" });
    }

    try {
      const response = await authService.login({ email, password });

      if (response.error) {
        return res.status(401).send({ error: response.error });
      }

      // Token'ı cookie olarak ayarla
      res.cookie("token", response.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000, // 1 saat
      });

      // Kullanıcı bilgilerini gönder
      res.status(200).send({
        success: true,
        user: response.user,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).send({ error: "An error occurred during login" });
    }
  },
  register: async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({
        error: "Name, email and password are required",
      });
    }

    try {
      const response = await userService.createUser(req.body);

      if (response.error) {
        return res.status(400).send({ error: response.error });
      }

      res.status(201).send({
        success: true,
        message: "User registered successfully",
        user: response,
      });
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).send({
        error: "An error occurred during registration",
      });
    }
  },
  updateProfile: async (req, res) => {
    const { name, email, currentPassword, newPassword } = req.body;
    const userId = req.user.id; // JWT'den gelen kullanıcı ID'si

    if (!name || !email) {
      return res.status(400).send({ error: "Name and email are required" });
    }

    try {
      const response = await authService.updateProfile({
        userId,
        name,
        email,
        currentPassword,
        newPassword,
      });

      if (response.error) {
        return res.status(400).send({ error: response.error });
      }

      res.status(200).send({ user: response });
    } catch (error) {
      res
        .status(500)
        .send({ error: "An error occurred while updating profile" });
    }
  },
  logout: async (req, res) => {
    try {
      // Cookie'yi temizle
      res.clearCookie("token");
      res.status(200).send({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).send({ error: "An error occurred during logout" });
    }
  },
  getCurrentUser: async (req, res) => {
    try {
      console.log("Getting current user for:", req.user.id);

      const user = await mongooseUser
        .findById(req.user.id)
        .select("-password")
        .lean();

      if (!user) {
        console.log("User not found for ID:", req.user.id);
        return res.status(404).send({ error: "User not found" });
      }

      console.log("Found user:", user);
      res.status(200).send({ user });
    } catch (error) {
      console.error("Get current user error:", error);
      res.status(500).send({ error: "Error fetching user data" });
    }
  },
};

module.exports = authController;
