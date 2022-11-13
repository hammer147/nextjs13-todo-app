import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import * as z from 'zod'

import { prisma } from '@/lib/db'

export const schema = z.object({
  todoId: z.string()
})

export function withTodo(handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      const query = await schema.parse(req.query)

      const count = await prisma.todo.count({
        where: {
          id: query.todoId
        }
      })

      if (count < 1) {
        return res.status(403).end()
      }

      return handler(req, res)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }

      return res.status(500).end()
    }
  }
}
