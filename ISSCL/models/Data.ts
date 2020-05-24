import Coordinate from "./Coordinate";

export default class Data {
  userLocation: Coordinate;
  issLocation: Coordinate;
  distanceMeter: number;
  distanceKm?: number;
  isLocationPermissionError?: boolean;
  isApiError?: boolean;
  peopleOnIss?: string[];
  constructor(x: Data) {
    this.userLocation = x.userLocation;
    this.issLocation = x.issLocation;
    this.isLocationPermissionError = x.isLocationPermissionError;
    this.isApiError = x.isApiError;
    this.distanceMeter = x.distanceMeter;
    this.distanceKm = x.distanceMeter / 1000;
    this.peopleOnIss = x.peopleOnIss;
  }
}
