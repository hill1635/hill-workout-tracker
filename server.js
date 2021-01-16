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

//Add workout
app.post("/api/workouts", function ({ body }, res) {
    db.Workout.create(body)
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });

});

//Add exercise
app.put("/api/workouts/:id", function (req, res) {
    db.Workout.findOneAndUpdate(
        {
            _id: mongoose.Types.ObjectId(req.params.id)
        },
        {
            $push: {
                exercises: req.body
            }
        },
        (error, edited) => {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                // console.log("req.body: ", req.body.toString());
                console.log(edited);
                res.send(edited);
            }
        }
    );
});
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
});
