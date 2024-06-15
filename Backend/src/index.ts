import dotenv from "dotenv"
import express from "express"
import authRoutes from "./Routes/Auth.Routes"
import productRoutes from "./Routes/Product.Routes"
import categoryRoutes from "./Routes/Category.Routes"
import userRoutes from "./Routes/User.Routes"
import helmet from "helmet"
import cors from "cors"
import bodyParser from "body-parser"
import { errorHandler } from "./Middlewares/Error.middleware"
import ConnectMongoDB from "./Database/MongoDB"
import { decodedUser, seedAdmin } from "./Utils/Auth"

declare global {
  namespace Express {
    interface Request {
      user?: decodedUser
    }
  }
}

// Load environment variables from .env file
dotenv.config()

// Create an Express application
const app = express()

app.use(cors())

app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ extended: true }))

// Security: Enable additional helmet protections (consider tailoring these based on your needs)
app.use(helmet.contentSecurityPolicy()) // Content Security Policy for script and resource restrictions
app.use(helmet.referrerPolicy()) // Prevent referrer leakage

// Define a route
app.get("/", (req, res) => {
  res.send("Hello, world!")
})

// Define routes
app.use("/api/auth", authRoutes)
app.use("/api/product", productRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/user", userRoutes)

app.use(errorHandler)

// Start the server
const PORT = process.env.PORT || 5050
app.listen(PORT, () => {
  if (process.env.NODE_ENV === "development") {
    console.log(`Server is running on port http://localhost:${PORT}`)
  }
})

ConnectMongoDB().then(async () => {
  await seedAdmin()
})
