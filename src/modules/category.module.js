import mongoose, { mongo } from "mongoose";

const categoyschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "le nom est obligatoire"],
        trim: true,
        minlength: [2, "minimum 2 caracteres"],
        unique: true,
    },
    descripiton: {
        type: String,
        trim: true,
        maxlength: 200
    },
}, { timestamps: true })

const Category = mongoose.model('Category', categoyschema)

export default Category