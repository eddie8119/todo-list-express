const express = require("express");
const router = express.Router();

const Todo = require("../../models/todo");

router.get("/", (req, res) => {
  Todo.find()
    .lean()
    //資料庫那邊，資料產生的順序不一定會按編號排
    // 根據 _id 升冪排序 Mongoose 提供的 .sort()
    .sort({ _id: "asc" })
    .then((todos) => res.render("index", { todos }))
    .catch((error) => console.error(error));
});

module.exports = router;
