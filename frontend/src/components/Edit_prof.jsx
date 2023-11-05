"use client"

import React, { useEffect, useState } from 'react';
import { useAuth } from "../contexts/Authcontext"

const EditPatientProfile = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);


  const handleLanguageChange = (event) => {
    // Set the selectedLanguage state to the value of the selected radio button
    setSelectedLanguage(event.target.value);
  };

  // console.log(useAuth)
  const { user } = useAuth();

  const [showPopup, setShowPopup] = useState(false);

  // const handleSaveChanges = (language) => {
  //   setSelectedLanguage(language)
  //   // Here you would normally save changes to a database or state
  //   setShowPopup(true);
  //   setTimeout(() => {
  //     setShowPopup(false);
  //   }, 3000); // Hide the popup after 3 seconds
  // };

  const saveLanguagePreference = async () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000); // Hide the popup after 3 seconds
    // Send the selectedLanguage to the server
    // useEffect(() => {
    // },[]);
    const response = await fetch('/api/save-language', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid: user.uid, language: selectedLanguage }),
    });

    const data = await response.json();
    if (data.success) {
      // Handle success, e.g., show a confirmation message
    } else {
      // Handle error
    }
  };


  return (
    <div className="flex justify-center">
      <div className="card w-2/3">
        <div className="card-body">
          <text className="card-title text-4xl">Edit Profile</text>
          {/* Text input fields */}
          <div className="form-control w-full">
            <label className="label">
              <span className="text-lg">First Name (Required)</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full" />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="text-lg">Last Name (Required)</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full" />
          </div>


          <div className="dropdown dropdown-bottom base-100">
            <div tabIndex={0} className="form-control w-full">
              <label className="label">
                <span className="text-lg">Have you spoken with a doctor before?</span>
              </label>
              <input type="text" placeholder="Select" className="input input-bordered w-full" disabled />
            </div>
            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full z-10">
              <li>Yes</li>
              <li>No</li>
            </ul>
          </div>

          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} className="form-control w-full">
              <label className="label">
                <span className="text-lg">When was the last time you spoke to one?</span>
              </label>
              <input type="text" placeholder="Select" className="input input-bordered w-full" disabled />
            </div>
            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full z-10">
              <li>Within the last month</li>
              <li>Within the last 6 months</li>
              <li>Within the last year</li>
              <li>Over a year ago</li>
              <li>I have never spoken with a counselor/therapist before.</li>
            </ul>
          </div>

          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} className="form-control w-full">
              <label className="label">
                <span className="text-lg">What is your age?</span>
              </label>
              <input type="text" placeholder="Select" className="input input-bordered w-full" disabled />
            </div>
            <ul tabIndex={0} className="z-10 menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full">
              <li>18-24</li>
              <li>25-34</li>
              <li>35-44</li>
              <li>45-54</li>
              <li>55-64</li>
              <li>65 and over</li>
            </ul>
          </div>

          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} className="form-control w-full">
              <label className="label">
                <span className="text-lg">What is your preferred language?</span>
              </label>
              <input type="text" placeholder={selectedLanguage || "Select"} className="input input-bordered w-full" disabled />
            </div>
            <ul tabIndex={0} className="z-10 menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">English</span>
                  <input
                    type="radio"
                    name="language"
                    value="English"
                    className="radio"
                    checked={selectedLanguage === 'English'}
                    onChange={handleLanguageChange}
                  />
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text">Spanish</span>
                  <input
                    type="radio"
                    name="language"
                    value="Spanish"
                    className="radio"
                    checked={selectedLanguage === 'Spanish'}
                    onChange={handleLanguageChange}
                  />
                </label>
              </div>
            </ul>
          </div>

          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} className="form-control w-full">
              <label className="label">
                <span className="text-lg">What kind of doctor do you want to speak with?</span>
              </label>
              <input type="text" placeholder="Select" className="input input-bordered w-full" disabled />
            </div>
            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full z-10">
              <li>Male</li>
              <li>Female</li>
              <li>No preference</li>
            </ul>
          </div>

          <div className="card-actions justify-end">
            <button className="btn btn-outline">Cancel</button>
            <button className="btn" onClick={saveLanguagePreference}>Save Changes</button>
          </div>

          {/* Popup for showing save confirmation */}
          {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="p-8 bg-white rounded-lg shadow-lg z-50 max-w-lg mx-auto text-center">
                <h2 className="text-2xl font-bold mb-4">Success!</h2>
                <p className="mb-4">Your changes have been saved successfully.</p>
                <button
                  onClick={() => setShowPopup(false)}
                  className="btn border-transparent bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default EditPatientProfile;