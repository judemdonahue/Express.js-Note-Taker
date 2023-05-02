// Import Node Package Modules
const express = require('express');
const path = require('path');
const fs = require('fs');


// Declare Port# as a Var
const PORT = process.env.PORT || 3001;

// App declaration
const app = express()

// Setting Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("Develop/public"));

// Get route serving the index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"))
});

// Append notes to db.json
const appendNote = (content, file) => {
    fs.readFile(file, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const input = JSON.parse(data);
            input.push(content);
            
        }
    })
}
