const fs = require('fs');
const path = require('path');

class NotesManager {

    notes() {
        let notesData = fs.readFileSync(path.resolve(__dirname, '../db/db.json'));
        return JSON.parse(notesData);
    }

    addNote(note, callback) {
        // Add a unique ID to the note
        note.id = Math.random().toString(36);

        // We then add the json the user sent to the notes
        const notes = this.notes();
        notes.push(note);

        this.writeNotes(notes, callback);
    }

    deleteNote(id, callback) {
        const notes = this.notes().filter((note) => note.id !== id);
        this.writeNotes(notes, callback);
    }

    writeNotes(notes, callback) {
        // write notes back to db.json
        fs.writeFile(path.resolve(__dirname, '../db/db.json'), JSON.stringify(notes), err => {
            if (err) {
                console.log('Error writing file', err);
                callback(err);
            } else {
                console.log('Successfully wrote file');
                callback();
            }
        })
    }

}

module.exports = NotesManager;