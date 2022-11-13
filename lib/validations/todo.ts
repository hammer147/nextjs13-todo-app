import * as z from 'zod'

export const todoCreateSchema = z.object({
  content: z.string().min(1).max(255)
})

export const todoPatchSchema = z.object({
  completed: z.boolean()
})
