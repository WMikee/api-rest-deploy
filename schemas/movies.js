import zod from "zod"

export const movieSchema = zod.object({
  title: zod.string(),
  year: zod.number().int().positive().min(1900).max(new Date().getFullYear()),
  director: zod.string(),
  duration: zod.number().int().positive(),
  poster: zod.string().url(),
  genre: zod.array(zod.string()),
  rate: zod.number().min(0).max(10).optional(),
})

export function validatePartialMovie(object) {
  return movieSchema.partial().safeParse(object)
}

export function validateMovie(object) {
  return movieSchema.safeParse(object)
}
