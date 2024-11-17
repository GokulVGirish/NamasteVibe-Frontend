import Image from "next/image";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { MdSlowMotionVideo } from "react-icons/md";
import friendsImg from "/public/friends.jpg";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-4 pt-16 pb-8">
      {/* Main Container */}
      <div className="relative  flex flex-col items-center space-y-8 pb-6   bg-opacity-90 max-w-5xl w-full shadow-2xl rounded-3xl bg-gradient-to-br from-gray-800 to-black backdrop-blur-md">
        {/* Image Section */}
        <div className="relative w-full rounded-t-lg rounded-b-md h-72 overflow-hidden shadow-lg  ">
          <Image
            src={friendsImg}
            alt="Friends"
            className="object-center object-cover w-full h-full"
          />
        </div>

        {/* Welcome Text */}
        <h2 className="text-4xl font-extrabold text-center leading-tight">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            NamasteVibe
          </span>
        </h2>

        {/* Description */}
        <p className="text-center text-lg leading-relaxed text-gray-300 px-4">
          Discover new friends and experiences without an app! NamasteVibe pairs
          you randomly for one-on-one conversations that keep things fresh, fun,
          and anonymous.
        </p>

        {/* Links to Terms */}
        <p className="text-center text-sm text-gray-400">
          By joining, you agree to our
          <a
            href="#"
            className="text-blue-400 underline ml-1 hover:text-blue-500"
          >
            Terms
          </a>{" "}
          and
          <a
            href="#"
            className="text-blue-400 underline ml-1 hover:text-blue-500"
          >
            Guidelines
          </a>
          .
        </p>

        {/* Action Buttons */}
        <div className="flex gap-6">
          <Link
            href="/chat/text"
            className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 rounded-md shadow-lg text-white font-semibold transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <IoChatbubbleEllipsesOutline className="text-2xl" />
            Text Chat
          </Link>
          <Link
            className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-3 rounded-md shadow-lg text-white font-semibold transition-transform transform hover:scale-105 hover:shadow-2xl"
            href="/chat/video"
          >
            <MdSlowMotionVideo className="text-2xl" />
            Video Chat
          </Link>
        </div>
      </div>
    </div>
  );
}
