import figlet from "figlet";

const server = Bun.serve({
	port: 3000,
	routes: {
		"/": () => {
			const body = figlet.textSync("Ubrun is alive");
			return new Response(body);
		},
	},
});

console.log(`Listening on ${server.url}`);
