const express = require("express");
const router = express.Router();

const db = require("../db/db");

// Add Event
router.post("/add", (req, res) => {
    const { title, datetime } = req.body;

    db.run(
        "INSERT INTO events (title, datetime) VALUES (?, ?)",
        [title, datetime],
        function (err) {
            if (err) return res.status(500).send(err);
            res.json({ message: "Event added", id: this.lastID });
        }
    );
});

// Get Events
router.get("/", (req, res) => {
    db.all("SELECT * FROM events", [], (err, rows) => {
        if (err) return res.status(500).send(err);
        res.json(rows);
    });
});

module.exports = router;