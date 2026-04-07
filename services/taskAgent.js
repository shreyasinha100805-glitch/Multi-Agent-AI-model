const db = require("../db/db");

function addTask(title) {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO tasks (title) VALUES (?)", [title], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}

function getTasks() {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM tasks", [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

module.exports = {
    addTask,
    getTasks
};