const mongoose = require("mongoose");

//몽고 DB에 사용되는 다큐멘트 형태입니다.

const normalSchema = mongoose.Schema({
  targetName: {
    type: String,
  },
  postId: {
    type: Number,
  },
  category: {
    type: String,
  },
  likedName: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Normal = mongoose.model("Normal", normalSchema);
export default Normal;
