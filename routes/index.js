const express = require("express");
const router = express.Router();
const authorsRoutes = require("./authorsRoutes");
const booksRoutes = require("./bookRoutes");
const swaggerRoute = require("./swagger");
const passport = require("passport");

router.use("/", swaggerRoute);

router.use("/books", booksRoutes);

router.use("/authors", authorsRoutes);

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
  req.logOut(function(err) {
    if(err) {return next(err); }
    res.redirect('/');
  });
});

/* router.use("/", swaggerRoute);

router.get("/", (req, res) => {
    //#swagger.tags=["Hello World"]
  res.send("Hello World This is the Book API");
});

router.use("/books", booksRoutes);

router.use("/authors", authorsRoutes); */

module.exports = router;