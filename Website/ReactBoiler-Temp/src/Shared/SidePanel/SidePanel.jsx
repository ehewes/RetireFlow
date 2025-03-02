SidePanel.tsx

// TODO: Can someone put a goddamn timer on the useEffect that simulates a click so that the person when they say SOS 
// doesn't imediately auto call the police if they don't mean to and they get time to cancel? Thanks


import { useEffect, useRef } from "react";
import { toast } from "react-toastify";


export default function SidePanel({ isOpen, onClose, autoCall, onAutoCallComplete }) {
  const reportButtonRef = useRef(null);

  // Simulates a 'click'
  useEffect(() => {
    if (isOpen && autoCall && reportButtonRef.current) {
      reportButtonRef.current.click();
      // Reset autoCall so it only auto-calls once per SOS event.
      onAutoCallComplete();
    }
  }, [isOpen, autoCall, onAutoCallComplete]);

  return (
    <div
      className={`fixed inset-0 transition-opacity ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } flex justify-end z-50`}
    >
      <div
        className={`w-96 h-full p-6 shadow-lg transition-transform transform ${isOpen ? "translate-x-0" : "translate-x-full"
          } relative flex flex-col items-center`}
        style={{
          backgroundColor: "#2C2C2C",
          boxShadow: isOpen ? "0px 0px 15px 4px rgba(255, 0, 0, 0.8)" : "none",
        }}
      >
        <button onClick={onClose} className="text-white text-3xl absolute top-4 right-4">
          &times;
        </button>

        <h2 className="text-2xl font-bold text-white mt-4">SOS Emergency?</h2>

        <div className="bg-white w-32 h-32 rounded-full flex items-center justify-center border-4 border-red-600 shadow-lg mt-6">
          <img src="/warn.svg" alt="Warning" className="w-16 h-16" />
        </div>

        <p className="mt-4 text-sm text-gray-300 text-center">
          If you're in immediate danger, our SOS Emergency feature is here to help.
          With a single press, <strong className="text-xl">your current location will be sent directly to local authorities</strong>, leading to a safe and quick response.
        </p>

        <p className="mt-4 text-red-500 text-center font-bold">
          ONLY PRESS THIS BUTTON IF YOU'VE RECENTLY WITNESSED A CRIME!!
        </p>

        <button
          ref={reportButtonRef}
          className="mt-6 bg-red-600 text-white p-4 w-full rounded-md shadow-lg hover:bg-red-700 transition animate-pulse"
          style={{
            boxShadow: "0px 0px 10px 3px white",
          }}
          onClick={() => {
            toast.success("Authorities have been notified!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }}
        >
          Report a crime
        </button>
      </div>
    </div>
  );
}