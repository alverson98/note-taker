// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
//unique id package
const getUid = require("get-uid");

// Declaring server port
const PORT = 3001;

// Express instance
const app = express();

//Middleware
app.use(express.json());
app.use(express.static("public"));

//HTML routes -
//Route for landing page
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//Route for notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//API routes -
//Getting all notes
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db.db.json"));
});

//Adding new note
app.post("/api/notes", (req, res) => {
  fs.readFile("db/db.json", "utf-8", (err, noteData) => {
    if (err) {
      console.error(err);
    } else {
      const parsedNoteData = JSON.parse(noteData);
      let notes = req.body;

      //Assigning id property to each note object
      notes.id = getUid();

      parsedNoteData.push(notes);

      fs.writeFile("db/db.json", JSON.stringify(parsedNoteData), (err) => {
        if (err) {
          console.error(err);
        } else {
          console.info("Successfully added new note");
        }
      });
    }
    res.sendFile(path.join(__dirname, "/db/db.json"));
  });
});

//BONUS delete note

//Listening to port
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
