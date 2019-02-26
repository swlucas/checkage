const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

app.set("view engine", "njk");
app.use(express.urlencoded({ extended: false }));

middleware = (req, res, next) => {
  var { age } = req.query;
  console.log(age);
  if (!age) {
    return res.redirect("/");
  }
  return next();
};
app.get("/", (req, res) => {
  return res.render("form");
});

app.get("/check", (req, res) => {
  var age = req.query.age;
  console.log(age);
  age >= 18
    ? res.redirect(`/major?age=${age}`)
    : res.redirect(`/minor?age=${age}`);
});

app.get("/major", middleware, (req, res) => {
  var { age } = req.query;
  return res.render("major", { age });
});

app.get("/minor", middleware, (req, res) => {
  var { age } = req.query;
  return res.render("minor", { age });
});

app.listen(3000);
