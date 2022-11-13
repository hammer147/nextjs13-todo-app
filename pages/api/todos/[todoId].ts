import { NextApiRequest, NextApiResponse } from 'next'
import * as z from 'zod'

import { withMethods } from '@/lib/api-middlewares/with-methods'
import { withTodo } from '@/lib/api-middlewares/with-todo'
import { prisma } from '@/lib/db'
import { todoPatchSchema } from '@/lib/validations/todo'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    try {
      await prisma.todo.delete({
        where: {
          id: req.query.todoId as string
        }
      })
      return res.status(204).end()
    } catch (error) {
      return res.status(500).end()
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { completed } = todoPatchSchema.parse(JSON.parse(req.body))
      await prisma.todo.update({
        where: {
          id: req.query.todoId as string
        },
        data: {
          completed
        }
      })
      return res.status(204).end()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }
      return res.status(422).end()
    }
  }
}

export default withMethods(['DELETE', 'PATCH'], withTodo(handler))
