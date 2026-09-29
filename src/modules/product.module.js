import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        minlength: 2
    },
    price: {
        type: Float64Array,
        require: true,
        min: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    }
}, { timeseries: true })

const Product = mongoose.model('Product', productSchema)

export default Product