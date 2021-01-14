const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cardioSchema = new Schema ({
    name: {
        type: String,
        trim: true,
        required: "Exercise name is required."
    },
    distance: {
        type: Number,
        required: "Distance is required."
    },
    duration: {
        type: Number,
        required: "Duration is required."
    }
});

const Cardio = mongoose.model("Cardio", cardioSchema);

module.exports = Cardio;