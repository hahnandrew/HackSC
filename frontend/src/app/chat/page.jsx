"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/Authcontext';
import Chatapp from "../../components/chat"
import LocationComponent from "../../components/Getlocation"


const Loginpopup = ({ onClose, signInWithGoogleAndRedirect }) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative bg-white p-8 rounded shadow-md text-center space-y-4">
        <button className="absolute top-2 right-2 text-[#5F5F5F] text-[24px] font-bold" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl font-bold">Please Login</h2>
        <button className="btn bg-[#E5E5E5] w-full" onClick={() => signInWithGoogleAndRedirect(onClose)}>
          Login
        </button>
        <p>
          Dont have an account?
          <button className="text-[#000000] font-bold" onClick={() => signInWithGoogleAndRedirect(onClose)}>
            Create one here
          </button>
        </p>
      </div>
    </div>
  );
};

function PageComponent() {
  const { user, login } = useAuth();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowLoginPopup(true);
    }
  }, [user]);

  const signInWithGoogleAndRedirect = async (onClose) => {
    await login();
    onClose();
  };

  return (
    <div>
      <LocationComponent />
      {user ? (
        <Chatapp />
      ) : (
        <>
          {showLoginPopup && (
            <Loginpopup
              onClose={() => setShowLoginPopup(false)}
              signInWithGoogleAndRedirect={signInWithGoogleAndRedirect}
            />
          )}
        </>
      )}

    </div>
  );
}

export default PageComponent;