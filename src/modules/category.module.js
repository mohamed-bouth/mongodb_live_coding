import mongoose from "mongoose";

const categoyschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        unique: true,
    },
    description: {
        type: String,
        trim: true,
        maxlength: 200,
        required : true
    },
}, { timestamps: true })

const Category = mongoose.model('Category', categoyschema)

export default Category