const mongodb = require("../database/dataBaseConnection");
const ObjectId = require("mongodb").ObjectId;

const getAllBooks = async (req, res) => {
    //#swagger.tags=["Books"]
    try {
      const result = await mongodb
        .getDb()
        .db("CSE_Web_Services_Class_2")
        .collection("books")
        .find();
      const books = await result.toArray();
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(books);

    } catch (error) {
      console.error("Error fetching all books:", error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching books." });
    }
};
  
const getSingleBook = async (req, res) => {
    //#swagger.tags=["Books"]
    try {
      if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json( "Must be a valid book id to find a book" );
      }
  
      const bookId = new ObjectId(req.params.id);
      const book = await mongodb
        .getDb()
        .db("CSE_Web_Services_Class_2")
        .collection("books")
        .findOne({ _id: bookId });
      if (book) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found." });
    }
    } catch (error) {
      console.error("Error fetching single book:", error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the book." });
    }
};

const createBook = async (req, res) => {
    //#swagger.tags=["Books"]
    try {
      const book = {
        title: req.body.title,
        author: req.body.author,
        publishedYear: req.body.publishedYear,
        genre: req.body.genre,
        available: req.body.available,
      }
  
      const result = await mongodb
        .getDb()
        .db("CSE_Web_Services_Class_2")
        .collection("books")
        .insertOne(book);
  
      if (result.acknowledged > 0) {
        res.setHeader("Content-Type", "application/json");
        res.status(204).json();
      } else {
        res.status(500).json( result.error || "Some error occured while creating a new book." );
      }
    } catch (error) {
      console.error("Error Creating a book:", error);
      res
        .status(500)
        .json(error || "An error occurred while creating the book." );
    }
};

const updateBook = async (req, res) => {
    //#swagger.tags=["Books"]
    try {
      if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json( "Must be a valid book id to update a book" );
      }
      const bookId = new ObjectId(req.params.id);
  
      const book = {
        title: req.body.title,
        author: req.body.author,
        publishedYear: req.body.publishedYear,
        genre: req.body.genre,
        available: req.body.available,
      }
  
      const result = await mongodb
        .getDb()
        .db("CSE_Web_Services_Class_2")
        .collection("books")
        .replaceOne({_id: bookId}, book);
  
      if (result.modifiedCount > 0) {
        res.setHeader("Content-Type", "application/json");
        res.status(204).json();
      } else {
        res.status(500).json( result.error || "Some error occured while updating the book." );
      }
    } catch (error) {
      console.error("Error updating the book:", error);
      res
        .status(500)
        .json(error || "An error occurred while updating the book." );
    }
};
  
  const deleteBook = async (req, res) => {
    //#swagger.tags=["Books"]
    try {
      if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json( "Must be a valid book id to delete a book" );
      }
      const bookId = new ObjectId(req.params.id);
  
      const result = await mongodb
        .getDb()
        .db("CSE_Web_Services_Class_2")
        .collection("books")
        .deleteOne({_id: bookId});
  
      if (result.deletedCount > 0) {
        res.setHeader("Content-Type", "application/json");
        res.status(204).json();
      } else {
        res.status(500).json( result.error || "Some error occured while deleting book." );
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      res
        .status(500)
        .json( error || "Some error occured while deleting book.");
    }
  };  

module.exports = {
    getAllBooks,
    getSingleBook,
    createBook,
    updateBook,
    deleteBook
};