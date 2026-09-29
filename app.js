
import "dotenv/config"
import express from "express";
import mongoose from "mongoose";
import routes from './routes.js'
import morgan from "morgan";


const app = express();
app.use(express.json());
app.use(morgan('dev'))
app.use("/api" , routes)

try {

    await mongoose.connect(process.env.MONGO_URI)

} catch (error) {

    console.error(error.message)
}

app.listen(process.env.PORT, () => {
    console.log(`backend is running on PORT ${process.env.PORT}`)
})