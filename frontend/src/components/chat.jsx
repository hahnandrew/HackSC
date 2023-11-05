"use client";

import { useAuth } from "../contexts/Authcontext";

function PageComponent() {

  const { user } = useAuth()

  // After authentication, send a message to the Streamlit app
  // iframeRef.current.contentWindow.postMessage({
  //   type: 'SET_USER',
  //   data: { userToken: 'user-specific-token' }
  // }, 'https://your-streamlit-app.com');


  return (
    <div className="flex w-full h-full justify-center items-center bg-gray-100 py-10">
      <iframe
        // src="https://hahnandrew-hacksc-streamlitchat-oprizx.streamlit.app/?user_token=${userToken}"
        src={`http://localhost:8502/?user_token=${user.uid}`}
        title="Streamlit App"
        width="50%"
        height="800px"
        style={{ border: "none" }}
      ></iframe>
    </div>
  );
}

export default PageComponent;
