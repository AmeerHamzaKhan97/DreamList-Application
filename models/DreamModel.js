const mongoose = require("./connectionObject");
// const mongoose = require("mongoose");

const DreamSchema = new mongoose.Schema(
  {
    dream_type: { $type: String, required: true },
    dream: { $type: String, required: true },

    date_to_complete: { $type: String, required: true },
  },
  { typeKey: "$type" }
);

const DreamModel = new mongoose.model("Dream", DreamSchema);

module.exports = DreamModel;
