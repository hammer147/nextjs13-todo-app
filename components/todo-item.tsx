'use client'

import type { Todo } from '@prisma/client'
import { useRouter } from 'next/navigation'

type TodoProps = {
  todo: Todo
}

async function updateTodo(todoId: string, completed: boolean, refresh: () => void) {
  await fetch(`/api/todos/${todoId}`, {
    method: 'PATCH',
    body: JSON.stringify({ completed })
  })

  // Refresh the current route and fetch new data from the server
  refresh()
}

async function deleteTodo(todoId: string, refresh: () => void) {
  await fetch(`/api/todos/${todoId}`, {
    method: 'DELETE'
  })

  // Refresh the current route and fetch new data from the server
  refresh()
}

const TodoItem = ({ todo }: TodoProps) => {
  const router = useRouter()

  return (
    <li className='flex justify-between px-6 py-2 border-b border-gray-200 w-full rounded-t-lg last-of-type:border-none'>
      <div>
        <input
          type='checkbox'
          className='m-2'
          checked={todo.completed}
          onChange={e => updateTodo(todo.id, !todo.completed, router.refresh)}
        />
        {todo.content}
      </div>
      <button className='' onClick={() => deleteTodo(todo.id, router.refresh)}>
        <svg className='h-8 w-8 text-red-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
          />
        </svg>
      </button>
    </li>
  )
}

export default TodoItem
