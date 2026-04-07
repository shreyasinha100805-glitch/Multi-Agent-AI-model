const db = require("../db/db");

function scheduleEvent(title, datetime) {
    return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO events (title, datetime) VALUES (?, ?)",
            [title, datetime],
            (err) => {
                if (err) reject(err);
                else resolve();
            }
        );
    });
}

function getEvents() {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM events", [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

module.exports = { scheduleEvent, getEvents };