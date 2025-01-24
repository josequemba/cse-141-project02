const mongodb = require("../database/dataBaseConnection");
const ObjectId = require("mongodb").ObjectId;

const getAllAuthors = async (req, res) => {
    //#swagger.tags=["Authors"]
    try {
      const result = await mongodb
        .getDb()
        .db("CSE_Web_Services_Class_2")
        .collection("authors")
        .find();
      const authors = await result.toArray();
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(authors);

    } catch (error) {
      console.error("Error fetching all authors:", error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching authors." });
    }
};
  
const getSingleAuthor = async (req, res) => {
    //#swagger.tags=["Authors"]
    try {
      if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json( "Must be a valid author id to find a author" );
      }
  
      const authorId = new ObjectId(req.params.id);
      const author = await mongodb
        .getDb()
        .db("CSE_Web_Services_Class_2")
        .collection("authors")
        .findOne({ _id: authorId });
      if (author) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(author);
    } else {
      res.status(404).json({ message: "Author not found." });
    }
    } catch (error) {
      console.error("Error fetching single author:", error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the author." });
    }
};

const createAuthor = async (req, res) => {
    //#swagger.tags=["Authors"]
    try {
      const author = {
        name: req.body.name,
        birthYear: req.body.birthYear,
        deathYear: req.body.deathYear,
        nationality: req.body.nationality,
      }
  
      const result = await mongodb
        .getDb()
        .db("CSE_Web_Services_Class_2")
        .collection("authors")
        .insertOne(author);
  
      if (result.acknowledged > 0) {
        res.setHeader("Content-Type", "application/json");
        res.status(204).json();
      } else {
        res.status(500).json( result.error || "Some error occured while creating a new author." );
      }
    } catch (error) {
      console.error("Error Creating a author:", error);
      res
        .status(500)
        .json(error || "An error occurred while creating the author." );
    }
};

const updateAuthor = async (req, res) => {
    //#swagger.tags=["Authors"]
    try {
      if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json( "Must be a valid author id to update an author" );
      }
      const authorId = new ObjectId(req.params.id);
  
      const author = {
        name: req.body.name,
        birthYear: req.body.birthYear,
        deathYear: req.body.deathYear,
        nationality: req.body.nationality,
      }
  
      const result = await mongodb
        .getDb()
        .db("CSE_Web_Services_Class_2")
        .collection("authors")
        .replaceOne({_id: authorId}, author);
  
      if (result.modifiedCount > 0) {
        res.setHeader("Content-Type", "application/json");
        res.status(204).json();
      } else {
        res.status(500).json( result.error || "Some error occured while updating the author." );
      }
    } catch (error) {
      console.error("Error updating the author:", error);
      res
        .status(500)
        .json(error || "An error occurred while updating the author." );
    }
};
  
  const deleteAuthor = async (req, res) => {
    //#swagger.tags=["Authors"]
    try {
      if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json( "Must be a valid author id to delete an author" );
      }
      const authorId = new ObjectId(req.params.id);
  
      const result = await mongodb
        .getDb()
        .db("CSE_Web_Services_Class_2")
        .collection("authors")
        .deleteOne({_id: authorId});
  
      if (result.deletedCount > 0) {
        res.setHeader("Content-Type", "application/json");
        res.status(204).json();
      } else {
        res.status(500).json( result.error || "Some error occured while deleting author." );
      }
    } catch (error) {
      console.error("Error deleting author:", error);
      res
        .status(500)
        .json( error || "Some error occured while deleting author.");
    }
  };  

module.exports = {
    getAllAuthors,
    getSingleAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor
};