const bcrypt = require("bcryptjs");
const mongooseUser = require("../models/user");

async function createUser(userParams) {
  try {
    const { name, email, password } = userParams;

    // Email kontrolü
    const existingUser = await mongooseUser.findOne({ email });
    if (existingUser) {
      return { error: "Email already exists" };
    }

    // Şifreyi hash'le
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Yeni kullanıcı oluştur
    const user = new mongooseUser({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Hassas bilgileri çıkar
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    return userResponse;
  } catch (error) {
    console.error("Create user error:", error);
    return { error: "An error occurred while creating user" };
  }
}

async function getUser(userParams) {
  const { id } = userParams;
  try {
    const user = await mongooseUser.findById(id);
    return user;
  } catch (error) {
    console.error("An error occurred while creating the user:", error);
    return false;
  }
}

async function getUsers() {
  try {
    const users = await mongooseUser.find();
    return users;
  } catch (error) {
    console.error("An error occurred while creating the user:", error);
    return false;
  }
}

async function updateUser(userParams) {
  const { id } = userParams;
  const email = userParams.email;

  try {
    const updatedUser = await mongooseUser.findById(id);
    updatedUser.email = email;
    await updatedUser.save();

    return updatedUser;
  } catch (error) {
    console.error("An error occurred while updating the user:", error);
    return false;
  }
}

async function deleteUser(userParams) {
  const { id } = userParams;
  try {
    const deletedUser = await mongooseUser.findByIdAndDelete(id);
    console.log(deletedUser);
    return true;
  } catch (error) {
    console.error("An error occurred while deleting the user:", error);
    return false;
  }
}
module.exports = { createUser, updateUser, deleteUser, getUser, getUsers };
