// import { useState } from "react";

// export default function RainForecast() {
//   const [city, setCity] = useState("");
//   const [rainInfo, setRainInfo] = useState([]);

//   const fetchRainData = async () => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/forecast/${city}?unit=metric`
//       );
//       const data = await res.json();

//       const next24Hours = data.list.slice(0, 8);

//       const info = next24Hours.map((item) => {
//         const time = new Date(item.dt_txt).toLocaleTimeString("en-IN", {
//           hour: "2-digit",
//           minute: "2-digit",
//         });
//         const condition = item.weather[0].main;
//         const desc = item.weather[0].description;

//         return {
//           time,
//           rain:
//             condition === "Rain"
//               ? `🌧️ Barish hone wali hai (${desc})`
//               : `☀️ Barish nahi hogi, Mausam ${desc} rahega`,
//         };
//       });

//       setRainInfo(info);
//     } catch (err) {
//       console.error("Error fetching rain data:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-start py-10 px-4 pt-24 text-white">
//       {/* 🔹 Heading */}
//       <h2 className="text-4xl font-bold mb-6">🌧️ Rain Forecast (24 Hours)</h2>

//       {/* 🔹 Input and Button */}
//       <div className="flex gap-3 mb-8">
//         <input
//           type="text"
//           placeholder="Enter city"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           className="px-4 py-2 rounded-lg text-black"
//         />
//         <button
//           onClick={fetchRainData}
//           className="px-4 py-2 bg-blue-400 text-black font-semibold rounded-lg shadow-md hover:bg-blue-300"
//         >
//           Check Rain
//         </button>
//       </div>

//       {/* 🔹 Results */}
//       {rainInfo.length > 0 && (
//         <div className="max-w-3xl w-full bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg">
//           <h3 className="text-2xl font-semibold mb-4 text-white">
//             Agle 24 ghante ka Mausam 🌍
//           </h3>
//           <ul className="space-y-3">
//             {rainInfo.map((slot, idx) => (
//               <li
//                 key={idx}
//                 className="p-4 bg-white/30 backdrop-blur-md rounded-xl shadow text-black"
//               >
//                 <p className="font-bold">{slot.time}</p>
//                 <p>{slot.rain}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }










// import { useState, useEffect } from "react";

// export default function RainForecast() {
//     const [city, setCity] = useState("");
//     const [rainInfo, setRainInfo] = useState([]);

//     // Sidebar states
//     const [rainingNow, setRainingNow] = useState([]);
//     const [rainingSoon, setRainingSoon] = useState([]);

//     // ✅ Fetch sidebar data from backend /rain-status
//     useEffect(() => {
//         const fetchRainStatus = async () => {
//             try {
//                 const res = await fetch("http://localhost:5000/rain-forecast");
//                 const data = await res.json();
//                 setRainingNow(data.rainingNow || []);
//                 setRainingSoon(data.rainingSoon || []);
//             } catch (err) {
//                 console.error("Error fetching rain sidebar:", err);
//             }
//         };

//         fetchRainStatus();
//     }, []);

//     // Main page fetch for selected city
//     const fetchRainData = async () => {
//         if (!city) return;

//         try {
//             const res = await fetch(
//                 `http://localhost:5000/forecast/${city}?unit=metric`
//             );
//             const data = await res.json();

//             const next24Hours = data.list.slice(0, 8);

//             const info = next24Hours.map((item) => {
//                 const time = new Date(item.dt_txt).toLocaleTimeString("en-IN", {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                 });
//                 const condition = item.weather[0].main;
//                 const desc = item.weather[0].description;

//                 return {
//                     time,
//                     rain:
//                         condition === "Rain"
//                             ? `🌧️ Barish hone wali hai (${desc})`
//                             : `☀️ Barish nahi hogi, Mausam ${desc} rahega`,
//                 };
//             });

//             setRainInfo(info);
//         } catch (err) {
//             console.error("Error fetching rain data:", err);
//         }
//     };

//     return (
//         <div className="min-h-screen text-white flex flex-row pt-16">
//             {/* Sidebar */}
//             <div className="w-1/4 bg-white/10 backdrop-blur-md p-6 shadow-lg flex flex-col">
//                 <h2 className="text-2xl font-bold mb-4">🌍 Rain Updates</h2>

