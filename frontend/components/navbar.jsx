import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black/30 backdrop-blur-lg shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
        {/* Left side logo/title */}
        <h1 className="text-white text-xl sm:text-2xl font-bold tracking-wide">
          Weather World
        </h1>

        {/* Right side navigation */}
        <div className="flex space-x-4 sm:space-x-8">
          <Link
            to="/"
            className="text-white text-base sm:text-lg font-medium hover:text-yellow-300 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/weather"
            className="text-white text-base sm:text-lg font-medium hover:text-yellow-300 transition duration-300"
          >
            Weather
          </Link>
          <Link
            to="/rainForecast"
            className="text-white text-base sm:text-lg font-medium hover:text-yellow-400 transition duration-300"
          >
            Rain Forecast
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

