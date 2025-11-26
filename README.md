# sdk-plugin-design-system-gallery

## External Elements APIs

External elements Icons and Social Media Embed APIs are available as separate packages. Both APIs uses sharp npm package to create a png buffer response. This repo is about the Icons APIs. For Social Media Embed APIs, please check [here](https://github.com/chamaileon-sdk/sdk-plugin-social-embed).

### Icons APIs
The Icons APIs provide endpoints to fetch and render various SVG-based icons as PNG images. It supports Material Design Icons, Open Peeps, and Humaaans icon sets.

Each route dynamically generates and serves the requested icon with customizable style, size, and color parameters. Each request returns a PNG image buffer and each change creates a new response and a new image buffer.

#### API Endpoints
Currently, the icons APIs consist of 5 different endpoints:

Single icon endpoints:
- `/mdiIcons/:iconStyle/:iconName/:iconSize/:iconColor.png`
- `/openPeepsIcons/:iconStyle/:iconName/:iconSize/:iconColor.png`
- `/humaaans/:iconStyle/:iconName/:iconSize/:iconColor.png`

Batch icon endpoints:
- `/openPeepsIcons/svgs`
- `/humaaans/svgs`

For single icon API endpoints, the parameters are as follows:
- `iconStyle`: The style of the icon (e.g., 'filled', 'outlined', 'rounded', 'two-tone', 'sharp' for Material Design Icons).
- `iconName`: The specific name of the icon to fetch.
- `iconSize`: The desired size of the icon in pixels.
- `iconColor`: The color of the icon in HEX format (without the # prefix). 

For Open Peeps endpoints when the iconStyle is "monochromatic" and for Humaans endpoints, the iconColor parameter is ignored as the APIs currently do not support color customization for those.

OpenPeeps and Humaans batch endpoints can be used to display all available icons on the application, where the received SVGs can be rendered on the client side.
For batch endpoints, you can send a GET request to the endpoints and they will return with an array of icon svg objects.

#### Example APIs:

Request for single icon endpoints:
```js
GET ${baseUrl}/mdiIcons/filled/home/64/FF5733.png
```

Response from single icon endpoints:
```js
sharp(Buffer.from(iconSvg)).png().pipe(res):
```

Request for batch icon endpoints:
```js
GET ${baseUrl}/openPeepsIcons/svgs
GET ${baseUrl}/humaaans/svgs
```

Response of openPeeps batch end point:
```js
{
	"monochromatic": [
		{
			"name": "open-peeps-1",
			"content": "<svg ...><...></svg>"
		},
		{
			"name": "open-peeps-2",
			"content": "<svg ...>...</svg>"
		}
	],
	"multicolor": [
		{
			"name": "open-peeps-3",
			"content": "<svg ...>...</svg>"
		},
		{
			"name": "open-peeps-4",
			"content": "<svg ...>...</svg>"
		}
	]
}
```

Response of humaaans batch end point:
```js
[
	{
		"name": "humaaans-1",
		"content": "<svg ...><...></svg>"
	},
	{
		"name": "humaaans-2",
		"content": "<svg ...>...</svg>"
	}
]
```

For more details about how to use these APIs, please refer to the documentation [here](https://chamaileon.io/sdk/v2/docs/email-editor/#icons-apis).

For example implementation and testing of these APIs, please check the [sdk-playground](https://sdk-playground.chamaileon.io/emaileditor#external-elements).
