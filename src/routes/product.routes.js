import express from 'express'
import { getProducts , StoreProducts } from '../controller/product.controller.js'

const router = express.Router();
router.get('/', getProducts)
router.post('/', StoreProducts)

export default router