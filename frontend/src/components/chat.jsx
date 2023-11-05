"use client";

import { useAuth } from "../contexts/Authcontext";

function PageComponent() {

  const baseUrl = process.env.IS_DEPLOYED === 'true'
    ? "https://hacksc-fgg6nccbxyuqmxm4ceujpz.streamlit.app"
    : "http://localhost:8501";

  const { user } = useAuth()
  // console.log(user)

  const queryParams = `?embed=true&user_token=${user.uid}`;
  const iframeSrc = `${baseUrl}${queryParams}`;

  // console.log("User", user)
  console.log("user.uid", user.uid)
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
