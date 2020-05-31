import Coordinate from "./Coordinate";

export default class Data {
  userLocation: Coordinate | undefined;
  issLocation: Coordinate | undefined;
  distanceMeter: number;
  distanceKm?: number;
  isLocationPermissionError?: boolean;
  isApiError?: boolean;
  peopleOnIss?: any[];
  nextOverhead?: number[];
  constructor(x: Data) {
    this.userLocation = x.userLocation;
    this.issLocation = x.issLocation;
    this.isLocationPermissionError = x.isLocationPermissionError;
    this.isApiError = x.isApiError;
    this.distanceMeter = x.distanceMeter;
    this.distanceKm = x.distanceMeter / 1000;
    this.peopleOnIss = x.peopleOnIss;
    this.nextOverhead = x.nextOverhead;
  }
}
