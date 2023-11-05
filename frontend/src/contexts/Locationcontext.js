"use client"

import { createContext, useState, useEffect, useContext } from 'react';

export const LocationContext = createContext();

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);

  const saveLocation = (position) => {
    const userLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    localStorage.setItem('userLocation', JSON.stringify(userLocation));
    setLocation(userLocation);
  };

  useEffect(() => {
    // Attempt to retrieve the location from localStorage
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      setLocation(JSON.parse(savedLocation));
    } else if (navigator.geolocation) {
      // Only ask for the geolocation if it wasn't found in localStorage
      navigator.geolocation.getCurrentPosition(saveLocation, (error) => {
        console.error("Error getting location:", error);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
};
