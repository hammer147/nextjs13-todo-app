# Testing Nextjs 13

## project setup

### create-next-app

[docs](https://beta.nextjs.org/docs/getting-started#automatic-installation)

```bash
npx create-next-app@latest --experimental-app
```

### Tailwind

[docs](https://beta.nextjs.org/docs/styling/tailwind-css)

step 1

```bash
npm i -D tailwindcss@latest postcss@latest autoprefixer@latest
```

step 2

```bash
npx tailwindcss init -p
```

step 3: configure tailwind in `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

step 4: add tailwind directives to `app/global.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Prisma

[docs](https://www.prisma.io/docs/getting-started/quickstart)

step 1: install prisma

```bash
npm i prisma -D
```

step 2: init prisma

```bash
npx prisma init --datasource-provider sqlite
```

step 3: modify `schema.prisma`

```prisma
model Todo {
  id        String  @id @default(cuid())
  content   String
  completed Boolean @default(false)
}
```

step 4: run prisma migrate

```bash
npx prisma migrate dev --name init
```

step 5: create `lib/db.ts` to export prisma client

```ts
import { PrismaClient } from '@prisma/client'

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma
```

## A very useful example of a nextjs 13 app

[example](https://github.com/shadcn/taxonomy)
