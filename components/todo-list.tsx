import TodoItem from './todo-item'
import { prisma } from '@/lib/db'

// ts hack
function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
  return fn as (arg: T) => R
}

const TodoList = asyncComponent(async () => {
  const todos = await prisma.todo.findMany()

  return (
    <div className='flex'>
      <ul className='bg-white rounded-lg border border-gray-200 w-96 text-gray-900'>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  )
})

export default TodoList
