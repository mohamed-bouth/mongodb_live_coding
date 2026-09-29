import Product from "../modules/product.module.js";

export async function getProducts(req, res) {
    try {
        const { name, category, minPrice, maxPrice } = req.query;

        const filter = {};

        if (name) {
            filter.name = { $regex: name, $options: "i"};
        }

        if (category) {
            filter.category = category;
        }
        if (minPrice || maxPrice) {
            filter.price = {};

            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        const products = await Product.find(filter)
            .populate("category");

        res.status(200).json({
            success: true,
            message: 'products loaded successfully',
            data: {
                products
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            error: error.message
        });
    }
}

export async function StoreProducts(req, res) {
    try {
        const product = await Product.create(req.body)

        res.status(201).json({
            success: true,
            message: "product created successfully",
            data: {
                product
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to create product",
            error: error.message
        })
    }
}