import express from "express"
import movies from "./movies.json" with { type: "json" }
import { validateMovie, validatePartialMovie } from "./schemas/movies.js"

const app = express()
app.use(express.json())

app.disable("x-powered-by")

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.get("/movies", (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filterMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase()),
    )
    return res.json(filterMovies)
  }
  res.json(movies)
})

app.get("/movies/:id", (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (movie) return res.json(movie)
  res.status(404).send("Movie not found")
})

app.post("/movies", (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data,
  }
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

app.patch("/movies/:id", (req, res) => {
  const result = validatePartialMovie(req.body)
  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id)

  if (movieIndex === -1)
    return res.status(404).json({ error: "Movie not found" })

  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data,
  }

  movies[movieIndex] = updatedMovie

  res.json(updatedMovie)
})

const PORT = process.env.PORT ?? 8010

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
