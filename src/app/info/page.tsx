import React from "react";
import { FcLock, FcSms, FcWebcam } from "react-icons/fc";

const HowItWorksPage = () => {
  return (
    <div className="flex flex-col items-center justify-center my-auto mx-auto min-h-screen p-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="w-full max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="p-6 bg-gray-700 rounded-t-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-3 text-white">
            How It Works
          </h1>
          <p className="text-gray-300 text-base">
            Discover seamless connections with video calls, engaging chats, and
            privacy.
          </p>
        </div>

        {/* Content Section */}
        <div className="p-6 bg-gray-800 space-y-6">
          {/* Video Call Section */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <FcWebcam size={30}/>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Connect with Video Calls
              </h3>
              <p className="text-gray-400 text-sm">
                Enjoy real-time face-to-face connections with users globally.
              </p>
            </div>
          </div>

          {/* Chat Section */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                <FcSms size={30}/>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Chat with Ease
              </h3>
              <p className="text-gray-400 text-sm">
                Start meaningful conversations with others, anytime and
                anywhere.
              </p>
            </div>
          </div>

          {/* Privacy Section */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                <FcLock size={30}/>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Your Privacy is Safe
              </h3>
              <p className="text-gray-400 text-sm">
                We prioritize your privacy, keeping your conversations safe and
                secure.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="p-4 bg-gray-700 rounded-b-lg text-center">
          <h3 className="text-lg font-semibold text-white mb-2">
            Ready to Explore?
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Dive into a world of new connections. Start today!
          </p>
       
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;