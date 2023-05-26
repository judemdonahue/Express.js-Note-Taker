// ** IMPORT NODE PACKAGE MODULES **
const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require("uniqid");

// ** DECLARE PORT **
const PORT = process.env.PORT || 3001;

// ** APP DECLARATION **
const app = express()

// ** MIDDLEWARE **
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// ** ROUTES **
// Route to serve the index.html file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
// Route to serve the notes.html file
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// ** GET NOTE ROUTE ** //
app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "db/db.json"), (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to read .json" });
        return;

      } else {
        res.json(JSON.parse(data));
      }
    });
  });
  
  // ** POST ROUTE **
  app.post("/api/notes", (req, res) => {
    const createNote = req.body;
    createNote.id = uniqid();
    
    fs.readFile(path.join(__dirname, "db/db.json"), (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to read .json" });
        return;
      } else {
        const noteJson = JSON.parse(data);
        noteJson.push(createNote);

        fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(noteJson, null, 2), (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to read .json" });
            return;
          } else {
            res.json(createNote);
          }
        })
      }
    });
  });

  // ** DELETE ROUTE **
  app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;

    fs.readFile(path.join(__dirname, "db/db.json"), (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to read .json" });
        return;
      }

      const noteJson = JSON.parse(data);
      const idCheck = noteJson.filter((note) => note.id !== id);

      fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(idCheck, null, 2), (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Note not found" });
          return;
        } else {
          res.json({ message: 'Note deleted successfully' });
        }
      })
    });
  });
  // ** ROUTES END **


// Starts the server to begin listening
app.listen(PORT, () => {
    console.log('http://localhost:' + PORT);
});




