// This program allows the user to write and save notes to better organize thoughts and keep track of tasks needing to be completed

// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const NotesManager = require('./notes_manager.js');

const notesManager = new NotesManager();

const app = express();
const PORT = process.env.PORT || 9090;

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTML Routes
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/notes.html'));
});

// API Routes

// Get all notes
app.get("/api/notes", (req, res) => {
    const notes = notesManager.notes();
    res.send(notes);
});

// add a new note object to our "Database"
app.post("/api/notes", (req, res) => {
    const note = req.body;
    notesManager.addNote(note, (err) => {
        if (err) {
            console.log('err', err);
            res.status(500).send(err);
        } else {
            res.json(note);
        }
    })
});

// delete a note object from our "Database"
app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id
    notesManager.deleteNote(noteId, (err) => {
        if (err) {
            console.log('err', err);
            res.status(500).send(err);
        } else {
            res.status(204).send();
        }
    })
});

// listener
app.listen(PORT, () => console.log(`Server currently running on http://localhost:${PORT}`));