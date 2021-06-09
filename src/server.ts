import * as express from 'express';
import * as ejs from 'ejs';
import { DateTime } from 'luxon';
import { EOL } from 'os';
import { DEFAULT_PORT } from './constants';
import zipToLatLong from './apis/nominatim';
import Nws from './models/nws';

// TODO: Check for zip code as process enviroment

class WeatherApp {
  public app: express.Application;

  public latitudeLongitude: LatLong;

  public nwsWeather: Nws;

  readonly PORT: number = parseInt(process.env.BIND_PORT, 10) || DEFAULT_PORT;

  readonly ZIP_CODE: number = parseInt(process.env.ZIP_CODE, 10);

  readonly EMAIL: string = process.env.EMAIL;

  /**
   * Constructor
   */
  constructor() {
    this.app = express();
    this.initializeWeather();
  }

  /**
   * Initialize weather app
   */
  private async initializeWeather() {
    this.latitudeLongitude = await zipToLatLong(this.ZIP_CODE);
    this.nwsWeather = new Nws(this.latitudeLongitude);
  }

  /**
   * Listen
   */
  public listen() {
    this.app.listen(this.PORT, () => {
      /* eslint-disable-next-line no-console */
      console.log(`App listening on the port ${this.PORT}`);
    });
  }

  public initializeServer() {
    const indexHtmlPath = `${__dirname}/templates/index.html`;

    // Static assets (images, CSS)
    this.app.use(express.static(`${__dirname}/static`));

    this.app.get('/', (req: express.Request, res: express.Response): void => {
      this.nwsWeather.updateForecast().then((data: any) => {
        ejs.renderFile(indexHtmlPath, { data, DateTime }, {}).then((x) => res.send(x));
      });
    });
  }
}

// Verify the zip code is five digits in length
if (String(process.env.ZIP_CODE).length !== 5) {
  throw new Error([
    'Must provide ZIP_CODE environment variable.',
    'ZIP_CODE must be 5 digits in length.',
  ].join(EOL));
  process.exit(1);
}

// Check email
if (!process.env.EMAIL) {
  throw new Error([
    'Must provide EMAIL environment variable.',
    'NWS API requires a non-validated API key to prevent abuse, your email address is preferred.',
  ].join(EOL));
  process.exit(2);
}

// Initialize Weather App
const nwsWeatherApp = new WeatherApp();

nwsWeatherApp.initializeServer();
nwsWeatherApp.listen();
