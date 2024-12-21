const bcrypt = require("bcryptjs");
const mongooseUser = require("../models/user");
const jwt = require("jsonwebtoken");

const login = async ({ email, password }) => {
  try {
    const user = await mongooseUser.findOne({ email });

    if (!user) {
      return { error: "Invalid credentials" };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return { error: "Invalid credentials" };
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  } catch (error) {
    console.error("Login service error:", error);
    throw error;
  }
};

async function updateProfile({
  userId,
  name,
  email,
  currentPassword,
  newPassword,
}) {
  try {
    const user = await mongooseUser.findById(userId);

    if (!user) {
      return { error: "User not found" };
    }

    // If email is changed, ensure the new email is not already in use by another user
    if (email !== user.email) {
      const existingUser = await mongooseUser.findOne({ email });
      if (existingUser) {
        return { error: "Email is already in use" };
      }
    }

    // Check if password change is requested
    if (currentPassword) {
      const isValidPassword = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isValidPassword) {
        return { error: "Current password is incorrect" };
      }

      if (newPassword) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
      }
    }

    // Update user information
    user.name = name;
    user.email = email;

    await user.save();

    // Remove sensitive information
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    return userResponse;
  } catch (error) {
    console.log(error);
    return { error: "An error occurred while updating profile" };
  }
}

module.exports = { login, updateProfile };
