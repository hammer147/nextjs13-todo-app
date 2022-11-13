'use client'

import { useRouter } from 'next/navigation'
import { use, useState } from 'react'

async function addTodo(content: string, refresh: () => void) {
  await fetch(`/api/todos`, {
    method: 'POST',
    body: JSON.stringify({ content })
  })

  // Refresh the current route and fetch new data from the server
  refresh()
}

const AddNewTodo = () => {
  const router = useRouter()
  const [content, setContent] = useState('')

  return (
    <div>
      <input
        className='form-control block w-96 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
        type='text'
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button
        className='my-3 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
        onClick={() => {
          addTodo(content, router.refresh)
          setContent('')
        }}>
        Add todo
      </button>
    </div>
  )
}

export default AddNewTodo
