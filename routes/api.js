const router = require("express").Router();
const Workout = require("../models/workout");

router.get("/api/workouts", function (req, res) {
    Workout.find({})
        .sort({ day: -1 })
        .limit(1)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post("/api/workouts", function ({ body }, res) {
    Workout.create(body)
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });

});

router.put("/api/workouts/:id", function (req, res) {
    Workout.findOneAndUpdate(
        {
            _id: req.params.id
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
                console.log(edited);
                res.send(edited);
            }
        }
    );
});

module.exports = router;