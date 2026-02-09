// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App



// import React, { useState } from "react"

// export default function App() {
//   const [city, setCity] = useState("")
//   const [weather, setWeather] = useState(null)

//   const fetchWeather = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/weather/${city}`) 
//       const data = await response.json()
//       setWeather(data)
//     } catch (error) {
//       console.error("Error fetching weather:", error)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600">
//       <div className="bg-white rounded-2xl shadow-xl p-8 w-96">
//         <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">
//           Weather App
//         </h1>

//         {/* Search Box */}
//         <div className="flex mb-4">
//           <input
//             type="text"
//             placeholder="Enter city"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             className="flex-1 border rounded-l-xl p-2 outline-none"
//           />
//           <button
//             onClick={fetchWeather}
//             className="bg-blue-500 text-white px-4 rounded-r-xl hover:bg-blue-600"
//           >
//             Search
//           </button>
//         </div>

//         {/* Weather Details */}
//         {weather && weather.main && (
//           <div className="text-center">
//             <h2 className="text-xl font-semibold">{weather.name}</h2>
//             <p className="text-gray-600">Temperature: {weather.main.temp}°C</p>
//             <p className="text-gray-600">Condition: {weather.weather[0].description}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// import React, { useState } from "react";

// export default function App() {
//   const [city, setCity] = useState("");
//   const [weather, setWeather] = useState(null);
//   const [unit, setUnit] = useState("metric"); // default Celsius

//   // const fetchWeather = async (selectedUnit = unit) => {
//   //   if (!city) return;
//   //   try {
//   //     const response = await fetch(
//   //       `http://localhost:5000/weather/${city}?unit=${selectedUnit}`
//   //     );
//   //     const data = await response.json();
//   //     setWeather(data);
//   //   } catch (error) {
//   //     console.error("Error fetching weather:", error);
//   //   }
//   // };

// const fetchWeather = async (selectedUnit = unit) => {
//   try {
//     const url = `http://localhost:5000/weather/${city}?unit=${selectedUnit}`;
//     console.log("👉 Final URL:", url);

//     const response = await fetch(url);
//     const data = await response.json();
//     console.log("👉 Frontend Response:", data);

//     setWeather(data);
//     console.log("👉 Weather Data:", data);
// console.log("👉 Temp Received:", data.main?.temp);
//   } catch (error) {
//     console.error("Error fetching weather:", error);
//   }
// };
//   // Toggle Celsius <-> Fahrenheit
//   const toggleUnit = () => {
    
//   const newUnit = unit === "metric" ? "imperial" : "metric";
//    console.log("👉 Toggle clicked, new unit =", newUnit); // debug
//   setUnit(newUnit);
//   if (city) {
//     fetchWeather(newUnit); // 👈 yaha se direct new unit pass karega
//   }
// };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600">
//       <div className="bg-white rounded-2xl shadow-xl p-8 w-96">
//         <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">
//           Weather App
//         </h1>

//         {/* Search Box */}
//         <div className="flex mb-4">
//           <input
//             type="text"
//             placeholder="Enter city"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             className="flex-1 border rounded-l-xl p-2 outline-none"
//           />
//           <button
//             onClick={() => fetchWeather()}
//             className="bg-blue-500 text-white px-4 rounded-r-xl hover:bg-blue-600"
//           >
//             Search
//           </button>
//         </div>

//         {/* Toggle °C / °F */}
//         {weather && (
//           <div className="text-center mb-4">
//             <button
//               onClick={toggleUnit}
//               className="px-4 py-1 rounded-full bg-gray-200 hover:bg-gray-300"
//             >
//               {unit === "metric" ? "Switch to °F" : "Switch to °C"}
//             </button>
//           </div>
//         )}

//         {/* Weather Details */}
//         {weather && weather.main && (
//           <div className="text-center">
//             <h2 className="text-xl font-semibold">{weather.name}</h2>
//             <p className="text-gray-600">
//               Temperature: {weather.main.temp}° {unit === "metric" ? "C" : "F"}
//             </p>
//             <p className="text-gray-600">
//               Condition: {weather.weather[0].description}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





// import React, { useState } from "react";

// function App() {
//   const [city, setCity] = useState("");
//   const [weather, setWeather] = useState(null);
//   const [unit, setUnit] = useState("metric"); // default Celsius

//   // Backend se data fetch karne wala function
//   const fetchWeather = async () => {
//     if (!city) return;
//     const url = `http://localhost:5000/weather/${city}?unit=${unit}`;
//     console.log("🌍 Final URL:", url);

//     try {
//       const res = await fetch(url);
//       const data = await res.json();
//       console.log("🌡️ Temp received:", data.main?.temp);
//       setWeather(data);
//     } catch (err) {
//       console.error("❌ Error:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-500 p-6 text-center">
//       {/* 🔹 Welcome Section */}
//       <div className="mb-10">
//         <h1 className="text-4xl font-bold text-white mb-2">
//           Welcome to the Weather 🌦️
//         </h1>
//         <p className="text-lg text-white">
//           Janiye ki kaha pr kaisa weather rehne wala hai!
//         </p>
//       </div>

