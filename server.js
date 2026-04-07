require("dotenv").config({ path: __dirname + "/.env", override: true });

console.log("ENV CHECK:", process.env.OPENAI_API_KEY);
const express = require("express");
const cors = require("cors");
const path = require("path");

const chatRoutes = require("./routes/chat");
const taskRoutes = require("./routes/task");
const eventRoutes = require("./routes/event");
const noteRoutes = require("./routes/note");

const app = express();

// ✅ Middleware FIRST
app.use(cors());
app.use(express.json());

// ✅ Serve frontend (ONLY ONCE)
app.use(express.static(path.join(__dirname, "public")));

// ✅ Test route
app.get("/test", (req, res) => {
    res.send("Server working ✅");
});

// ✅ API Routes
app.use("/api/chat", chatRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/notes", noteRoutes);

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});