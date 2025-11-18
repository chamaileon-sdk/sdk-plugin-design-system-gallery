import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sanitize = input => input.replace(/[^a-zA-Z0-9-_]/g, "");
const sanitizeColor = input => input.replace(/\.png$/i, "");

export const getMaterialIcon = ({ iconName, iconStyle, iconSize, iconColor }) => {
	try {
		const iconPath = path.resolve(
			__dirname,
			"../../node_modules/@material-design-icons/svg",
			`${iconStyle}`,
			`${iconName}.svg`,
		);

		const svgFile = fs.readFileSync(iconPath, "utf8");
		if (!svgFile) {
			throw new Error("Icon file not found");
		}
		const updatedSvg = svgFile
			.replace(/width\s*=\s*["]\d+["]/g, `width="${iconSize}"`)
			.replace(/height\s*=\s*["]\d+["]/g, `height="${iconSize}"`)
			.replaceAll("<path", `<path fill="#${sanitizeColor(iconColor)}"`)
			.replaceAll("<circle", `<circle fill="#${sanitizeColor(iconColor)}"`);

		return updatedSvg;
	} catch (error) {
		console.error(`Error reading icon file: ${error.message}`);
		throw error;
	}
};

export const getPeepsMonochromaticIcon = ({ iconName, iconSize, iconColor }) => {
	try {
		const monochromaticIconPath = path.resolve(
			__dirname,
			"../../assets/openPeepsSvgs/monochromatic",
			`${sanitize(iconName)}.svg`,
		);
		const svgFile = fs.readFileSync(monochromaticIconPath, "utf8");
		if (!svgFile) {
			throw new Error("Icon file not found");
		}
		const updatedSvg = svgFile
			.replace(/#000000/g, `#${sanitizeColor(iconColor)}`)
			.replace(/width="\d+"/g, `width="${iconSize}"`)
			.replace(/height="\d+"/g, `height="${iconSize}"`);

		return updatedSvg;
	} catch (error) {
		console.error(`Error reading icon file: ${error.message}`);
		throw error;
	}
};

export const getPeepsMultiColorIcon = ({ iconName, iconSize }) => {
	try {
		const multicolorIconPath = path.resolve(
			__dirname,
			"../../assets/openPeepsSvgs/multicolor",
			`${sanitize(iconName)}.svg`,
		);
		const svgFile = fs.readFileSync(multicolorIconPath, "utf8");
		if (!svgFile) {
			throw new Error("Icon file not found");
		}
		const updatedSvg = svgFile
			.replace(/width="\d+"/g, `width="${iconSize}"`)
			.replace(/height="\d+"/g, `height="${iconSize}"`);

		return updatedSvg;
	} catch (error) {
		console.error(`Error reading icon file: ${error.message}`);
		throw error;
	}
};

const getPeepsMonochromaticIconPath = path.resolve(
	__dirname,
	"../../assets/openPeepsSvgs/monochromatic/",
);
const getPeepsMultiColorIconPath = path.resolve(
	__dirname,
	"../../assets/openPeepsSvgs/multicolor/",
);

let openPeepsSvgsCache;

async function loadSvgsFromDir(dirPath) {
	const files = await fs.promises.readdir(dirPath);

	return Promise.all(
		files
			.filter(f => f.endsWith(".svg"))
			.map(async file => ({
				name: path.basename(file, ".svg"),
				content: await fs.promises.readFile(path.join(dirPath, file), "utf-8"),
			})),
	);
}

export const getAllPeepsIcons = async () => {
	try {
		if (openPeepsSvgsCache && openPeepsSvgsCache?.monochromatic && openPeepsSvgsCache?.multicolor) return openPeepsSvgsCache;
		const [monochromaticSvgs, multicolorSvgs] = await Promise.all([
			loadSvgsFromDir(getPeepsMonochromaticIconPath),
			loadSvgsFromDir(getPeepsMultiColorIconPath),
		]);
		openPeepsSvgsCache = {
			monochromaticOpenPeepsSvgs: monochromaticSvgs,
			multicolorOpenPeepsSvgs: multicolorSvgs,
		};
		return openPeepsSvgsCache;
	} catch (error) {
		console.error(`Error reading Peeps icons: ${error.message}`);
		throw error;
	}
};

const getHumaaansIconPath = path.resolve(
	__dirname,
	"../../assets/humaaansSvgs/multicolor",
);

let openHumaaansSvgsCache;

export const getAllHumaaansIcons = async () => {
	try {
		if (openHumaaansSvgsCache) return openHumaaansSvgsCache;
		openHumaaansSvgsCache = await loadSvgsFromDir(getHumaaansIconPath);
		return openHumaaansSvgsCache;
	} catch (error) {
		console.error(`Error reading Humaaans icons: ${error.message}`);
		throw error;
	}
};

export const getHumaaansIcon = ({ iconName, iconSize }) => {
	try {
		const iconPath = path.resolve(
			__dirname,
			"../../assets/humaaansSvgs/multicolor",
			`${sanitize(iconName)}.svg`,
		);
		const svgFile = fs.readFileSync(iconPath, "utf8");
		if (!svgFile) {
			throw new Error("Icon file not found");
		}
		const updatedSvg = svgFile
			.replace(/width="\d+"/g, `width="${iconSize}"`)
			.replace(/height="\d+"/g, `height="${iconSize}"`);

		return updatedSvg;
	} catch (error) {
		console.error(`Error reading icon file: ${error.message}`);
		throw error;
	}
};
