const express = require("express");
const router = express.Router();
const booksRoutes = require("./bookRoutes");
const swaggerRoute = require("./swagger")

router.use("/", swaggerRoute);

router.get("/", (req, res) => {
    //#swagger.tags=["Hello World"]
  res.send("Hello World This is the Book API");
});

router.use("/books", booksRoutes);

module.exports = router;