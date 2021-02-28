// This program allows the user to write and save notes to better organize thoughts and keep track of tasks needing to be completed

// Dependencies
const express = require('express');

const app = express();
const PORT = process.env.PORT || 9090;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTML Routes
app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get("/notes", (req, res) => {
    res.sendFile(`${__dirname}/public/notes.html`);
});


// listener
app.listen(PORT, () => console.log(`Server currently running on http://localhost:${PORT}`));