import express from "express"
import { StoreCategories , getCategories} from "../controller/category.controller.js";

const router = express.Router();
router.get('/', getCategories)
router.post('/', StoreCategories)

export default router