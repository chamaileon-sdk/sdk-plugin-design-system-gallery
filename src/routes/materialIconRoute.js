import express from "express";
import getMaterialDesignIcon from "../core/materialIcons.js";
import sharp from "sharp";

// eslint-disable-next-line new-cap
const router = express.Router();

router.get("/", (req, res) => {
	try {
		const { name, style, size, color } = req.query;

		if (!name) {
			return res.status(400).send("Name is required");
		}

		const iconSvg = getMaterialDesignIcon({ name, style, size, color });

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

export default router;
