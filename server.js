const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const public = path.join(__dirname, "/public");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(require("./routes/api.js"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout_app", {
    useNewUrlParser: true,
    useFindAndModify: false
});

app.get("/stats", function (req, res) {
    res.sendFile(path.join(public, "stats.html"));
});

app.get("/exercise", function (req, res) {
    res.sendFile(path.join(public, "exercise.html"));
});


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
});
