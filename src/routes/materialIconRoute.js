import express from "express";
import {
	getMaterialIcon,
	getPeepsMonochromaticIcon,
	getPeepsMultiColorIcon,
	getAllPeepsIcons,
	getAllHumaaansIcons,
	getHumaaansIcon,
} from "../core/materialIcons.js";
import sharp from "sharp";

// eslint-disable-next-line new-cap
const router = express.Router();

const defaults = {
	color: "00C0E7",
	size: "32",
	mdiStyle: "filled",
};

router.get("/mdiIcons/:iconStyle/:iconName/:iconSize/:iconColor", (req, res) => {
	try {
		const { iconName, iconStyle, iconSize, iconColor } = req.params;

		if (!iconName) {
			return res.status(400).send("Icon is required");
		}

		const iconSvg = getMaterialIcon({ iconName,
			iconStyle: iconStyle || defaults.mdiStyle,
			iconSize: iconSize || defaults.size,
			iconColor: iconColor || defaults.color });

		res.set({
			"Content-Type": "image/png",
			"Cache-Control": "no-cache, no-store, must-revalidate",
			Expires: "0",
		});

		sharp(Buffer.from(iconSvg)).png().pipe(res);
	} catch (error) {
		console.error(`Error on mdi icon GET: ${error.message}`);
		res.status(500).send("something went wrong");
	}
});

router.get("/openPeepsIcons/:iconStyle/:iconName/:iconSize/:iconColor.png", (req, res) => {
	try {
		const { iconName, iconStyle, iconSize, iconColor } = req.params;

		if (!iconName) {
			return res.status(400).send("Icon is required");
		}
		let iconSvg;
		if (iconStyle === "monochromatic") {
			iconSvg = getPeepsMonochromaticIcon({
				iconName,
				iconSize: iconSize || defaults.size,
				iconColor: iconColor || defaults.color,
			});
		} else {
			iconSvg = getPeepsMultiColorIcon({
				iconName,
				iconSize: iconSize || defaults.size,
			});
		}

		res.set({
			"Content-Type": "image/png",
			"Cache-Control": "no-cache, no-store, must-revalidate",
			Expires: "0",
		});

		sharp(Buffer.from(iconSvg)).png().pipe(res);
	} catch (error) {
		console.error(`Error on openPeepsSvgs GET: ${error.message}`);
		res.status(500).send("something went wrong");
	}
});

router.get("/openPeepsIcons/svgs", async (req, res) => {
	try {
		const openPeepsSvgs = await getAllPeepsIcons();
		res.json(openPeepsSvgs);
	} catch (error) {
		console.error(`Error on all openPeepsIcons GET: ${error.message}`);
		res.status(500).send("something went wrong");
	}
});

router.get("/humaaans/:iconStyle/:iconName/:iconSize/:iconColor.png", (req, res) => {
	try {
		const { iconStyle, iconName, iconSize, iconColor } = req.params;

		if (!iconName) {
			return res.status(400).send("Icon is required");
		}

		const iconSvg = getHumaaansIcon({
			iconStyle,
			iconName,
			iconSize,
			iconColor,
		});

		res.set({
			"Content-Type": "image/png",
			"Cache-Control": "no-cache, no-store, must-revalidate",
			Expires: "0",
		});

		sharp(Buffer.from(iconSvg)).png().pipe(res);
	} catch (error) {
		console.error(`Error on humaaans GET: ${error.message}`);
		res.status(500).send("something went wrong");
	}
});

router.get("/humaaans/svgs", async (req, res) => {
	try {
		const humaaansSvgs = await getAllHumaaansIcons();
		res.json(humaaansSvgs);
	} catch (error) {
		console.error(`Error on all humaaans GET: ${error.message}`);
		res.status(500).send("something went wrong");
	}
});

export default router;
