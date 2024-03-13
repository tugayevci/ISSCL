import React, { createContext } from "react";
import Coordinate from "../models/Coordinate";
import Data from "../models/Data";

const DataContext = createContext({
  data: new Data({
    issLocation: null,
    isIssApiError: false,
    userLocation: null,
    isUserLocationError: false,
    peopleOnSpace: [],
    isPeopleSpaceError: false,
    // nextOverhead: [],
    // isNextOverheadError: false,
    distanceMeter: null,
    isDistanceMeterError: false,
    isLocationPermissionGranted: false,
  }),
  getPermissionForLocation: new Function(),
});

export default DataContext;
