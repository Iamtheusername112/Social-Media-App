const express = require("express");
const authController = express.Router(); // Use Router() function to create a router instance
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
authController.post("/register", async (req, res) => {
  // checking if the user is already existing at the time of registration
  try {
    const isExisting = await User.findOne({ email: req.body.email });
    if (isExisting) {
      throw new Error("Email already registered");
    }

    //   hashing the password provided by the user on registration
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    //   creating a new user
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // Here we are removing the password from the user object
    const { password, ...others } = newUser;

    //   using jwt to verify the user
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    return res.status(201).json({ ...others, token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// Login
authController.post("/login", async (req, res) => {
  try {
    //   checking if the user does not exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    // comparing the password the user provides
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    //   And if its a false value, we throw an error, thereby checking if its the same password that we have in our database
    if (!comparePassword) {
      throw new Error("Invalid Credentials");
    }

    // Here again we are removing the password from the user object
    const { password, ...others } = newUser;
    //   using jwt to verify the user
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    return res.status(200).json({ ...others, token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

module.exports = authController;
