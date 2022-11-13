import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className='p-4'>
          <h1 className='font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600'>
            Nextjs 13 - Todo App
          </h1>
          {children}
      </body>
    </html>
  )
}
