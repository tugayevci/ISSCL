import Coordinate from "./Coordinate";
import PeopleSpace from "./PeopleSpace";

export default class Data {
  issLocation: Coordinate | null;
  isIssApiError: boolean;
  userLocation: Coordinate | null;
  isUserLocationError: boolean;
  peopleOnSpace: PeopleSpace[];
  isPeopleSpaceError: boolean;
  // nextOverhead: number[];
  // isNextOverheadError: boolean;
  distanceMeter: number | null;
  isDistanceMeterError: boolean;
  isLocationPermissionGranted: boolean;
  constructor(x: Data) {
    this.issLocation = x.issLocation;
    this.isIssApiError = x.isIssApiError;
    this.userLocation = x.userLocation;
    this.isUserLocationError = x.isUserLocationError;
    this.peopleOnSpace = x.peopleOnSpace;
    this.isPeopleSpaceError = x.isPeopleSpaceError;
    // this.nextOverhead = x.nextOverhead;
    // this.isNextOverheadError = x.isNextOverheadError;
    this.distanceMeter = x.distanceMeter;
    this.isDistanceMeterError = x.isDistanceMeterError;
    this.isLocationPermissionGranted = x.isLocationPermissionGranted;
  }
}
