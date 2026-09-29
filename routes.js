import express from "express"
import categoryRoutes from './src/routes/category.routes.js'

const router = express.Router()

router.use('/categories' , categoryRoutes)

export default router