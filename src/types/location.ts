export interface ILatLong {
  latitude: string;
  longitude: string;
}

export interface IGridPoint {
  gridId: string;
  gridX: number;
  gridY: number;
}

export interface ILocationRecord {
  latitudeLongitude: ILatLong;
  gridPointData: IGridPoint;
  stationData: Components.Schemas.ObservationStation;
}

export type ZipLocationRecords = Record<string, ILocationRecord>;
