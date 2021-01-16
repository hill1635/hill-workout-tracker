const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    type: {
        type: String,
        trim: true,
    },
    name: {
        type: String,
        trim: true,
        required: "Exercise name is required."
    },
    distance: {
        type: Number,
        // required: "Distance is required."
    },
    duration: {
        type: Number,
        // required: "Duration is required."
    },
    weight: {
        type: Number,
        // required: "Weight is required."
    },
    sets: {
        type: Number,
        // required: "Number of sets is required."
    },
    reps: {
        type: Number,
        // required: "Number of reps is required."
    }
});

const Exercise = mongoose.model("exercise", exerciseSchema);

module.exports = Exercise;