import Image from "next/image";
import qr from "/public/Qr.jpg";

const SupportPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center mt-12 max-w-md w-full">
        <Image src={qr} alt="QR Code" className="rounded-lg mb-4" priority />
        <p className="text-gray-300 text-center">
          Scan the QR code to contribute and support our creator&apos;s journey.
        </p>
      </div>
    </div>
  );
};

export default SupportPage;
