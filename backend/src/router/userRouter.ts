import Elysia from "elysia";

export const userRouter = new Elysia({ prefix: '/user'}).get('/', "user module");