//                 {/* Cities raining now */}
//                 <div className="mb-6">
//                     <h3 className="text-lg font-semibold mb-2">☔ Abhi Barish ho rhi hai </h3>
//                     {rainingNow.length > 0 ? (
//                         <ul className="space-y-2">
//                             {rainingNow.map((c, idx) => (
//                                 <li
//                                     key={idx}
//                                     className="bg-white/10 p-2 rounded-lg text-center"
//                                 >
//                                     {c}
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p className="text-gray-300">Loading...</p>
//                     )}
//                 </div>

//                 {/* Cities raining soon */}
//                 <div>
//                     <h3 className="text-lg font-semibold mb-2">🌦️ Jaldi Barish hone wali hai </h3>
//                     {rainingSoon.length > 0 ? (
//                         <ul className="space-y-2">
//                             {rainingSoon.map((c, idx) => (
//                                 <li
//                                     key={idx}
//                                     className="bg-white/10 p-2 rounded-lg text-center"
//                                 >
//                                     {c}
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p className="text-gray-300">Loading...</p>
//                     )}
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="w-3/4 flex flex-col items-center justify-start py-10 px-6 text-black">
//                 <h2 className="text-4xl font-bold mb-6">🌧️ Rain Forecast (24 Hours)</h2>

//                 <div className="flex gap-3 mb-8">
//                     <input
//                         type="text"
//                         placeholder="Enter city"
//                         value={city}
//                         onChange={(e) => setCity(e.target.value)}
//                         className="px-4 py-2 rounded-lg text-black"
//                     />
//                     <button
//                         onClick={fetchRainData}
//                         className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-300"
//                     >
//                         Check Rain
//                     </button>
//                 </div>

//                 {rainInfo.length > 0 && (
//                     <div className="max-w-3xl w-full bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-lg">
//                         <h3 className="text-2xl font-semibold mb-4 text-white">
//                             Agle 24 ghante ka Mausam 🌍
//                         </h3>
//                         <ul className="space-y-3">
//                             {rainInfo.map((slot, idx) => (
//                                 <li
//                                     key={idx}
//                                     className="p-4 bg-white/30 backdrop-blur-md rounded-xl shadow text-black"
//                                 >
//                                     <p className="font-bold">{slot.time}</p>
//                                     <p>{slot.rain}</p>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }




import { useState, useEffect } from "react";

