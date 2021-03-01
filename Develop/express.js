// This program allows the user to write and save notes to better organize thoughts and keep track of tasks needing to be completed

// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const { nextTick } = require('process');

const app = express();
const PORT = process.env.PORT || 9090;

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTML Routes
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/notes.html'));
});

// API Routes

// Get all notes
app.get("/api/notes", (req, res) => {
    let notesData = fs.readFileSync(path.resolve(__dirname, 'db/db.json'));
    let notesJSON = JSON.parse(notesData);
    res.send(notesJSON)
});

// Get a specific note using dynamic routing (:note)
app.get("/api/notes/:note", (req, res) => {
    const saved = req.params.notes;
    let found = false;
    notes.forEach(note => {
        if (saved === note.route) {
            found = true;
            res.json(note);
        }
    });
    if (!found) {
        res.send("No saved notes!");
    }
});

// add a new note object to our "Database"
app.post("/api/notes", (req, res) => {
    const newnote = req.body;
    console.log(newnote);

    let notesData = fs.readFileSync(path.resolve(__dirname, 'db/db.json'));
    let notesJSON = JSON.parse(notesData);

    // We then add the json the user sent to the notes
    notesJSON.push(newnote);

    // write notesJSON back to db.json
    fs.writeFile('db/db.json', JSON.stringify(notesJSON), err => {
        if (err) {
            console.log('Error writing file', err)
            next(err)
        } else {
            console.log('Successfully wrote file')
        }
    })

    // We then display the JSON to the users
    res.json(newnote);
});

// listener
app.listen(PORT, () => console.log(`Server currently running on http://localhost:${PORT}`));