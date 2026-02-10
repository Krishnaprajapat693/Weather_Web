
import { useState, useEffect } from "react";

export default function RainForecast() {
    const [city, setCity] = useState("");
    const [rainInfo, setRainInfo] = useState([]);

    // Sidebar states
    const [rainingNow, setRainingNow] = useState([]);
    const [rainingSoon, setRainingSoon] = useState([]);

    // Theme state
    const [theme, setTheme] = useState("default");

    const [error, setError] = useState(null);

    // ✅ Fetch sidebar data from backend /rain-forecast
    useEffect(() => {
        const fetchRainStatus = async () => {
            try {
                const res = await fetch("https://weather-web-1vb9.onrender.com/rain-forecast");
                if (!res.ok) throw new Error("Failed to fetch rain updates");
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
        if (!city.trim()) return;
        setError(null);
        setRainInfo([]);

        try {
            const res = await fetch(
                `https://weather-web-1vb9.onrender.com/forecast/${city}?unit=metric`
            );

            if (!res.ok) {
                throw new Error("City not found");
            }

            const data = await res.json();

            if (data.cod !== "200") {
                throw new Error(data.message || "City not found");
            }

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
            setError("City not found. Please check spelling.");
            setTheme("default");
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
        <div className="min-h-screen flex flex-col lg:flex-row pt-16 relative overflow-hidden text-white">
            {/* 🎨 Background Layer */}
            <div
                key={theme}
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out blur-sm fixed"
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
            <div className="w-full lg:w-1/4 bg-white/10 backdrop-blur-md p-6 shadow-lg flex flex-col relative z-10 order-2 lg:order-1">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">🌍 Rain Updates</h2>

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
            <div className="w-full lg:w-3/4 flex flex-col items-center justify-start py-6 sm:py-10 px-4 sm:px-6 relative z-10 text-black order-1 lg:order-2">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white lg:text-black">🌧️ Rain Forecast (24 Hours)</h2>

                <div className="flex gap-3 mb-8 w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg text-black w-full"
                    />
                    <button
                        onClick={fetchRainData}
                        className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-300 whitespace-nowrap"
                    >
                        Check Rain
                    </button>
                </div>

                {error && (
                    <div className="bg-red-500/20 backdrop-blur-md border border-red-500 text-white p-4 rounded-xl mb-6 shadow-lg max-w-md w-full text-center">
                        <p className="font-semibold">{error}</p>
                    </div>
                )}

                {rainInfo.length > 0 && (
                    <div className="max-w-3xl w-full bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-lg text-black">
                        <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-white">
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
