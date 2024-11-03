const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const usePassport = require("./config/passport");

//僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const routes = require("./routes");
require("./config/mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(
  session({
    secret: "ThisIsMySecret",
    resave: false, //true 時，把 session 更新到 session store 裡。
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app);
app.use(routes);

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
