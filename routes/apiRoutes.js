// Load Data
const db = require('../db/db');

const NotesRepository = require('../repositories/notesRepository.js');

const notesRepository = new NotesRepository();

// Routing

module.exports = (app) => {

    // Get all notes
    app.get("/api/notes", (req, res) => {
        const notes = notesRepository.notes();
        res.send(notes);
    });

    // Add a new note object to our "Database"
    app.post("/api/notes", (req, res) => {
        const note = req.body;
        notesRepository.addNote(note, (err) => {
            if (err) {
                console.log('err', err);
                res.status(500).send(err);
            } else {
                res.json(note);
            }
        })
    });

    // Delete a note object from our "Database"
    app.delete('/api/notes/:id', (req, res) => {
        const noteId = req.params.id
        notesRepository.deleteNote(noteId, (err) => {
            if (err) {
                console.log('err', err);
                res.status(500).send(err);
            } else {
                res.status(204).send();
            }
        })
    });

};