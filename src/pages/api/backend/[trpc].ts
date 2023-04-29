import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import type { APIRoute } from 'astro'
import { appRouter } from 'src/backend'

export const all: APIRoute = opts => {
  return fetchRequestHandler({
    endpoint: '/api/backend',
    req: opts.request,
    router: appRouter,
    createContext: ({ req }) => ({
      authToken: req.headers.get('authorization')
        ? req.headers.get('authorization')?.split(' ')[1]
        : undefined,
    }),
  })
}
