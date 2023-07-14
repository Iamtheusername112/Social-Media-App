const express = require("express");
const userController = express.Router(); // Use Router() function to create a router instance
const Post = require("../models/Post");

const verifyToken = require("../"); //middleware used to check if the jwt we used in the user registration and login in valid

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
