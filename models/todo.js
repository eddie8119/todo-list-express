const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const todoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: Schema.Types.ObjectId, // ObjectId，也就是它會連向另一個資料物件
    ref: "User", //定義參考對象是 User model
    index: true, //index: true 把 userId 設定成「索引」
    required: true,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
