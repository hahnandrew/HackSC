// utils/googleMapsServices.js

import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  version: "weekly",
  libraries: ["places"]
});

// const api_key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

export const findUrgentCare = async (location, searchTerm) => {
  await loader.importLibrary("places");

  const map = new google.maps.Map(document.createElement("div"), {
    center: location,
  });

  const service = new google.maps.places.PlacesService(map);
  return new Promise((resolve, reject) => {
    service.nearbySearch(
      {
        location,
        radius: 5000, // Search within 5km radius
        keyword: searchTerm,
        type: ['hospital', 'health'], // Adjust types as necessary
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }
      }
    );
  });
};


export const findUrgentCareAndWebsite = async (location, searchTerm) => {
  await loader.importLibrary("places");

  // console.log("api_key", api_key)

  const map = new google.maps.Map(document.createElement("div"), {
    center: location,
  });

  const service = new google.maps.places.PlacesService(map);

  return new Promise((resolve, reject) => {
    service.nearbySearch(
      {
        location,
        radius: 5000, // Search within 5km radius
        keyword: searchTerm,
        type: ['hospital', 'health'], // Adjust types as necessary
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results[0]) {
          // Using the place_id of the first result to get more details
          service.getDetails({
            placeId: results[0].place_id,
            fields: ['name', 'website'] // Specify the fields you want to get; include others as needed
          }, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              resolve(place.website); // Resolving the promise with the website URL
            } else {
              reject('Place details request failed: ' + status);
            }
          });
        } else {
          reject('Nearby search request failed: ' + status);
        }
      }
    );
  });
};
