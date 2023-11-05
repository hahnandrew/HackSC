"use client";
import React from 'react';
import { useEffect, useState } from 'react';
import { useAuth } from "../contexts/Authcontext";
import { useLocation } from "../contexts/Locationcontext";
import { findUrgentCareAndQuery, findUrgentCare } from "../utils/googleMapsServices"
import CustomLoadingIndicator from "../components/Searchhospital"


function PageComponent(hospital) {
  const [WebList, setWebList] = useState(null);
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
    // This function will fetch the urgent care list and update the state
    const fetchUrgentCare = async () => {
      try {
        const WebList = await findUrgentCare(location);
        setWebList(WebList); // This will set your data to the webList state
      } catch (e) {
        console.error(e);
        setError(e); // You can set error state and render it in your UI if needed
      }
    };

    fetchUrgentCare(); // Call the function to fetch data
  }, [location]);

  useEffect(() => {
    <CustomLoadingIndicator hospitalOptions={WebList} />
  }, [WebList]);


  return (
    <div className="flex w-full h-full justify-center items-center bg-gray-100 py-10">
      <iframe
        src={iframe}
        title="Streamlit App"
        width="50%"
        height="800px"
        style={{ border: "none" }}
      ></iframe>
    </div>
  );
}

export default PageComponent;
