const mongoose = require('mongoose');
const { objectId } = mongoose.Schema


//models then routes

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Name is required",
        minlength: [3, "Too Short"],
        maxlength: [32, "Too Long"],
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true,
    },
},
    { timestamps: true }

);

module.exports = mongoose.model("Category", categorySchema);