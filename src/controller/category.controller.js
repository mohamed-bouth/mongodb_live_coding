import Category from "../modules/category.module.js";

export async function getCategories(req, res) {
    try {
        const categories = await Category.find()

        res.status(201).json({
            success: true,
            data: {
                categories
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

export async function StoreCategories(req, res) {
    try {
        const category = await Category.create(req.body)

        res.status(201).json({
            success: true,
            data: {
                category
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}