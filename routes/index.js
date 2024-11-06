const express = require("express");
const router = express.Router();

const home = require("./modules/home");
const todos = require("./modules/todos");
const users = require("./modules/users");
const auth = require("./modules/auth");

const { authenticator } = require("../middleware/auth");

router.use("/todos", authenticator, todos);
router.use("/users", users);
router.use("/auth", auth);
router.use("/", authenticator, home); //將網址結構符合 / 字串的 request 導向 home 模組

module.exports = router;
