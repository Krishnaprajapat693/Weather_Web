







import { useState, useEffect } from "react";
import axios from "axios";

export default function Weather() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);

    const [indoreWeather, setIndoreWeather] = useState(null);
    const [indoreForecast, setIndoreForecast] = useState([]);

    const [wishText, setWishText] = useState("");
    const [wishIndex, setWishIndex] = useState(0);
    const goodWishMessage = "🌸 आपका दिन शुभ हो ❤️\nHave a Good Day...";

    const [theme, setTheme] = useState("default");

    useEffect(() => {
        let timer;
        if (wishIndex < goodWishMessage.length) {
            timer = setTimeout(() => {
                setWishText((prev) => prev + goodWishMessage.charAt(wishIndex));
                setWishIndex(wishIndex + 1);
            }, 50);
        }
        return () => clearTimeout(timer);
    }, [wishIndex]);

    // Fetch Indore Weather
    useEffect(() => {
        const fetchIndoreWeather = async () => {
            try {
                const res = await axios.get(
                    `https://weather-web-1vb9.onrender.com/weather/Indore?unit=metric`
                );
                setIndoreWeather(res.data);

                const resForecast = await axios.get(
                    `https://weather-web-1vb9.onrender.com/forecast/Indore?unit=metric`
                );

                const dailyData = {};
                resForecast.data.list.forEach((item) => {
                    const date = new Date(item.dt_txt).toLocaleDateString("en-US", {
                        weekday: "short",
                    });
                    if (!dailyData[date]) {
                        dailyData[date] = { temps: [], icon: item.weather[0].icon };
                    }
                    dailyData[date].temps.push(item.main.temp);
                });

                const formattedForecast = Object.entries(dailyData).map(([day, val]) => {
                    const avgTemp =
                        val.temps.reduce((a, b) => a + b, 0) / val.temps.length;
                    return { day, temp: Math.round(avgTemp), icon: val.icon };
                });

                setIndoreForecast(formattedForecast.slice(0, 7));
            } catch (error) {
                console.error("Error fetching Indore weather:", error);
            }
        };

        fetchIndoreWeather();
    }, []);

    // Fetch Search Weather
    const fetchWeather = async () => {
        try {
            const resWeather = await fetch(
                `https://weather-web-1vb9.onrender.com/weather/${city}?unit=metric`
            );
            const dataWeather = await resWeather.json();
            setWeather(dataWeather);

            // Set Theme
            const condition = dataWeather.weather[0].main.toLowerCase();
            if (condition.includes("rain")) setTheme("rain");
            else if (condition.includes("clear")) setTheme("sunny");
            else if (condition.includes("snow")) setTheme("snow");
            else if (condition.includes("cloud")) setTheme("clouds");
            else setTheme("default");

            const resForecast = await fetch(
                `https://weather-web-1vb9.onrender.com/forecast/${city}?unit=metric`
            );
            const dataForecast = await resForecast.json();

            const dailyData = {};
            dataForecast.list.forEach((item) => {
                const date = new Date(item.dt_txt).toLocaleDateString("en-US", {
                    weekday: "short",
                });
                if (!dailyData[date]) {
                    dailyData[date] = { temps: [], icon: item.weather[0].icon };
                }
                dailyData[date].temps.push(item.main.temp);
            });

            const formattedForecast = Object.entries(dailyData).map(([day, val]) => {
                const avgTemp =
                    val.temps.reduce((a, b) => a + b, 0) / val.temps.length;
                return { day, temp: Math.round(avgTemp), icon: val.icon };
            });

            setForecast(formattedForecast.slice(0, 7));
        } catch (error) {
            console.error("Error fetching data:", error);
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
        <div className="min-h-screen flex flex-col lg:flex-row pt-16 relative overflow-x-hidden">
            {/* 🎨 Background Image Layer */}
            <div
                key={theme}
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out blur-sm fixed"
                style={{
                    backgroundImage: `url(${themeBackgrounds[theme]})`,
                }}
            ></div>

            {/* 🌞 Sunny Overlay */}
            {theme === "sunny" && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
                    <div className="heatwave-layer"></div>
                    <div className="heatwave-layer delay"></div>
                    <div className="heatwave-layer slow"></div>
                </div>
            )}

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

            {/* ☁️ Clouds Overlay */}
            {theme === "clouds" && (
                <div className="clouds">
                    {Array.from({ length: 6 }).map((_, i) => {
                        const top = Math.random() * 60;
                        const duration = 30 + Math.random() * 40;
                        const size = 150 + Math.random() * 100;
                        return (
                            <div
                                key={i}
                                className="cloud"
                                style={{
                                    top: `${top}vh`,
                                    width: `${size}px`,
                                    height: `${size * 0.6}px`,
                                    animationDuration: `${duration}s`,
                                    animationDelay: `${-Math.random() * duration}s`,
                                }}
                            ></div>
                        );
                    })}
                </div>
            )}

            {/* Sidebar */}
            <div className="w-full lg:w-1/4 bg-white/10 backdrop-blur-md p-4 sm:p-6 shadow-lg flex flex-col items-center relative z-10 text-white order-2 lg:order-1">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">🌍 Indore Weather</h2>
                {indoreWeather ? (
                    <div className="w-full">
                        <div className="bg-white/10 p-4 rounded-2xl shadow-md mb-6">
                            <h3 className="text-xl font-semibold">
                                {indoreWeather.name}, {indoreWeather.sys.country}
                            </h3>
                            <p className="text-gray-300">{indoreWeather.weather[0].description}</p>
                            <p className="text-4xl font-bold mt-2">
                                {Math.round(indoreWeather.main.temp)}°C
                            </p>
                            <p className="text-gray-300 mt-1">
                                High {Math.round(indoreWeather.main.temp_max)}° • Low{" "}
                                {Math.round(indoreWeather.main.temp_min)}°
                            </p>
                            <p className="text-sm text-gray-400 mt-2">
                                {new Date().toLocaleString("en-US", {
                                    weekday: "long",
                                    month: "short",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                })}
                            </p>
                        </div>

                        {indoreForecast.length > 0 && (
                            <div className="bg-white/10 p-4 rounded-2xl shadow-md">
                                <h4 className="text-lg font-semibold mb-3">7-Day Forecast</h4>
                                <div className="grid grid-cols-2 lg:grid-cols-2 gap-3">
                                    {indoreForecast.map((day, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-white/5 p-3 rounded-xl flex flex-col items-center"
                                        >
                                            <p className="font-bold">{day.day}</p>
                                            <img
                                                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                                                alt="icon"
                                                className="w-10 h-10"
                                            />
                                            <p className="text-lg">{day.temp}°C</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-gray-400">Loading...</p>
                )}
            </div>

            {/* Main Content */}
            <div className="w-full lg:w-3/4 flex flex-col items-center justify-start py-6 sm:py-10 px-4 sm:px-6 relative z-10 text-black order-1 lg:order-2">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white lg:text-black">Search Weather 🌍</h2>
                <div className="flex gap-3 mb-8 w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg text-black w-full"
                    />
                    <button
                        onClick={fetchWeather}
                        className="px-4 py-2 bg-blue-500 text-black font-semibold rounded-lg shadow-md hover:bg-blue-400 whitespace-nowrap"
                    >
                        Search
                    </button>
                </div>

                {weather && (
                    <div className="max-w-3xl w-full bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-lg mb-8 text-black">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0 text-center sm:text-left">
                            <div>
                                <h3 className="text-2xl sm:text-3xl font-bold">
                                    {weather.name}, {weather.sys.country}
                                </h3>
                                <p className="text-gray-700 text-lg">
                                    {weather.weather[0].description}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {new Date().toLocaleString("en-US", {
                                        weekday: "long",
                                        month: "short",
                                        day: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                    })}
                                </p>
                            </div>
                            <div className="text-center sm:text-right">
                                <p className="text-5xl font-bold">
                                    {Math.round(weather.main.temp)}°
                                </p>
                                <p className="text-gray-700">
                                    High {Math.round(weather.main.temp_max)}° • Low{" "}
                                    {Math.round(weather.main.temp_min)}°
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {forecast.length > 0 && (
                    <div className="max-w-3xl w-full bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-lg text-black">
                        <h4 className="text-2xl font-semibold mb-4 text-center sm:text-left">7-Day Forecast</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                            {forecast.map((day, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white/30 backdrop-blur-md p-4 rounded-xl flex flex-col items-center shadow-md"
                                >
                                    <p className="font-bold">{day.day}</p>
                                    <img
                                        src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                                        alt="icon"
                                        className="w-12 h-12"
                                    />
                                    <p className="text-xl">{day.temp}°C</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Wishes */}
                <div className="text-center mt-6 text-black">
                    <p className="text-xl sm:text-2xl md:text-3xl font-semibold leading-snug max-w-xl mx-auto whitespace-pre-wrap text-white lg:text-black">
                        {wishText}
                        <span className="animate-pulse">|</span>
                    </p>
                </div>
            </div>

            {/* 🌧️ Rain + ☁️ Cloud + 🌞 Sunny Animations */}
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
                overflow: hidden;
                z-index: 4;
                pointer-events: none;
            }
            .cloud {
                position: absolute;
                background: url('/images/cloud.png') no-repeat;
                background-size: contain;
                opacity: 0.7;
                animation: moveClouds linear infinite;
            }
            @keyframes moveClouds {
                from { transform: translateX(-250px); }
                to { transform: translateX(110vw); }
            }

            /* 🌞 Sunny Animations */
            .heatwave-layer {
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: repeating-radial-gradient(
                    circle at center,
                    rgba(255, 200, 0, 0.15) 0%,
                    rgba(255, 150, 0, 0.05) 40%,
                    transparent 70%
                );
                animation: heatwave 6s ease-in-out infinite;
                mix-blend-mode: screen;
                }

                .heatwave-layer.delay {
                animation-delay: 2s;
                }

                .heatwave-layer.slow {
                animation-duration: 10s;
                opacity: 0.5;
                }

                @keyframes heatwave {
                0% {
                    transform: scale(1) rotate(0deg);
                    opacity: 0.6;
                }
                50% {
                    transform: scale(1.15) rotate(10deg);
                    opacity: 0.3;
                }
                100% {
                    transform: scale(1) rotate(0deg);
                    opacity: 0.6;
                }
                }


            `}</style>
        </div>
    );
}
