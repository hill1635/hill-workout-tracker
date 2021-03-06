const router = require("express").Router();
const Workout = require("../models/workout");

router.get("/api/workouts", function (req, res) {
  Workout
  .aggregate([
    {
      $sort: { day: -1},
    },
    {
      $limit: 1,
    },
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .then((dbWorkout) => {
      console.log("workout: ", dbWorkout);
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts", function ({ body }, res) {
  Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", function (req, res) {
  Workout.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $push: {
        exercises: req.body,
      },
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

router.get("/api/workouts/range", (req, res) => {
  Workout
  .aggregate([
    {
      $sort: { day: -1 },
    },
    {
      $limit: 7,
    },
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
