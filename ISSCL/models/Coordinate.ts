export default class Coordinate {
  Latitude: number;
  Longitude: number;

  constructor(x: Coordinate) {
    this.Latitude = x.Latitude;
    this.Longitude = x.Longitude;
  }
}
