const bcrypt = require("bcrypt");
const { User } = require("../models");

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (req, res) => {
  // Get all users from postgres
  const users = await User.findAll({
    attributes: {
      exclude: ["password", "passwordReset"],
    },
  });

  // If no users
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }

  res.json(users);
};

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = async (req, res) => {
  try {
    let { firstName, lastName, email, password, role, active } = req.body;

    // Confirm data
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required fields" });
    }

    email = email.toLowerCase();

    // Check for duplicate username
    const duplicate = await User.findOne({
      attributes: {
        exclude: ["password", "passwordReset"],
      },
      where: { email },
    });

    if (duplicate) {
      return res.status(409).json({ message: "Duplicate email" });
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

    const userObject = {
      firstName,
      lastName,
      email,
      password: hashedPwd,
      role,
      active,
    };

    // Create and store new user
    const user = await User.create(userObject);

    if (user) {
      //created
      res.status(201).json({ message: `New user ${email} created` });
    } else {
      res.status(400).json({ message: "Invalid user data received" });
    }
  } catch (error) {
    console.error(error);
  }
};

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = async (req, res) => {
  try {
    const {
      id,
      firstName,
      lastName,
      email,
      role,
      active,
      newPassword,
      currentPassword,
    } = req.body;

    // Confirm data
    if (!id || !email || !role || typeof active !== "boolean") {
      return res
        .status(400)
        .json({ message: "All fields except password are required" });
    }

    // Does the user exist to update?
    const user = await User.findOne({
      attributes: {
        exclude: ["passwordReset"],
      },
      where: { id },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check for duplicate
    const duplicate = await User.findOne({
      attributes: {
        exclude: ["password", "passwordReset"],
      },
      where: { email },
    });

    // Allow updates to the original user
    if (duplicate && duplicate?.id !== id) {
      return res.status(409).json({ message: "Duplicate email" });
    }

    let userToUpdate = { firstName, lastName, email, role, active };

    if (newPassword) {
      // Hash password

      const match = await bcrypt.compare(currentPassword, user.password);

      if (match) {
        const passwordHashed = await bcrypt.hash(newPassword, 10); // salt rounds
        userToUpdate = {
          firstName,
          lastName,
          email,
          role,
          active,
          password: passwordHashed,
        };
      } else {
        res.status(409).json({ message: "Current Password doesn't match" });
      }
    }

    const updatedUser = await User.update(userToUpdate, {
      where: { id: user.id },
    });

    res.json({ success: true, message: `${email} was updated` });
  } catch (error) {
    console.error(error);
  }
};

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    // Confirm data
    if (!id) {
      return res.status(400).json({ message: "User ID Required" });
    }

    // Does the user exist to delete?
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const result = await User.destroy({
      where: {
        id,
      },
    });

    const reply = `Email ${user.email} with ID ${user.id} deleted`;

    res.json(reply);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
