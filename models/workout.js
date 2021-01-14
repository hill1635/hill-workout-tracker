const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema ({
    cardio: [
        {
        type: Schema.Types.ObjectId,
        ref: "Cardio"
    }
]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;