//       {/* 🔹 Search Section */}
//       <div className="flex justify-center gap-2 mb-6">
//         <input
//           type="text"
//           placeholder="Enter city..."
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
//         />
//         <select
//           value={unit}
//           onChange={(e) => setUnit(e.target.value)}
//           className="px-3 py-2 rounded-lg border border-gray-300"
//         >
//           <option value="metric">Celsius (°C)</option>
//           <option value="imperial">Fahrenheit (°F)</option>
//         </select>
//         <button
//           onClick={fetchWeather}
//           className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700"
//         >
//           Get Weather
//         </button>
//       </div>

//       {/* 🔹 Weather Result Section */}
//       {weather && weather.main && (
//         <div className="bg-white rounded-xl shadow-lg p-6 w-80 mx-auto">
//           <h2 className="text-2xl font-bold mb-2">{weather.name}</h2>
//           <p className="text-gray-700 mb-1">
//             🌡️ Temperature: {weather.main.temp}°{unit === "metric" ? "C" : "F"}
//           </p>
//           <p className="text-gray-700 mb-1">
//             🌥️ Condition: {weather.weather[0].description}
//           </p>
//           <p className="text-gray-700">
//             💧 Humidity: {weather.main.humidity}%
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;






// import React, { useState } from "react";

// function App() {
//   const [city, setCity] = useState("");
//   const [weather, setWeather] = useState(null);
//   const [unit, setUnit] = useState("metric");

//   const fetchWeather = async () => {
//     if (!city) return;
//     const url = `http://localhost:5000/weather/${city}?unit=${unit}`;

//     try {
//       const res = await fetch(url);
//       const data = await res.json();
//       setWeather(data);
//     } catch (err) {
//       console.error("❌ Error:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-start py-10">
//       {/* 🔹 Heading */}
//       <h1 className="text-4xl font-bold text-white mb-4">
//         🌦️ Welcome to the Weather App
//       </h1>
//       <p className="text-white mb-6">
//         Janiye ki kaha par kesa weather hai ❄️☀️🌧️
//       </p>

//       {/* 🔹 Search Section */}
//       <div className="flex gap-2 mb-6">
//         <input
//           type="text"
//           placeholder="Enter city..."
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
//         />
//         <select
//           value={unit}
//           onChange={(e) => setUnit(e.target.value)}
//           className="px-3 py-2 rounded-lg border border-gray-300"
//         >
//           <option value="metric">Celsius (°C)</option>
//           <option value="imperial">Fahrenheit (°F)</option>
//         </select>
//         <button
//           onClick={fetchWeather}
//           className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700"
//         >
//           Get Weather
//         </button>
//       </div>

//       {/* 🔹 Weather Info (User-Friendly Card) */}
//       {weather && weather.main && (
//         <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] md:w-[60%] lg:w-[40%] text-gray-800">
//           <h2 className="text-3xl font-bold text-center mb-4">
//             📍 {weather.name}, {weather.sys.country}
//           </h2>

//           <div className="grid grid-cols-2 gap-4 text-left">
//             <p className="text-lg">🌡️ Temp: <b>{weather.main.temp}°{unit === "metric" ? "C" : "F"}</b></p>
//             <p className="text-lg">🌡️ Feels Like: <b>{weather.main.feels_like}°</b></p>
//             <p className="text-lg">📉 Min Temp: <b>{weather.main.temp_min}°</b></p>
//             <p className="text-lg">📈 Max Temp: <b>{weather.main.temp_max}°</b></p>
//             <p className="text-lg">💧 Humidity: <b>{weather.main.humidity}%</b></p>
//             <p className="text-lg">🔵 Pressure: <b>{weather.main.pressure} hPa</b></p>
//             <p className="text-lg">🌬️ Wind Speed: <b>{weather.wind.speed} m/s</b></p>
//             <p className="text-lg">☁️ Condition: <b>{weather.weather[0].description}</b></p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;






// import React, { useState } from "react";

// export default function App() {
//   const [city, setCity] = useState("");
//   const [forecast, setForecast] = useState(null);

//   const fetchForecast = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/forecast/${city}?unit=metric`);
//       const data = await response.json();
//       setForecast(data);
//     } catch (error) {
//       console.error("Error fetching forecast:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white flex flex-col items-center p-6">
//       <h1 className="text-3xl font-bold mb-4">Weather App</h1>

//       {/* Search */}
//       <div className="flex w-full max-w-md mb-6">
//         <input
//           className="flex-1 p-2 rounded-l bg-gray-200 text-black"
//           placeholder="Enter city"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//         />
//         <button
//           onClick={fetchForecast}
//           className="bg-blue-500 px-4 rounded-r hover:bg-blue-600"
//         >
//           Search
//         </button>
//       </div>

