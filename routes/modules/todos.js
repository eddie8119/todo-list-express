const express = require("express");
const router = express.Router();

const Todo = require("../../models/todo");
//Todo 是 model 來的，而 model 又是 Mongoose 提供的，也就是說，Todo 能用的操作方法都來自 Mongoose

router.get("/new", (req, res) => {
  return res.render("new");
});

router.post("/", (req, res) => {
  const userId = req.user._id;
  const name = req.body.name;

  return Todo.create({ name, userId })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

router.get("/:id", (req, res) => {
  const userId = req.user._id;
  const id = req.params.id;
  return Todo.findById({ id, userId })
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then((todo) => res.render("detail", { todo }))
    .catch((error) => console.log(error));
});

router.get("/:id/edit", (req, res) => {
  const userId = req.user._id;
  const id = req.params.id;
  return Todo.findById({ id, userId })
    .lean()
    .then((todo) => res.render("edit", { todo }))
    .catch((error) => console.log(error));
});

router.put("/:id", (req, res) => {
  const userId = req.user._id;
  const id = req.params.id;
  const { name, isDone } = req.body;

  return Todo.findById({ id, userId })
    .then((todo) => {
      todo.name = name;
      todo.isDone = isDone === "on";
      return todo.save();
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch((error) => console.log(error));
});

router.delete("/:id", (req, res) => {
  const userId = req.user._id;
  const id = req.params.id;
  return Todo.findById({ id, userId })
    .then((todo) => todo.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

module.exports = router;
