// cSpell: words Gridpoint nominatim
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { differenceInMinutes } from 'date-fns';

import zipToLatLong from 'apis/nominatim.js';
import {
  getPoints,
  getStationInfo,
} from 'apis/weatherGov.js';

import type {
  IGridPoint,
  ILatLong,
  ILocationRecord,
  ZipLocationRecords,
} from 'types/location.js';

type ObservationStation = Components.Schemas.ObservationStation;

const DIR_NAME = path.dirname(fileURLToPath(import.meta.url));

const REQUEST_LIMIT_IN_MINUTES = 1;
const LOCATIONS_JSON_FILE = `${DIR_NAME}/locations.json`;

class Location {
  zipCode: string;

  lastRequested = 0;

  latitudeLongitude: ILatLong | undefined;

  gridPointData: IGridPoint | undefined;

  stationData: ObservationStation | undefined;

  constructor(zipCode: string) {
    this.zipCode = zipCode;
    const existingLocations = this.readJsonStore();

    // reload stored location data
    if (existingLocations[zipCode] && process.env['FORCE_LOCATION_RELOAD'] !== 'true') {
      this.latitudeLongitude = existingLocations[zipCode].latitudeLongitude;
      this.gridPointData = existingLocations[zipCode].gridPointData;
      this.stationData = existingLocations[zipCode].stationData;
    }

    this.determineNWSLocation();
  }

  async determineNWSLocation(): Promise<ILocationRecord | null> {
    // Do not re-request the data if it exists.
    if (this.latitudeLongitude && this.gridPointData && this.stationData) {
      return {
        latitudeLongitude: this.latitudeLongitude,
        gridPointData: this.gridPointData,
        stationData: this.stationData,
      };
    }

    // Do not request the same information more than once in a span.
    if (differenceInMinutes(Date.now(), new Date(this.lastRequested)) < REQUEST_LIMIT_IN_MINUTES) {
      return Promise.reject();
    }

    this.lastRequested = Date.now();
    this.latitudeLongitude ??= await zipToLatLong(this.zipCode);

    if (this.latitudeLongitude && !this.gridPointData) {
      this.gridPointData = await getPoints(this.latitudeLongitude);
    }

    if (this.latitudeLongitude && this.gridPointData && !this.stationData) {
      this.stationData = await getStationInfo(this.gridPointData);
    }

    if (this.latitudeLongitude && this.gridPointData && this.stationData) {
      this.writeJsonStore();
    }

    if (this.latitudeLongitude && this.gridPointData && this.stationData) {
      return {
        latitudeLongitude: this.latitudeLongitude,
        gridPointData: this.gridPointData,
        stationData: this.stationData,
      };
    }

    return Promise.reject();
  }

  get locationName(): string {
    return this.stationData?.name ?? '';
  }

  get gridPoints(): IGridPoint | undefined {
    return this.gridPointData;
  }

  get stationIdentifier(): string | undefined {
    return this.stationData?.stationIdentifier;
  }

  get timeZone(): string | undefined {
    return this.stationData?.timeZone;
  }

  // eslint-disable-next-line class-methods-use-this
  private readJsonStore(): ZipLocationRecords {
    // eslint-disable-next-line n/no-sync
    const locationJsonString: string = fs.readFileSync(LOCATIONS_JSON_FILE).toString();
    return JSON.parse(locationJsonString) as ZipLocationRecords;
  }

  private writeJsonStore() {
    const existingLocations = this.readJsonStore();

    fs.promises.writeFile(LOCATIONS_JSON_FILE, JSON.stringify({
      ...existingLocations,
      [this.zipCode]: {
        latitudeLongitude: this.latitudeLongitude,
        gridPointData: this.gridPointData,
        stationData: this.stationData,
      },
    }));
  }
}

export default Location;
