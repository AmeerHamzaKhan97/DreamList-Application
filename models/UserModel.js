const mongoose = require("./connectionObject");
// const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { $type: String, required: true },
    email: { $type: String, required: true },

    password: { $type: String, required: true },
  },
  { typeKey: "$type" }
);

const userModel = new mongoose.model("User", userSchema);

module.exports = userModel;
