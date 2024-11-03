const express = require("express");
const passport = require("passport");
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

  User.findOne({ email })
    .then((user) => {
      if (user) {
        res.render("register", {
          name,
          email,
          password,
          confirmPassword,
        });
      } else {
        return User.create({
          name,
          email,
          password,
        })
          .then(() => res.redirect("/"))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});
router.get("/logout", (req, res) => {
  req.logout(); //req.logout() 是 Passport.js 提供的函式
  res.redirect("/users/login");
});

module.exports = router;
