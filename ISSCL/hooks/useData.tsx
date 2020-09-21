import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

import Coordinate from "../models/Coordinate";
import PeopleSpace from "../models/PeopleSpace";
import Data from "../models/Data";

const useData = (): any => {
  const [issLocation, setIssLocation] = useState<Coordinate | null>(null);
  const [isIssApiError, setIsIssApiError] = useState(false);

  const [userLocation, setUserLocation] = useState<Coordinate | null>(null);
  const [isUserLocationError, setIsUserLocationError] = useState(false);

  const [peopleOnSpace, setPeopleOnSpace] = useState<PeopleSpace[]>([]);
  const [isPeopleSpaceError, setIsPeopleSpaceError] = useState(false);

  const [nextOverhead, setNextOverhead] = useState<number[]>([]);
  const [isNextOverheadError, setIsNextOverheadError] = useState(false);

  const [distanceMeter, setDistanceMeter] = useState<number | null>(null);
  const [isDistanceMeterError, setIsDistanceMeterError] = useState(false);

  const [isLocationPermissionGranted, setIsLocationPermissionGranted] = useState(false);

  const getIssLocation = async () => {
    try {
      let data = await fetch("http://api.open-notify.org/iss-now.json");
      let json = await data.json();
      if (json && json.message === "success") {
        const coordinate = new Coordinate({
          Latitude: parseFloat(json.iss_position.latitude),
          Longitude: parseFloat(json.iss_position.longitude),
        });
        setIssLocation(coordinate);
      } else {
        setIsIssApiError(true);
      }
    } catch (error) {
      setIsIssApiError(true);
    }
  };

  const getUserLocation = async () => {
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setIsUserLocationError(true);
      }
      let location = await Location.getCurrentPositionAsync({});

      if (location) {
        setIsLocationPermissionGranted(true)
        const coordinate = new Coordinate({
          Latitude: location.coords.latitude,
          Longitude: location.coords.longitude,
        });
        setUserLocation(coordinate);
      } else {
        setIsUserLocationError(true);
      }
    } catch (error) {
      setIsUserLocationError(true);
    }
  };

  const getPeopleOnSpace = async () => {
    try {
      let data = await fetch("http://api.open-notify.org/astros.json");
      let json = await data.json();

      if (json && json.message === "success") {
        const peoples = json.people.map((x: any) => new PeopleSpace({ craft: x.craft, name: x.name }));
        setPeopleOnSpace(peoples);
      } else {
        setIsPeopleSpaceError(true);
      }
    } catch (error) {
      setIsPeopleSpaceError(true);
    }
  };

  const getNextOverhead = async (latitude: number, longitude: number) => {
    try {
      let data = await fetch(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}&n=5`);
      let json = await data.json();

      if (json && json.message === "success") {
        const overheads = json.response.map((x: any) => x.risetime * 1000);
        
        setNextOverhead(overheads);
      } else {
        setIsNextOverheadError(true);
      }
    } catch (error) {
      setIsNextOverheadError(true);
    }
  };

  const getDistance = (userLocation: Coordinate, issLocation: Coordinate) => {
    try {
      const lat1 = issLocation.Latitude;
      const lon1 = issLocation.Longitude;
      const lat2 = userLocation.Latitude;
      const lon2 = userLocation.Longitude;

      const R = 6371e3; // metres
      const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
      const φ2 = (lat2 * Math.PI) / 180;
      const Δφ = ((lat2 - lat1) * Math.PI) / 180;
      const Δλ = ((lon2 - lon1) * Math.PI) / 180;
      const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c; // in metres
      const dFixed = parseInt(d.toFixed(0));

      return dFixed;
    } catch (error) {
      setIsDistanceMeterError(true);
      return null
    }
  };

  const getPermissionForLocation = async () => {    
    try {
      let status = await Location.requestPermissionsAsync();
      if (status.granted) {
        setIsLocationPermissionGranted(true);
        setIsUserLocationError(false);
        setIsNextOverheadError(false);
        setIsDistanceMeterError(false);
      } else {
        setIsLocationPermissionGranted(false);
        setIsUserLocationError(true);
        setIsNextOverheadError(true);
        setIsDistanceMeterError(true);
      }
    } catch (error) {
      console.log("error",error);
      
      setIsLocationPermissionGranted(false);
      setIsUserLocationError(true);
      setIsNextOverheadError(true);
      setIsDistanceMeterError(true);
    }
  };

  useEffect(() => {
    startSetInterval(getIssLocation, 6000);
    startSetInterval(getPeopleOnSpace, 20000);
    
    getUserLocation().then(_ => {
      if(isLocationPermissionGranted && !isUserLocationError) startSetInterval(getUserLocation, 5000);
    })

  }, []);

  useEffect(() => {
    if (userLocation && issLocation) setDistanceMeter(getDistance(userLocation, issLocation))
  }, [userLocation, issLocation]);

  useEffect(() => {
    if (userLocation && nextOverhead.length === 0) getNextOverhead(userLocation.Latitude, userLocation.Longitude);
  }, [userLocation]);

  useEffect(() => {
    isLocationPermissionGranted && getUserLocation();
  }, [isLocationPermissionGranted]);

  return [
    new Data({
      issLocation,
      isIssApiError,
      userLocation,
      isUserLocationError,
      peopleOnSpace,
      isPeopleSpaceError,
      nextOverhead,
      isNextOverheadError,
      distanceMeter,
      isDistanceMeterError,
      isLocationPermissionGranted,
    }),
    getPermissionForLocation,
  ];
};

export default useData;

function startSetInterval(func: Function, ms: number) {
  noDelaySetInterval(func, ms);
}

function noDelaySetInterval(func: Function, ms: number) {
  func();
  return setInterval(func, ms);
}
