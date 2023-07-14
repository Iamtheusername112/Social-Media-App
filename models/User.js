const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    ProfileImg: {
      type: String,
      default: "",
    },
    followings: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: "User",
    },
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: "User",
    },
    bio: {
      type: String,
      default: "",
    },
    bookmarkedPosts: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: "Post",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
