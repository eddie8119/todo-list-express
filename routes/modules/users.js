const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const router = express.Router();

const User = require("../../models/user");

router.get("/login", (req, res) => {
  res.render("login");
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const errors = [];
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: "所有欄位都是必填。" });
  }
  if (password !== confirmPassword) {
    errors.push({ message: "密碼與確認密碼不相符！" });
  }
  if (errors.length) {
    return res.render("register", {
      errors,
      name,
      email,
      password,
      confirmPassword,
    });
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        errors.push({ message: "這個 Email 已經註冊過了。" });
        res.render("register", {
          name,
          email,
          password,
          confirmPassword,
        });
      } else {
        return bcrypt
          .genSalt(10)
          .then((salt) => bcrypt.hash(password, salt))
          .then((hash) =>
            User.create({
              name,
              email,
              password: hash,
            })
          )

          .then(() => res.redirect("/"))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});
router.get("/logout", (req, res) => {
  req.logout(); //req.logout() 是 Passport.js 提供的函式
  req.flash("success_msg", "你已經成功登出。");
  res.redirect("/users/login");
});

module.exports = router;
