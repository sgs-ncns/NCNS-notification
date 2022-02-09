const mongoose = require("mongoose");

const normalSchema = mongoose.Schema({
  target_name: {
    type: String,
    contents: {
      type: Array,
    },
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Normal = mongoose.model("Normal", normalSchema);
export default Normal;
