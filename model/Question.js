const mongoose = require("mongoose");
require("dotenv/config");
let mySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      require: true,
    },
    title: {
      type: String,
      unique: true,
    },
    desc: String,
    tags: {
      type: Array,
    },
    answer: String,
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("questions", mySchema);
