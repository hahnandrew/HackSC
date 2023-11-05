"use client";

function PageComponent() {

  return (
    <div className="flex w-full h-full justify-center items-center bg-gray-100 py-10">
      <iframe
        src="http://localhost:8501"
        title="Streamlit App"
        width="100%"
        height="800px"
        style={{ border: "none" }}
      ></iframe>
    </div>
  );
}

export default PageComponent;
