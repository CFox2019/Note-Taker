// This program allows the user to write and save notes to better organize thoughts and keep track of tasks needing to be completed

// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 9090;

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Router
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// listener
app.listen(PORT, () => console.log(`Server currently running on http://localhost:${PORT}`));