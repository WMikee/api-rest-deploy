import { MovieModel } from "../models/movie.js"
import { validateMovie, validatePartialMovie } from "../schemas/movies.js"

export class MoviesController {
  static async getAll(req, res) {
    {
      const { genre } = req.query
      const movies = await MovieModel.getAll({ genre })
      res.json(movies)
    }
  }

  static async getById(req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).send("Movie not found")
  }

  static async create(req, res) {
    const result = validateMovie(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = await MovieModel.create({ data: result.data })
    res.status(201).json(newMovie)
  }

  static async update(req, res) {
    const result = validatePartialMovie(req.body)
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const updatedMovie = await MovieModel.update({ id, data: result.data })

    res.json(updatedMovie)
  }

  static async delete(req, res) {
    const { id } = req.params
    console.log("Attempting to delete movie with id:", id)
    const result = await MovieModel.delete({ id })
    console.log("Delete result:", result)

    if (result === false) {
      return res.status(404).json({ error: "Movie not found" })
    }

    return res.json({ message: "Movie deleted" })
  }
}
