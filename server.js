// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
//unique id package
const getUid = require("get-uid");

// Declaring server port
const PORT = process.env.PORT || 3001;

// Express instance
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//HTML routes -
//Route for landing page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//Route for notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//API routes -
//Getting all notes
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

//Adding new note
app.post("/api/notes", (req, res) => {
  fs.readFile("db/db.json", "utf-8", (err, noteData) => {
    if (err) {
      console.error(err);
    } else {
      const parsedNoteData = JSON.parse(noteData);
      let newNote = req.body;

      //Assigning id property to each note object & using getUid() to provide randomly generated id
      newNote.id = getUid();

      parsedNoteData.push(newNote);

      fs.writeFile("db/db.json", JSON.stringify(parsedNoteData), (err) => {
        if (err) {
          console.error(err);
        } else {
          res.json(newNote);
          console.info("Successfully added new note");
        }
      });
    }
    res.sendFile(path.join(__dirname, "/db/db.json"));
  });
});

//BONUS - delete note
app.delete("/api/notes/:id", (req, res) => {
  fs.readFile("db/db.json", "utf-8", (err, noteData) => {
    const parsedNoteData = JSON.parse(noteData);
    //filtering through to find notes that do NOT match the id of the note that is being deleted
    const remainingNotes = parsedNoteData.filter(
      (note) => parseInt(note.id) != parseInt(req.params.id)
    );

    // Putting the notes that were not deleted into the db
    fs.writeFile("db/db.json", JSON.stringify(remainingNotes), (err) => {
      if (err) {
        console.error(err);
      } else {
        console.info("Note was deleted.");
      }
    });
    res.sendFile(path.join(__dirname, "db/db.json"));
  });
});

//Listening to port
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
