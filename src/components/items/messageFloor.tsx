import { useEffect, useState } from "react";

interface MessageFloorProps {
  errorMessage?: string;
  setErrorMessage: (val?: string) => void;
  message?: string;
  setMessage: (val?: string) => void;
}

export default function MessageFloor({
  message,
  setMessage,
  errorMessage,
  setErrorMessage,
}: MessageFloorProps) {
  const [showMessageOverlay, setShowMessageOverlay] = useState(false);

  useEffect(() => {
    if (message) {
      setShowMessageOverlay(true);
      const timer = setTimeout(() => {
        setMessage(undefined);
        setShowMessageOverlay(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);
  return (
    <div className="absolute bottom-0 w-full px-4 py-2">
      {errorMessage && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-red-100 text-red-500 text-center z-50">
          <button
            onClick={() => setErrorMessage(undefined)}
            className="absolute right-2 text-lg"
          >
            &#10006;
          </button>
          {errorMessage}
        </div>
      )}

      {showMessageOverlay && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="p-4 bg-green-400 shadow-lg rounded">
            {message && <span className="text-white ">{message}</span>}
          </div>
        </div>
      )}
    </div>
  );
}
