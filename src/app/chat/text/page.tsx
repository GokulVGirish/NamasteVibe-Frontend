import { FaPaperPlane } from "react-icons/fa";


 const TextChat=()=>{
    return (
      <div className="flex flex-col pt-36 min-h-screen p-4 bg-gradient-to-b from-gray-900 to-black">
      
        <div className="w-full max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-[70vh] md:h-[80vh]">
         
          <div className="flex-1 overflow-y-auto p-4 bg-gray-700 rounded-lg shadow-inner flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <div className="bg-black text-white p-3 rounded-lg max-w-xs self-start transition-transform transform hover:scale-105">
                Hey! How’s everything going?
              </div>
              <div className="bg-gray-600 p-3 rounded-lg text-gray-300 max-w-xs self-end transition-transform transform hover:scale-105">
                Pretty good! Just catching up with some work.
              </div>
            
            </div>
          </div>

         
          <div className="flex p-3 border-t border-gray-600 space-x-3 bg-gray-800">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 border border-gray-600 rounded-lg p-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            <button className="bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-800 transition duration-200 flex items-center justify-center">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    );
}
export default TextChat