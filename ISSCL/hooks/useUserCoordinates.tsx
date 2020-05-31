import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import Coordinate from "../models/Coordinate";

export default function useUserCoordinates(): [Coordinate, Function] {
  const [userLocation, setUserLocation] = useState<Coordinate>(new Coordinate({ Latitude: 0, Longitude: 0 }));

  useEffect(() => {
    setInterval(async () => {
      try {
        let { status } = await Location.requestPermissionsAsync();
        let location = await Location.getCurrentPositionAsync({});
        const coordinate = new Coordinate({
          Latitude: location.coords.latitude,
          Longitude: location.coords.longitude,
        });
        setUserLocation(coordinate);
      } catch (error) {}
    }, 5000);
  });

  return [userLocation, setUserLocation];
}
