const mongoose = require("mongoose");
require("dotenv/config");
let mySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      require: true,
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Questions",
      require: true,
    },
    answer: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("answers", mySchema);