//       {/* Forecast Display */}
//       {forecast && (
//         <div className="w-full max-w-2xl space-y-6">
//           {/* Current Weather */}
//           <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex items-center justify-between">
//             <div>
//               <h2 className="text-2xl font-semibold">{forecast.city.name}, {forecast.city.country}</h2>
//               <p className="capitalize">{forecast.list[0].weather[0].description}</p>
//               <p className="text-4xl font-bold">{Math.round(forecast.list[0].main.temp)}°C</p>
//             </div>
//             <img
//               alt="weather icon"
//               src={`http://openweathermap.org/img/wn/${forecast.list[0].weather[0].icon}@2x.png`}
//             />
//           </div>

//           {/* 7-Day Forecast (actually 5-day from API) */}
//           <div className="grid grid-cols-5 gap-4">
//             {forecast.list
//               .filter((_, i) => i % 8 === 0) // har din ka ek datapoint
//               .map((item, index) => (
//                 <div key={index} className="bg-gray-800 p-4 rounded-lg text-center">
//                   <p>{new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })}</p>
//                   <img
//                     alt="icon"
//                     className="mx-auto"
//                     src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
//                   />
//                   <p className="text-lg">{Math.round(item.main.temp)}°C</p>
//                 </div>
//               ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }







// import React, { useState } from "react";
// import { motion } from "framer-motion";

// export default function App() {
//   const [city, setCity] = useState("");
//   const [weather, setWeather] = useState(null);
//   const [forecast, setForecast] = useState(null);

//   const fetchWeather = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/weather/${city}?unit=metric`);
//       const data = await res.json();
//       setWeather(data);

//       const fRes = await fetch(`http://localhost:5000/forecast/${city}?unit=metric`);
//       const fData = await fRes.json();
//       setForecast(fData.list.slice(0, 7 * 8)); // 7 din ka data (8x per day)
//     } catch (err) {
//       console.error("Error fetching weather:", err);
//     }
//   };

//   return (
//     <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white p-6 overflow-hidden">
//       {/* 🔹 Special Cursor Effect */}
//       <motion.div
//         className="pointer-events-none fixed w-24 h-24 rounded-full bg-blue-500 opacity-40 blur-3xl"
//         animate={{ x: window.innerWidth / 2, y: window.innerHeight / 2 }}
//         transition={{ type: "spring", stiffness: 50 }}
//       />

//       {/* Search Bar */}
//       <div className="flex justify-center mb-6">
//         <input
//           type="text"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           placeholder="Enter city"
//           className="px-4 py-2 rounded-l-xl text-black w-64"
//         />
//         <button
//           onClick={fetchWeather}
//           className="bg-blue-500 px-4 py-2 rounded-r-xl hover:bg-blue-600"
//         >
//           Search
//         </button>
//       </div>

//       {/* Weather Info */}
//       {weather && (
//         <div className="text-center">
//           <h1 className="text-3xl font-bold">{weather.name}, {weather.sys.country}</h1>
//           <p className="text-lg">{weather.weather[0].description}</p>
//           <h2 className="text-6xl font-bold my-4">{Math.round(weather.main.temp)}°C</h2>
//           <p>High: {weather.main.temp_max}° | Low: {weather.main.temp_min}°</p>

//           {/* Extra Info */}
//           <div className="mt-6 grid grid-cols-3 gap-4">
//             <div className="bg-blue-800/30 p-4 rounded-xl">💧 Humidity: {weather.main.humidity}%</div>
//             <div className="bg-blue-800/30 p-4 rounded-xl">🌬 Wind: {weather.wind.speed} m/s</div>
//             <div className="bg-blue-800/30 p-4 rounded-xl">⛅ Clouds: {weather.clouds.all}%</div>
//           </div>
//         </div>
//       )}

//       {/* Forecast */}
//       {forecast && (
//         <div className="mt-10 flex gap-4 justify-center overflow-x-auto">
//           {forecast.filter((_, i) => i % 8 === 0).map((day, index) => (
//             <div key={index} className="bg-white/10 p-4 rounded-xl min-w-[100px] text-center">
//               <p>{new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })}</p>
//               <p className="text-xl font-bold">{Math.round(day.main.temp)}°C</p>
//               <p>{day.weather[0].main}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

















// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "../components/navbar";
// import Home from "../pages/home";
// import Weather from "../pages/weather";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <div className=" bg-gray-900 min-h-screen"> {/* white gap fix */}
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/weather" element={<Weather />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
















import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar";
import Home from "../pages/home";
import Weather from "../pages/weather";
import RainForecast from "../pages/rainForecast";

function App() {
  return (
    <Router>
      {/* 🔹 Background Image (fixed + blurred) */}
      <div
        className="fixed inset-0 bg-cover bg-center blur-sm -z-10"
        style={{
          backgroundImage: "url('https://img.freepik.com/free-photo/cloud-blue-sky_1232-3108.jpg')",
        }}
      ></div>

      <Navbar />

      {/* Foreground Content */}
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/rainForecast" element={<RainForecast />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
