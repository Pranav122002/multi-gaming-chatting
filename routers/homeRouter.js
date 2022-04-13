const express = require("express");
const Router = express.Router();
const homeSchema = require("../models/homeSchema");

Router.get("/loginsystem", (err, res) => {
  res.render("login", { title: "Sign-up Form", password: "", email: "" });
});

Router.post("/login", async (req, res) => {
  try {
    const { name, number, email, password, cpassword } = req.body;

    if (password === cpassword) {
      const userData = new homeSchema({
        name,
        number,
        email,
        password,
      });
      userData.save((err) => {
        if (err) {
          console.log("err");
        } else {
          res.render("login", { title: "Sign-up Successfull", password: "", email: "" });
        }
      });

      const useremail = await homeSchema.findOne({ email: email });
      if (email === useremail.email) {
        res.render("login", {
          title: "",
          password: "",
          email: "Email is already registered",
        });
      } else {
        console.log("err");
      }
    } else {
      res.render("login", {
        title: "",
        password: "Password not Matching",
        email: "",
      });
    }
  } catch (error) {
    res.render("login", { title: "Error in Backend", password: "", email: "" });
  }
});

// singin

Router.post("/profile", (req, res) => {
  const { email, password } = req.body;

  homeSchema.findOne({ email: email }, (err, result) => {
    if (email === result.email && password === result.password) {
      res.render("profile", { name: result.name, email: result.email } );
    } else {
      console.log(err);
    }
  });
});

module.exports = Router;
