export const Loginpopup: React.FC<{ onClose: () => void, signInWithGoogleAndRedirect: (onClose: () => void) => Promise<void> }> = ({ onClose, signInWithGoogleAndRedirect }) => {

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