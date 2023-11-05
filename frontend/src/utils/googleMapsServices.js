// utils/googleMapsServices.js

import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  version: "weekly",
  libraries: ["places"]
});

// const api_key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

// export const findUrgentCare = async (location, searchTerm) => {
//   await loader.importLibrary("places");

//   const map = new google.maps.Map(document.createElement("div"), {
//     center: location,
//   });

//   const service = new google.maps.places.PlacesService(map);
//   return new Promise((resolve, reject) => {
//     service.nearbySearch(
//       {
//         location,
//         radius: 5000, // Search within 5km radius
//         keyword: searchTerm,
//         type: ['hospital', 'health'], // Adjust types as necessary
//       },
//       (results, status) => {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//           resolve(results);
//         } else {
//           reject(status);
//         }
//       }
//     );
//   });
// };

export const findUrgentCare = async (location, searchTerm = "urgent care") => {
  await loader.importLibrary("places");
  await loader.importLibrary("geometry");
  await loader.importLibrary("geometry");

  const map = new google.maps.Map(document.createElement("div"), {
    center: location,
  });

  const service = new google.maps.places.PlacesService(map);

  return new Promise((resolve, reject) => {
    service.nearbySearch(
      {
        location,
        radius: 5000, // Assuming a 5km radius
        keyword: searchTerm,
        type: ['hospital', 'health'],
      },
      async (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const placesDetailsPromises = results.map(place => {
            const request = {
              placeId: place.place_id,
              fields: ['name', 'website', 'opening_hours', 'geometry']
            };
            return new Promise((resolveDetails, rejectDetails) => {
              service.getDetails(request, (details, statusDetails) => {
                if (statusDetails === google.maps.places.PlacesServiceStatus.OK) {
                  const distance = google.maps.geometry.spherical.computeDistanceBetween(
                    new google.maps.LatLng(location.lat, location.lng),
                    details.geometry.location
                  );
                  resolveDetails({
                    name: details.name,
                    website: details.website,
                    isOpen: details.opening_hours?.isOpen || false,
                    distance: distance // Distance in meters
                  });
                } else {
                  rejectDetails('Place details request failed: ' + statusDetails);
                }
              });
            });
          });

          try {
            // Wait for all the details to be fetched
            const placesWithDetails = await Promise.all(placesDetailsPromises);
            resolve(placesWithDetails);
          } catch (error) {
            reject('Failed to fetch place details: ' + error);
          }
        } else {
          reject('Nearby search request failed: ' + status);
        }
      }
    );
  });
};


// export const findUrgentCare = async (location, searchTerm = "urgent care") => {
//   await loader.importLibrary("places");

//   const map = new google.maps.Map(document.createElement("div"), {
//     center: location,
//   });

//   const service = new google.maps.places.PlacesService(map);

//   return new Promise((resolve, reject) => {
//     service.nearbySearch(
//       {
//         location,
//         radius: 500000, // Search within 5km radius
//         keyword: searchTerm, // You can refine this search term
//         type: ['hospital', 'health'],
//         // Do not filter by openNow in the search, to get all places
//       },
//       (results, status) => {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//           // const placesWithDistance = results.map((place) => {
//           //   const distance = google.maps.geometry.spherical.computeDistanceBetween(
//           //     new google.maps.LatLng(location.lat, location.lng),
//           //     place.geometry.location
//           //   );
//           // Process the results to add the isOpen property
//           const processedResults = results.map(place => {
//             return {
//               name: place.name,
//               website: place.website,
//               isOpen: place.opening_hours?.open_now || false // If opening_hours is undefined or open_now is false, isOpen will be false
//               // distance: distance
//             };
//           });
//           resolve(processedResults); // Resolve with the processed results
//         } else {
//           reject('Nearby search request failed: ' + status);
//         }
//       }
//     );
//   });
// };




export const findUrgentCareAndQuery = async (location, searchTerm) => {
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
