const express = require("express");
const router = express.Router();
const authorsRoutes = require("./authorsRoutes");
const booksRoutes = require("./bookRoutes");
const swaggerRoute = require("./swagger")

router.use("/", swaggerRoute);

router.get("/", (req, res) => {
    //#swagger.tags=["Hello World"]
  res.send("Hello World This is the Book API");
});

router.use("/books", booksRoutes);

router.use("/authors", authorsRoutes);

module.exports = router;