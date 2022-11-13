import { NextApiRequest, NextApiResponse } from 'next'
import * as z from 'zod'

import { prisma } from '@/lib/db'
import { withMethods } from '@/lib/api-middlewares/with-methods'
import { todoCreateSchema } from '@/lib/validations/todo'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const todos = await prisma.todo.findMany()
      return res.json(todos)
    } catch (error) {
      return res.status(500).end()
    }
  }

  if (req.method === 'POST') {
    try {
      const { content } = todoCreateSchema.parse(JSON.parse(req.body))
      const todo = await prisma.todo.create({
        data: {
          content
        }
      })
      return res.json(todo)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }
      return res.status(500).end()
    }
  }
}

export default withMethods(['GET', 'POST'], handler)
