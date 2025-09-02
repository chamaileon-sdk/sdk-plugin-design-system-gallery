import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import constants from "../utils/constants.js";

const {
	defaultColor,
	defaultStyle,
	defaultSize,
} = constants;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const sanitize = input => input.replace(/[^a-zA-Z0-9-_]/g, "");

export default function ({ name, style = defaultStyle, size = defaultSize, color = defaultColor }) {
	try {
		const iconPath = resolve(
			__dirname,
			"../../node_modules/@material-design-icons/svg",
			`${style}`,
			`${sanitize(name)}.svg`,
		);

		const svgFile = fs.readFileSync(iconPath, "utf8");
		if (!svgFile) {
			throw new Error("Icon file not found");
		}

		const updatedSvg = svgFile
			.replace(/width\s*=\s*["]\d+["]/g, `width="${size}"`)
			.replace(/height\s*=\s*["]\d+["]/g, `height="${size}"`)
			.replaceAll('<path d="', `<path fill="#${color}" d="`);

		return updatedSvg;
	} catch (error) {
		console.error(`Error reading icon file: ${error.message}`);
		throw error;
	}
}
