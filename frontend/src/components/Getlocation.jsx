import { useEffect, useState } from 'react';
import { findUrgentCareAndWebsite } from "../utils/googleMapsServices"

export default function LocationComponent() {
  const [location, setLocation] = useState(null);
  const [website, setWebsite] = useState(null);

  useEffect(() => {
    console.log(website)
  }, [website]);

  useEffect(() => {
    console.log(location)
    // console.log(location.latitude, location.longitude)
  }, [location]);

  useEffect(() => {
    if (location) {
      // console.log("location", location)
      findUrgentCareAndWebsite(location, "Angeles Urgent Care").then(setWebsite).catch(console.error);
      // findUrgentCareAndWebsite(location, "Angeles Urgent Care")
      //   .then((result) => {
      //     console.log("findUrgentCareAndWebsite(location)")
      //     console.log("findUrgentCareAndWebsite(location)", result);
      //   })
      //   .catch((error) => {
      //     console.error('An error occurred:', error);
      //   });

      // console.log("website", website)
    }
  }, [location]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(userLocation);
          // console.log(userLocation);
          // Here you can also call a function to store the location in Firebase
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  // The rest of your component
  return (
    <div>
      {location && (
        <p>
          Latitude: {location.lat} <br />
          Longitude: {location.lng}<br />
          Urgent Care Website: {website}
        </p>
      )}
    </div>
  );
}
