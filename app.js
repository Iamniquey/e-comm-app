const express = require("express");
const db = require("./db/index.js");
const app = express();
const session = require("express-session");
const passport = require("./auth/passport.js");
const authRouter = require("./routes/auth.js");
const productsRouter = require("./routes/products.js");

//session
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

//body parser
app.use(express.json());

app.use("/auth", authRouter);

app.use("/products", productsRouter);

app.listen(3000, () => {
  console.log("Server started at Port 3000");
});
