import { useEffect, useState } from 'react';
import { findUrgentCareAndWebsite } from "./googleMapsServices"

export const getCurrentLocation = (successCallback, errorCallback) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};

// export default function LocationComp() {
//   const [location, setLocation] = useState(null);
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const userLocation = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };
//           setLocation(userLocation);
//           // console.log(userLocation);
//           // Here you can also call a function to store the location in Firebase
//         },
//         (error) => {
//           console.error("Error Code = " + error.code + " - " + error.message);
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   }, []);
// }

// export default function WebsiteComponent() {
//   // const [location, setLocation] = useState(null);
//   const [website, setWebsite] = useState(null);


//   useEffect(() => {
//     if (location) {
//       findUrgentCareAndWebsite(location, "Angeles Urgent Care").then(setWebsite).catch(console.error);
//     }
//   }, [location]);


//   // The rest of your component
//   return (
//     <div>
//       {location && (
//         <p>
//           Urgent Care Website: {website}
//         </p>
//       )}
//     </div>
//   );
// }
