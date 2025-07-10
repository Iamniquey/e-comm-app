const express = require("express");
const db = require("../db/index.js");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const passport = require("../auth/passport.js");

authRouter.post("/register", async (req, res) => {
  try {
    const { username, password, email, address } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const sql =
      "INSERT INTO users (username, password, email, address) VALUES ($1, $2, $3, $4)";
    const params = [username, hashedPassword, email, address];
    const response = await db.query(sql, params);

    if (response.rowCount < 1) {
      res.status(400).send("Registration Failed");
    }

    res.status(200).send("Registration Successful");
  } catch (e) {
    console.log("Error registering user: ", e);
    res.status(500).send("Server error while registering user.");
  }
});

authRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.status(200).send("Login successful");
  }
);

module.exports = authRouter;
