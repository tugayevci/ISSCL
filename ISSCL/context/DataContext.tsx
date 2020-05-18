import React, { createContext } from "react";
import Coordinate from "../models/Coordinate";
import Data from "../models/Data";

export const DataContext = createContext(
  new Data({
    userLocation: new Coordinate({ Latitude: 0, Longitude: 0 }),
    issLocation: new Coordinate({ Latitude: 0, Longitude: 0 }),
    distanceMeter: 0,
  })
);