export default function RainForecast() {
    const [city, setCity] = useState("");
    const [rainInfo, setRainInfo] = useState([]);

    // Sidebar states
    const [rainingNow, setRainingNow] = useState([]);
    const [rainingSoon, setRainingSoon] = useState([]);

    // Theme state
    const [theme, setTheme] = useState("default");

    // ✅ Fetch sidebar data from backend /rain-forecast
    useEffect(() => {
        const fetchRainStatus = async () => {
            try {
                const res = await fetch("http://localhost:5000/rain-forecast");
                const data = await res.json();
                setRainingNow(data.rainingNow || []);
                setRainingSoon(data.rainingSoon || []);
            } catch (err) {
                console.error("Error fetching rain sidebar:", err);
            }
        };

        fetchRainStatus();
    }, []);

    // Main page fetch for selected city
    const fetchRainData = async () => {
        if (!city) return;

        try {
            const res = await fetch(
                `http://localhost:5000/forecast/${city}?unit=metric`
            );
            const data = await res.json();

            const next24Hours = data.list.slice(0, 8);

            const info = next24Hours.map((item) => {
                const time = new Date(item.dt_txt).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                });
                const condition = item.weather[0].main;
                const desc = item.weather[0].description;

                return {
                    time,
                    rain:
                        condition.toLowerCase().includes("rain")
                            ? `🌧️ Barish hone wali hai (${desc})`
                            : `☀️ Barish nahi hogi, Mausam ${desc} rahega`,
                    condition: condition.toLowerCase(),
                };
            });

            setRainInfo(info);

            // Theme set based on first slot weather
            const firstCondition = info[0]?.condition || "";
            if (firstCondition.includes("rain")) setTheme("rain");
            else if (firstCondition.includes("clear")) setTheme("sunny");
            else if (firstCondition.includes("snow")) setTheme("snow");
            else if (firstCondition.includes("cloud")) setTheme("clouds");
            else setTheme("default");
        } catch (err) {
            console.error("Error fetching rain data:", err);
        }
    };

    const themeBackgrounds = {
        default: "/images/default.jpg",
        rain: "/images/rain.jpg",
        sunny: "/images/sunny.jpg",
        snow: "/images/snow.jpg",
        clouds: "/images/clouds.jpg",
    };

    return (
        <div className="min-h-screen flex flex-row pt-16 relative overflow-hidden text-white">
            {/* 🎨 Background Layer */}
            <div
                key={theme}
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out blur-sm"
                style={{
                    backgroundImage: `url(${themeBackgrounds[theme]})`,
                }}
            ></div>

            {/* 🌧️ Rain Overlay */}
            {theme === "rain" && (
                <div className="rain">
                    {Array.from({ length: 80 }).map((_, i) => {
                        const left = Math.random() * 100;
                        const delay = Math.random() * -20;
                        const duration = 0.5 + Math.random();
                        return (
                            <div
                                key={i}
                                className="drop"
                                style={{
                                    left: `${left}vw`,
                                    animationDuration: `${duration}s`,
                                    animationDelay: `${delay}s`,
                                }}
                            ></div>
                        );
                    })}
                </div>
            )}

            {/* ☁️ Cloud Overlay */}
            {theme === "clouds" && (
                <div className="clouds">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <img
                            key={i}
                            src="/images/cloud.png"
                            alt="cloud"
                            className="cloud"
                            style={{
                                top: `${20 + i * 15}%`,
                                left: `${-50 + i * 20}px`,
                                animationDuration: `${40 + i * 10}s`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Sidebar */}
            <div className="w-1/4 bg-white/10 backdrop-blur-md p-6 shadow-lg flex flex-col relative z-10">
                <h2 className="text-2xl font-bold mb-4">🌍 Rain Updates</h2>

                {/* Cities raining now */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">☔ Abhi Barish ho rhi hai </h3>
                    {rainingNow.length > 0 ? (
                        <ul className="space-y-2">
                            {rainingNow.map((c, idx) => (
                                <li
                                    key={idx}
                                    className="bg-white/10 p-2 rounded-lg text-center"
                                >
                                    {c}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-300">Loading...</p>
                    )}
                </div>

                {/* Cities raining soon */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">🌦️ Jaldi Barish hone wali hai </h3>
                    {rainingSoon.length > 0 ? (
                        <ul className="space-y-2">
                            {rainingSoon.map((c, idx) => (
                                <li
                                    key={idx}
                                    className="bg-white/10 p-2 rounded-lg text-center"
                                >
                                    {c}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-300">Loading...</p>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="w-3/4 flex flex-col items-center justify-start py-10 px-6 relative z-10 text-black">
                <h2 className="text-4xl font-bold mb-6">🌧️ Rain Forecast (24 Hours)</h2>

                <div className="flex gap-3 mb-8">
                    <input
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="px-4 py-2 rounded-lg text-black"
                    />
                    <button
                        onClick={fetchRainData}
                        className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-300"
                    >
                        Check Rain
                    </button>
                </div>

                {rainInfo.length > 0 && (
                    <div className="max-w-3xl w-full bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-lg text-black">
                        <h3 className="text-2xl font-semibold mb-4 text-white">
                            Agle 24 ghante ka Mausam 🌍
                        </h3>
                        <ul className="space-y-3">
                            {rainInfo.map((slot, idx) => (
                                <li
                                    key={idx}
                                    className="p-4 bg-white/30 backdrop-blur-md rounded-xl shadow text-black"
                                >
                                    <p className="font-bold">{slot.time}</p>
                                    <p>{slot.rain}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Styles for Animations */}
            <style>{`
            .rain {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                overflow: hidden;
                z-index: 5;
            }
            .drop {
                position: absolute;
                bottom: 100%;
                width: 2px;
                height: 20px;
                background: rgba(255, 255, 255, 0.6);
                animation: fall linear infinite;
            }
            @keyframes fall {
                to { transform: translateY(120vh); }
            }

            .clouds {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                overflow: hidden;
                z-index: 5;
            }
            .cloud {
                position: absolute;
                width: 200px;
                opacity: 0.7;
                animation: moveCloud linear infinite;
            }
            @keyframes moveCloud {
                from { transform: translateX(-250px); }
                to { transform: translateX(110vw); }
            }
            `}</style>
        </div>
    );
}
