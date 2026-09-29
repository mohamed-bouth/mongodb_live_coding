import express from "express"
import categoryRoutes from './src/routes/category.routes.js'
import productRoutes from "./src/routes/product.routes.js"

const router = express.Router()

router.use('/categories' , categoryRoutes)
router.use('/products' , productRoutes)

export default router