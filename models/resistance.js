const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resistanceSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: "Exercise name is required."
    },
    weight: {
        type: Number,
        required: "Weight is required."
    },
    sets: {
        type: Number,
        required: "Number of sets is required."
    },
    reps: {
        type: Number,
        required: "Number of reps is required."
    }
});

const Resistance = mongoose.model("Resistance", resistanceSchema);

module.exports = Resistance;