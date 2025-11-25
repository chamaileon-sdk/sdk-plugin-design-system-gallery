import { createTerminus } from "@godaddy/terminus";
import cors from "cors";
import express from "express";
import fs from "fs";
import nconf from "nconf";
import icons from "./routes/icons.js";
import iconNamesArray from "./util/iconNamesArray.js";
const iconsHtml = fs.readFileSync("./example/example.html", "utf-8");

nconf.argv().file({ file: "config.json" || "./config.json" });
const app = express();
const configFile = nconf.get();

app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({
	extended: true,
	limit: "100kb",
}));

app.disable("x-powered-by");

app.use(cors({
	origin: true,
	credentials: true,
	methods: [ "GET" ],
}));

if (!configFile.port) {
	console.error("ExpressServer: Can't start a server without a defined port");
	process.exit(1);
}

app.use("/", icons);

app.get("/example", (req, res) => {
	res.setHeader("Content-Type", "text/html");
	res.status(200).send(iconsHtml);
});

app.get("/iconNamesArray", (req, res) => {
	res.status(200).send(iconNamesArray);
});

const server = app.listen(configFile.port, (err) => {
	if (err) {
		console.error("ExpressServer: Error while starting server:", err);
		process.exit(1);
	}

	console.info(`ExpressServer: Server is listening on port ${configFile.port}`);
});

createTerminus(server, {
	timeout: 70000,
});
