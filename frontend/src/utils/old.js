
// useEffect(() => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const userLocation = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         };
//         // findUrgentCareAndQuery(userLocation, "Angeles Urgent Care").then(setWebsite).catch(console.error);
// findUrgentCare(userLocation).then(setWebList).then(setWebsite, console.log()).catch(console.error);
// findUrgentCare(userLocation)
//   .then((website) => {
//     setWebList(website);
//     console.log(website);
//   })
//   .catch(console.error);




//         // setiframeSrc(`${baseUrl}?embed=true&user_token=${user.uid}&phone=${user.phoneNumber}&email=${user.email}&name=${user.displayName}&datetime=${currentDateTime}&latlocation=${userLocation.lat}&lnglocation=${userLocation.lng}`);
//       },
//       (error) => {
//         console.error("Error Code = " + error.code + " - " + error.message);
//       }
//     );
//   } else {
//     alert("Geolocation must be turned on");
//   }
// }, []);

// useEffect(() => {
//   getCurrentLocation(handleSuccess, handleError);
// }, []);

// useEffect(() => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const userLocation = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         };
//         setLocation(userLocation);
//         // console.log(userLocation);
//         // Here you can also call a function to store the location in Firebase
//       },
//       (error) => {
//         console.error("Error Code = " + error.code + " - " + error.message);
//       }
//     );
//   } else {
//     alert("Geolocation is not supported by this browser.");
//   }
// }, []);

// Directly create the current date and time string during render


// const iframeSrc = `${baseUrl}?embed=true&user_token=${user.uid}&phone=${user.phoneNumber}&email=${user.email}&name=${user.displayName}&datetime=${currentDateTime}&location=${currentDateTime}`;