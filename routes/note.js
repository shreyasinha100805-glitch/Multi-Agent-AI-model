const express = require("express");
const router = express.Router();

const db = require("../db/db");

// Save Note
router.post("/add", (req, res) => {
    const { content } = req.body;

    db.run("INSERT INTO notes (content) VALUES (?)", [content], function (err) {
        if (err) return res.status(500).send(err);
        res.json({ message: "Note saved", id: this.lastID });
    });
});

// Get Notes
router.get("/", (req, res) => {
    db.all("SELECT * FROM notes", [], (err, rows) => {
        if (err) return res.status(500).send(err);
        res.json(rows);
    });
});

module.exports = router;