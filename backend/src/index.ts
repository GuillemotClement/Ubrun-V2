import { Elysia } from "elysia";
import { authRouter } from "./router/authRouter";
import { auth } from "./libs/auth";
import { cors } from '@elysiajs/cors'

const app = new Elysia()
  .use(
    cors({
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization']
    })
  )
  .get("/", () => "Hello Elysia")
  // .mount(auth.handler)
  .all("/api/auth/*", ({ request }: { request: Request}) => auth.handler(request))
  .use(authRouter)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
