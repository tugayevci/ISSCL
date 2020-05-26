import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import Coordinate from "../models/Coordinate";
import Data from "../models/Data";

export default function useData(): Data {
  const [userLocation, setUserLocation] = useState<Coordinate>(new Coordinate({ Latitude: 0, Longitude: 0 }));
  const [issLocation, setIssLocation] = useState<Coordinate>(new Coordinate({ Latitude: 0, Longitude: 0 }));
  const [distanceMeter, setDistanceMeter] = useState<number>(0);
  const [peopleOnIss, setPeopleOnIss] = useState<string[]>([]);
  const [nextOverhead, setNextOverhead] = useState(1590338576 * 1000);
  const [isLocationPermissionError, setIsLocationPermissionError] = useState(false);
  const [isApiError, setIsApiError] = useState(false);

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
        setIsApiError(true);
      }
    } catch (error) {
      setIsApiError(true);
    }
  };

  const getUserLocation = async () => {
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setIsLocationPermissionError(true);
      }
      let location = await Location.getCurrentPositionAsync({});

      const coordinate = new Coordinate({
        Latitude: location.coords.latitude,
        Longitude: location.coords.longitude,
      });
      setUserLocation(coordinate);
    } catch (error) {
      setIsLocationPermissionError(true);
    }
  };

  const getPeopleOnIss = async () => {
    try {
      let data = await fetch("http://api.open-notify.org/astros.json");
      let json = await data.json();

      if (json && json.message === "success") {
        const peoples = json.people.map((x: any) => x.craft === "ISS" && x.name);
        setPeopleOnIss(peoples);
        console.log("data", json);
      } else {
        setIsApiError(true);
      }
    } catch (error) {
      setIsApiError(true);
    }
  };

  const getNextOverhead = async () => {
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setIsLocationPermissionError(true);
      }
      let location = await Location.getCurrentPositionAsync({});

      let data = await fetch(
        `http://api.open-notify.org/iss-pass.json?lat=${location.coords.latitude}&lon=${location.coords.longitude}&n=1`
      );
      let json = await data.json();

      if (json && json.message === "success") {
        setNextOverhead(json.response[0].risetime * 1000);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getIssLocation();
    getUserLocation();
    getPeopleOnIss();
    getNextOverhead();
    setInterval(async () => {
      getIssLocation();
    }, 6000);

    setInterval(async () => {
      getUserLocation();
    }, 5000);
  }, []);

  useEffect(() => {
    if (!userLocation || !issLocation) return;

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

    setDistanceMeter(dFixed);
  });

  return new Data({
    userLocation,
    issLocation,
    distanceMeter,
    isLocationPermissionError,
    isApiError,
    peopleOnIss,
    nextOverhead,
  });
}
