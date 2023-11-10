"use client";
import React from 'react';
import { useEffect, useState } from 'react';
import { useAuth } from "../contexts/Authcontext";
import { useLocation } from "../contexts/Locationcontext";
import { findUrgentCareAndQuery, findUrgentCare } from "../utils/googleMapsServices"
import Search from "../components/Searchhospital"
import scrapeEmail from "../utils/scrapeURL"
import scraped from "../json/scraped.json"


function PageComponent(hospital) {
  const [webList, setWebList] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [iframeUrl, setIframeUrl] = useState(null);
  const [website, setWebsite] = useState(null);
  const [address, setAddress] = useState(null);


  const handleSelection = (option) => {
    setWebsite(option.value.website)
    setSelectedOption(option);
    setIsOptionSelected(true); // Set true when an option is selected
  };


  // const isDeployedString = process.env.NEXT_PUBLIC_IS_DEPLOYED;
  // const isDeployed = isDeployedString === 'True';
  // const baseUrl = isDeployed
  //   ? "https://hacksc-fgg6nccbxyuqmxm4ceujpz.streamlit.app"
  //   : "http://localhost:8501";

  const baseUrl = "http://localhost:8501"

  const location = useLocation()

  const currentDateTime = encodeURIComponent(new Date().toLocaleString());
  const { user } = useAuth();

  function getValueByKey(json, key) {
    if (json.hasOwnProperty(key)) {
      return json[key];
    } else {
      // Return the first value from the JSON object
      const firstKey = Object.keys(json)[0];
      return json[firstKey];
    }
  }

  // useEffect(() => {
  //   console.log(webList)
  // }, [webList]);

  useEffect(() => {
    if (selectedOption) {
      const weburl = selectedOption && selectedOption.value ? selectedOption.value.website : 'default_website_url';
      const hospital_email = getValueByKey(scraped, weburl)
      // console.log("address", address)
      // console.log("selectedOption", selectedOption)
      const newIframeUrl = `${baseUrl}?embed=true&user_token=${encodeURIComponent(user.uid)}&phone=${encodeURIComponent(user.phoneNumber)}&user_email=${encodeURIComponent(user.email)}&name=${encodeURIComponent(user.displayName)}&datetime=${encodeURIComponent(currentDateTime)}&latlocation=${encodeURIComponent(location.lat)}&lnglocation=${encodeURIComponent(location.lng)}&hospital=${encodeURIComponent(selectedOption.label)}&hospital_email=${hospital_email}&address=${address}`;
      setIframeUrl(newIframeUrl);
    }
  }, [selectedOption]);


  useEffect(() => {
    const fetchUrgentCare = async () => {
      try {
        setLoading(true); // Start loading
        const list = await findUrgentCare(location);
        setWebList(list);
        setAddress(list[0].address)
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
      {iframeUrl && (
        <iframe
          // src={iframeUrl}
          src="https://clean-slate-initiative.streamlit.app/?user_token=uid"
          title="Streamlit App"
          width="50%"
          height="800px"
          style={{ border: "none" }}
        />
      )}
    </div >
  );
}

export default PageComponent;