import express from "express";
import getMaterialIcon from "../core/material.js";
import sharp from "sharp";

// eslint-disable-next-line new-cap
const router = express.Router();

export default function () {
	router.get("/", (req, res) => {
		try {
			const { name, style, size, width, height, primary, secondary } = req.query;

			if (!name) {
				return res.status(400).send("Name is required");
			}

			const iconSvg = getMaterialIcon({ name, style, size, width, height, primary, secondary });

			res.set({
				"Content-Type": "image/png",
				"Cache-Control": "no-cache, no-store, must-revalidate",
				Expires: "0",
			});

			sharp(Buffer.from(iconSvg)).png().pipe(res);
		} catch (error) {
			console.error(`Error on icon GET: ${error.message}`);
			res.status(500).send("something went wrong");
		}
	});

	return router;
}
