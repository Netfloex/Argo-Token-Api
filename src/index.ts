import micro, { send, json } from "micro";
import Store from "./store";

const store = new Store("refresh_token");
const server = micro(async (req, res) => {
	if (process.env.TOKEN && req.headers.authorization?.includes(process.env.TOKEN)) {
		if (req.method == "POST") {
			const data = await json(req);
			if (data.token) {
				store.write(data.token);
				return "Set!";
			}
			return "No Token!";
		} else if (req.method == "GET") {
			return await store.get();
		}
		send(res, 405);
	} else {
		send(res, 403, "Forbidden");
	}
});
const port = process.env.PORT ?? 3000;
server.listen(port, () => {
	console.log("Listening on port " + port);
});
