import dotenv from "dotenv"
import express from "express"
import { JwtPayload } from "jsonwebtoken"
import authRoutes from "./Routes/Auth.Routes"
import helmet from "helmet"
import bodyParser from "body-parser"
import { errorHandler } from "./Middlewares/Error.middleware"

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload
    }
  }
}

// Load environment variables from .env file
dotenv.config()

// Create an Express application
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Security: Enable additional helmet protections (consider tailoring these based on your needs)
app.use(helmet.contentSecurityPolicy()) // Content Security Policy for script and resource restrictions
app.use(helmet.referrerPolicy()) // Prevent referrer leakage
// Define a route
app.get("/", (req, res) => {
  res.send("Hello, world!")
})

// Define a route that requires authentication
app.use("/api/auth", authRoutes)

app.use(errorHandler)

// Start the server
const PORT = process.env.PORT || 5050
app.listen(PORT, () => {
  if (process.env.NODE_ENV === "development") {
    console.log(`Server is running on port http://localhost:${PORT}`)
  }
})
