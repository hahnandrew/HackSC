"use client";
import React from 'react';
import { useEffect, useState } from 'react';
import { useAuth } from "../contexts/Authcontext";
import { useLocation } from "../contexts/Locationcontext";
import { findUrgentCareAndQuery, findUrgentCare } from "../utils/googleMapsServices"
import Search from "../components/Searchhospital"


function PageComponent(hospital) {
  const [webList, setWebList] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOptionSelected, setIsOptionSelected] = useState(false);


  const handleSelection = (option) => {
    setSelectedOption(option);
    setIsOptionSelected(true); // Set true when an option is selected
  };

  const isDeployedString = process.env.NEXT_PUBLIC_IS_DEPLOYED;
  const isDeployed = isDeployedString === 'True';
  const baseUrl = isDeployed
    ? "https://hacksc-fgg6nccbxyuqmxm4ceujpz.streamlit.app"
    : "http://localhost:8501";

  const location = useLocation()

  const currentDateTime = encodeURIComponent(new Date().toLocaleString());
  const { user } = useAuth();

  const iframe = `${baseUrl}?embed=true&user_token=${user.uid}&phone=${user.phoneNumber}&email=${user.email}&name=${user.displayName}&datetime=${currentDateTime}&latlocation=${location.lat}&lnglocation=${location.lng}`;

  useEffect(() => {
    const fetchUrgentCare = async () => {
      try {
        setLoading(true); // Start loading
        const list = await findUrgentCare(location);
        setWebList(list);
        setLoading(false); // Finish loading
      } catch (e) {
        console.error(e);
        setError(e); // Set error state
        setLoading(false); // Finish loading
      }
    };
    fetchUrgentCare(); // Call the function to fetch data
  }, [location]);


  if (error) {
    // Render error state
    return <div>Error: {error.message}</div>;
  }


  useEffect(() => {
    console.log(webList)
  }, [webList]);


  const customStyles = {
    // Other styles if needed...

    // Custom style for each option
    option: (provided, state) => {
      // Determine if the option is 'closed' by checking the isOpen property in value
      const isClosed = !state.data.value.isOpen;

      // Return custom styles based on the isOpen status
      return {
        ...provided,
        color: isClosed ? '#ccc' : provided.color, // Grey out text if closed
        backgroundColor: isClosed ? 'inherit' : provided.backgroundColor, // Keep background if closed
        cursor: isClosed ? 'not-allowed' : 'default', // Change cursor for closed options
        // Any other style modifications you want based on isOpen status
      };
    },

    // Other styles if needed...
  };


  return (
    <div className="flex flex-col w-full h-full justify-center items-center bg-gray-100 py-10">
      {webList && (
        <Search
          hospitalOptions={webList}
          selectedOption={selectedOption}
          setSelectedOption={handleSelection} // Pass the handler
          customStyles={customStyles} // Pass custom styles if needed
        />
      )}
      {isOptionSelected && (
        <iframe
          src={iframe}
          title="Streamlit App"
          width="50%"
          height="800px"
          style={{ border: "none" }}
        ></iframe>
      )}
    </div >
  );
}

export default PageComponent;