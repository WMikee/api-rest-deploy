import express from "express"
import { corsMiddleware } from "./middlewares/cors.js"
import { moviesRouter } from "./routes/movies.js"

const app = express()
app.use(express.json())
app.use(corsMiddleware)
app.disable("x-powered-by")

app.use("/movies", moviesRouter)

const PORT = process.env.PORT ?? 8080

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
