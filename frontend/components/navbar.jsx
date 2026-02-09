// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="fixed top-0 left-0 w-full bg-gray-950/90 backdrop-blur-md shadow-md z-50">
//       <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
//         {/* Left side logo/title */}
//         <h1 className="text-white text-2xl font-bold tracking-wide">
//           Weather World
//         </h1>

//         {/* Right side navigation */}
//         <div className="space-x-8 pr-6">
//           <Link
//             to="/"
//             className="text-white text-lg font-medium hover:text-blue-400 transition duration-300"
//           >
//             Home
//           </Link>
//           <Link
//             to="/weather"
//             className="text-white text-lg font-medium hover:text-blue-400 transition duration-300"
//           >
//             Weather
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;





import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black/30 backdrop-blur-lg shadow-md z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        {/* Left side logo/title */}
        <h1 className="text-white text-2xl font-bold tracking-wide">
          Weather World
        </h1>

        {/* Right side navigation */}
        <div className="space-x-8 pr-6">
          <Link
            to="/"
            className="text-white text-lg font-medium hover:text-yellow-300 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/weather"
            className="text-white text-lg font-medium hover:text-yellow-300 transition duration-300"
          >
            Weather
          </Link>
          <Link
            to="/rainForecast"
            className="text-white text-lg font-medium hover:text-yellow-400 transition duration-300"
          >
            Rain Forecast
          </Link>


        </div>
      </div>
    </nav>
  );
};

export default Navbar;

