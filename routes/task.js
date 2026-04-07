console.log("✅ task.js loaded");
const express = require("express");
const router = express.Router();

const db = require("../db/db");

// Add Task
router.post("/add", (req, res) => {
    const { title } = req.body;

    db.run("INSERT INTO tasks (title) VALUES (?)", [title], function (err) {
        if (err) return res.status(500).send(err);
        res.json({ message: "Task added", id: this.lastID });
    });
});

// Get Tasks
router.get("/", (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) return res.status(500).send(err);
        res.json(rows);
    });
});
router.get("/test", (req, res) => {
    res.send("Task route working ✅");
});

module.exports = router;