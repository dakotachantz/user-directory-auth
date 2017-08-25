const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: Number,
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },

    email: {
        type: String,
        required: true
    },
    university: String,
    job: String,
    company: String,
    password: {
        type: String,
        required: true
    },
    address: {
        type: Object,
        city: String,
        country: String
    },
    phone: String,
    skills: []
});

module.exports = mongoose.model("User", userSchema);