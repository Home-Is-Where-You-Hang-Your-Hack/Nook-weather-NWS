// cSpell: words nominatim
import { EOL } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { format } from 'date-fns';
import 'dotenv/config';
import ejs from 'ejs';
import express from 'express';

import Nws from 'models/nws.js';

import type { ITemplateData } from 'types/weather.js';

const rootDirname = path.dirname(fileURLToPath(import.meta.url));

const PORT: number = parseInt(process.env['BIND_PORT'] ?? '3099', 10);
const ZIP_CODE: string = process.env['ZIP_CODE'] ?? '';

// Verify the zip code is five digits in length
if (!/^\d{5}$/.test(ZIP_CODE)) {
  throw new Error([
    'Must provide ZIP_CODE environment variable.',
    'ZIP_CODE must be 5 digits in length.',
  ].join(EOL));
}

// Verify the zip code is not the default
if (ZIP_CODE === '00000') {
  throw new Error([
    'Must provide ZIP_CODE environment variable.',
    '"00000" is not a ZIP_CODE.',
  ].join(EOL));
}

// Check email
if (!process.env['EMAIL']) {
  throw new Error([
    'Must provide EMAIL environment variable.',
    'NWS API requires a non-validated API key to prevent abuse, your email address is preferred.',
  ].join(EOL));
}

const nwsWeather = new Nws(ZIP_CODE);

// Initialize Weather App
const app = express();

// Static assets (images, CSS)
app.use(express.static(path.resolve(rootDirname, './static')));

const indexHtmlPath = path.resolve(rootDirname, './templates/index.html');
app.get('/', (_, res: express.Response): void => {
  nwsWeather.updateForecast().then((data: ITemplateData) => {
    ejs.renderFile(indexHtmlPath, { data, format }, {}).then((x) => res.send(x));
  });
});

// Start HTTP Server
app.listen(PORT, () => {
  /* eslint-disable-next-line no-console */
  console.log(`App listening on the port ${PORT}`);
});
