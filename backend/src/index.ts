import { Elysia } from "elysia";

import { auth } from "./libs/auth";
import { cors } from "@elysiajs/cors";

const app = new Elysia()
	.use(
		cors({
			origin: "http://localhost:5173",
			methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
			credentials: true,
			//allowedHeaders: ["Content-Type", "Authorization"],
		}),
	)
	.group("/api", (app) =>
		app.all("/auth/*", ({ request }) => auth.handler(request)),
	)
	.get("/", () => "Hello Elysia")
	.listen({
		port: 3000,
		hostname: "0.0.0.0",
	});

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
