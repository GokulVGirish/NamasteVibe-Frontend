import React from "react";
import { FaRegSadCry } from "react-icons/fa";

interface PermissionModalProps {
  isOpen: boolean;

}

const PermissionModal: React.FC<PermissionModalProps> = ({
  isOpen,
}) => {
  console.log("is open", isOpen);
  if (isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg w-11/12 sm:w-1/2 max-w-lg p-6">
        <div className="flex flex-col items-center space-y-4">
          <FaRegSadCry size={48} className="text-red-500" />
          <h2 className="text-2xl font-semibold">Permission Denied</h2>
          <p className="text-center text-gray-300">
            We need your audio and video permissions to proceed with the video
            chat. Please enable them to continue.
          </p>
          <div className="flex space-x-4">
            {/* <button
              
              className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-6 py-2 rounded-lg shadow-md"
            >
              Retry
            </button> */}
            {/* <button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 transition-all text-white px-6 py-2 rounded-lg shadow-md"
            >
              Close
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionModal;
