import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { z } from 'zod';
import cors from 'cors';

export const t = initTRPC.create();
export const appRouter = t.router({
  hello: t.procedure.input(z.object({ name: z.string() })).query(({ input: { name } }) => {
    return `Hello ${name}!`;
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;

createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext() {
    console.log('context 3');
    return {};
  },
}).listen(2022);
