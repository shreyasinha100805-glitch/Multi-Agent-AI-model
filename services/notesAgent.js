const db = require("../db/db");

function saveNote(content) {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO notes (content) VALUES (?)", [content], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}

module.exports = { saveNote };