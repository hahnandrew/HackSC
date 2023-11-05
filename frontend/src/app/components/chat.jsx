"use client";

import { useAuth } from "../../contexts/Authcontext";
import env from "../../../next.config"

function PageComponent() {

  const isDeployedString = process.env.NEXT_PUBLIC_IS_DEPLOYED;
  const isDeployed = isDeployedString === 'True';

  const baseUrl = isDeployed
    ? "https://hacksc-fgg6nccbxyuqmxm4ceujpz.streamlit.app"
    : "http://localhost:8501";


  const { user } = useAuth()

  const queryParams = `?embed=true&user_token=${user.uid}`;
  const iframeSrc = `${baseUrl}${queryParams}`;

  // console.log("User", user)
  // console.log("user.uid", user.uid)
  // const phone = user.phoneNumber
  // const displayName = user.displayName


  return (
    <div className="flex w-full h-full justify-center items-center bg-gray-100 py-10">
      <iframe
        src={iframeSrc}
        title="Streamlit App"
        width="50%"
        height="800px"
        style={{ border: "none" }}
      ></iframe>
    </div>
  );
}

export default PageComponent;
