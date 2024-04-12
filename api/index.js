import express from 'express'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import articleroutes from './routes/articles.router.js'
import dassRoutes from './routes/dass.router.js'
import userRoutes from './routes/user.routes.js'
import postRoutes from './routes/post.router.js'
import commentRoutes from './routes/comment.router.js'

dotenv.config();

await mongoose.connect(process.env.MongoURI)
    .then((val) => {
        console.log("Connected to MongoDb");
    })
    .catch((e) => console.log("Could not connect to database", e))

const app = express();
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(cookieParser())

//Handle Routes
app.use("/api/v1/articles", articleroutes)
app.use("/api/v1/dass", dassRoutes)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/posts", postRoutes)
app.use("/api/v1/reactions", commentRoutes)

// Error handling  middleware should be after all routes
app.use((err, req, res, next) => {
    const errorMessage = err.message || 'Internal Server Error'
    const errorCode = err.statusCode || 500
    res
        .status(errorCode)
        .json({
            success: false,
            message: errorMessage
        })
})

app.listen(3000, () => {
    console.log("Server is listening at port 3000");
})