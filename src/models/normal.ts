// 일반 푸시 및 알림 모델입니다.
// 데이터 관리 타입은 확정이 된 후 변경할 예정입니다.

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
