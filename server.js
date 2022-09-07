// Imports
const express = require("express");
const path = require("path");
const fs = require("fs");

// Declaring server port
const PORT = 3001;

// Express instance
const app = express();

//Middleware
app.use(express.json());

//For landing page
app.use(express.static("public"));

//HTML routes:
//Route for landing page
app.get("*", (req, res) => {
  //  get * index.html
});

//Route for notes page
app.get("/notes", (req, res) => {
  // get notes/ should return the notes.html
});

//API routes:
//Getting all notes
app.get("/api/notes", (req, res) => {
  // get /api/notes should read the db.json file and return all saved notes as JSON
});

//Posting new note
app.post("/api/notes", (req, res) => {
  //  post /api/notes -->receive new note & add to db.json file, return new note to the client (EACH NEED A UNIQUE ID)
});

//Listening to port
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
