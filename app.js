const express = require("express");
const methodOverride = require("method-override");
const app = express();

const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./model/user");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const session = require("express-session");
app.use(
  session({
    secret: "keyboard cat", // Replace with a secure secret
    resave: false,
    saveUninitialized: false, // Set to false to avoid saving empty sessions
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride("_method"));

mongoose
  .connect("mongodb://127.0.0.1:27017/E-com-SECQ")
  .then(() => {
    console.log("DB conected");
  })
  .catch(() => {
    console.log("DB bot conected");
  });

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.locals.currUser = req.user; // Set currUser to the logged-in user
  next();
});

const productRoutes = require("./router/product"); // Ensure this path is correct
app.use(productRoutes);

const authRoutes = require("./router/auth"); // Ensure this path is correct
app.use(authRoutes);

const cartRoutes = require('./router/cart');
app.use(cartRoutes);

const reviewRoutes = require('./router/review'); // Import the review router
app.use(reviewRoutes); // Use the review router

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
