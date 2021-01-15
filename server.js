const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const router = require("./routes/api.js");

const app = express();
const PORT = process.env.PORT || 3000;

const db = require("./models");

const public = path.join(__dirname, "/public");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(router);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
});

app.get("/stats", function (req, res) {
    res.sendFile(path.join(public, "stats.html"));
});

app.get("/exercise", function (req, res) {
    res.sendFile(path.join(public, "exercise.html"));
});

app.get("/api/workouts", function (req, res) {
    db.Workout.find({})
        .sort({ day: -1 })
        .limit(1)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
});
