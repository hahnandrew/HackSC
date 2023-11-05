"use client"

// import React, { useState, useEffect } from 'react';
// import { BeatLoader } from 'react-spinners';
// import ReactTooltip from 'react-tooltip';
// import AsyncSelect from 'react-select/async';


// const Search = ({ hospitalOptions }) => {
//   const [selectedOption, setSelectedOption] = useState(null);


//   useEffect(() => {
//     if (selectedOption) {
//       // Handle what happens when selected
//     }
//   }, [selectedOption]);

//   const getHospitalOptions = () => {
//     const options = [];
//     if (hospitalOptions) {
//       Object.keys(hospitalOptions).forEach((key) => {
//         const hospital = hospitalOptions[key];
//         const { name, website, distance, isOpen } = hospital;
//         options.push({ value: { website, distance, isOpen }, label: name });
//       });
//     }
//     return options;
//   };

//   const hospitalList = getHospitalOptions();

//   const filterOptions = (inputValue) =>
//     hospitalList.filter((i) =>
//       i.label.toLowerCase().includes(inputValue.toLowerCase())
//     );

//   const promiseOptions = (inputValue) =>
//     new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(filterOptions(inputValue));
//       }, 1000);
//     });

//   const customStyles = {
//     // Other styles if needed...

//     // Custom style for each option
//     option: (provided, state) => {
//       // Determine if the option is 'closed' by checking the isOpen property in value
//       const isClosed = !state.data.value.isOpen;

//       // Return custom styles based on the isOpen status
//       return {
//         ...provided,
//         color: isClosed ? '#ccc' : provided.color, // Grey out text if closed
//         backgroundColor: isClosed ? 'inherit' : provided.backgroundColor, // Keep background if closed
//         cursor: isClosed ? 'not-allowed' : 'default', // Change cursor for closed options
//         // Any other style modifications you want based on isOpen status
//       };
//     },

//     // Other styles if needed...
//   };


//   return (
//     <AsyncSelect
//       cacheOptions
//       defaultOptions
//       loadOptions={promiseOptions}
//       // components={{ LoadingIndicator }}
//       placeholder="Search Urgent Care By Name"
//       onChange={(newValue) => setSelectedOption(newValue)}
//       styles={customStyles}
//       value={selectedOption}
//     />
//   );
// };

// export default Search
// Removed "useState" and "useEffect" since they are no longer used here
import React from 'react';
import AsyncSelect from 'react-select/async';

const Search = ({ hospitalOptions, selectedOption, setSelectedOption, customStyles }) => {

  const getHospitalOptions = () => {
    const options = [];
    if (hospitalOptions) {
      Object.keys(hospitalOptions).forEach((key) => {
        const hospital = hospitalOptions[key];
        const { name, website, distance, isOpen } = hospital;
        const distanceInKm = (distance / 1000).toFixed(2); // Convert to km and round to two decimals
        const distanceStr = `${distanceInKm} km`; // Distance as a string with 'km'
        const labelWithDistance = `${name} - ${distanceStr}`; // Name with distance appended
        options.push({ value: { website, distance, isOpen }, label: labelWithDistance });
      });

      // Now sort the options array based on the distance property
      options.sort((a, b) => {
        return a.value.distance - b.value.distance; // Ascending order
      });
    }
    return options;
  };



  const hospitalList = getHospitalOptions();

  const filterOptions = (inputValue) =>
    hospitalList.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );

  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterOptions(inputValue));
      }, 1000);
    });

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={promiseOptions}
      placeholder="Search Urgent Care By Name"
      onChange={setSelectedOption} // Directly use the handler passed from parent component
      styles={customStyles}
      value={selectedOption}
    />
  );
};

export default Search;
