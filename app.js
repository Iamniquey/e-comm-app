const express = require("express");
const db = require("./db/index.js");
const app = express();
const session = require("express-session");
const passport = require('./auth/passport.js');

//session
app.use(session({ secret: "secret", resave: false,  saveUninitialized: false}))
app.use(passport.initialize());
app.use(passport.session());

//body parser
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { username, password, email, address } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const sql =
      "INSERT INTO users (username, password, email, address) VALUES ($1, $2, $3, $4)";
    const params = [username, hashedPassword, email, address];
    const response = await db.query(sql, params);

    if (response.rowCount > 1) {
      res.status(200).send("Success");
    } else {
      res.status(400).send("Registration Failed");
    }
  } catch (e) {
    console.log("Error registering user: ", e);
  }
});

app.post("/login", passport.authenticate("local"), async (req, res) => {
  try {
    res.status(200).send("Login successful");

    // const { username, password } = req.body;

    // const response = await db.query("SELECT * FROM users WHERE username = $1", [
    //   username,
    // ]);

    // if (response.rows.length < 1) {
    //   res.status(400).send("No such user");
    //   return;
    // }

    // const hashedPassword = response.rows[0].password;
    // const match = await bcrypt.compare(password, hashedPassword);

    // if (match) {
    //   res.status(200).send("Success");
    // } else {
    //   res.status(404).send("Password incorrect");
    // }
  } catch (e) {
    console.log("Error loggin in user: ", e);
    res.status(500).send("Server error while logging in");
  }
});

app.listen(3000, () => {
  console.log("Server started at Port 3000");
});
