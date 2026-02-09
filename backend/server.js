// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

// const app = express();
// app.use(cors());

// const API_KEY = "a10f07703facf09e2aa7230b797bcaf9"; // <-- yaha apna API key dalna

// app.get("/weather/:city", async (req, res) => {
//   const city = req.params.city;
//   const unit = req.query.unit || "metric";
  
//   console.log("👉 Request for city:", city, "with unit:", unit); // debug
//   try {
//     const response = await axios.get(
//       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
//     );
//     console.log("👉 API Temp:", response.data.main.temp, "Unit:", unit); 
//     let data = response.data;

//     // ✅ Agar user ne Fahrenheit maanga hai to manually convert karo
//     if (unit === "imperial") {
//       data.main.temp = (data.main.temp * 9) / 5 + 32;
//         console.log("👉 Converting to Fahrenheit...");
//       data.main.feels_like = (data.main.feels_like * 9) / 5 + 32;
//       data.main.temp_min = (data.main.temp_min * 9) / 5 + 32;
//       data.main.temp_max = (data.main.temp_max * 9) / 5 + 32;
//     }

//     res.json(data);
//   } catch (error) {
//     if (error.response) {
//     console.error("API Error:", error.response.data);
//   } else {
//     console.error("Error:", error.message);
//   }
//     res.status(500).json({ error: "City not found or API error" });
//   }
// });

// app.get("/", (req, res) => {
//   res.send("✅ Weather API is running! Use /weather/{city}");
// });

// app.listen(5000, () => {
//   console.log("✅ Backend running on http://localhost:5000");
// });




// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

// const app = express();
// app.use(cors());

// const API_KEY = "a10f07703facf09e2aa7230b797bcaf9"; // apna API key

// app.get("/weather/:city", async (req, res) => {
//   const city = req.params.city;
//   const unit = req.query.unit || "metric";

//   try {
//     const response = await axios.get(
//       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
//     );

//     // pura response frontend ko bhej rahe hain
//     res.json(response.data);
//   } catch (error) {
//     if (error.response) {
//       console.error("API Error:", error.response.data);
//     } else {
//       console.error("Error:", error.message);
//     }
//     res.status(500).json({ error: "City not found or API error" });
//   }
// });

// app.listen(5000, () => {
//   console.log("✅ Backend running on http://localhost:5000");
// });


// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

// const app = express();
// app.use(cors());

// const API_KEY = "a10f07703facf09e2aa7230b797bcaf9"; // apna API key

// // 👉 Current Weather API
// app.get("/weather/:city", async (req, res) => {
//   const city = req.params.city;
//   const unit = req.query.unit || "metric";

//   try {
//     const response = await axios.get(
//       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
//     );
//     res.json(response.data);
//   } catch (error) {
//     console.error("Weather API Error:", error.response?.data || error.message);
//     res.status(500).json({ error: "City not found or API error" });
//   }
// });

// // 👉 Forecast API (5-day/3-hour data)
// app.get("/forecast/:city", async (req, res) => {
//   const city = req.params.city;
//   const unit = req.query.unit || "metric";

//   try {
//     const response = await axios.get(
//       `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${unit}`
//     );
//     res.json(response.data);
//   } catch (error) {
//     console.error("Forecast API Error:", error.response?.data || error.message);
//     res.status(500).json({ error: "City not found or API error" });
//   }
// });

// app.listen(5000, () => {
//   console.log("✅ Backend running on http://localhost:5000");
// });















const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config(); // .env file se variables load karne ke liye
const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
  ],
  credentials: true,
}));
const API_KEY = process.env.API_KEY; // apna API key

// 👉 Current Weather API
app.get("/weather/:city", async (req, res) => {
  const city = req.params.city;
  const unit = req.query.unit || "metric";

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Weather API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "City not found or API error" });
  }
});

// 👉 Forecast API (5-day/3-hour data)
app.get("/forecast/:city", async (req, res) => {
  const city = req.params.city;
  const unit = req.query.unit || "metric";

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${unit}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Forecast API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "City not found or API error" });
  }
});

// 👉 Naya Route: Rain Status (Top 5 raining abhi + Top 5 raining soon)
app.get("/rain-forecast", async (req, res) => {
  try {
    // 🔹 Example: popular Indian cities (abhi ke liye fixed list, baad me bada set use kar sakte ho)
    const indianCities = [
      "Delhi",
      "Mumbai",
      "Kolkata",
      "Chennai",
      "Bangalore",
      "Hyderabad",
      "Indore",
      "Jaipur",
      "Ahmedabad",
      "Lucknow",
      "Pune",
      "Bhopal",
      "Patna",
      "Surat",
      "Nagpur"
    ];

    let rainingNow = [];
    let rainingSoon = [];

    for (const city of indianCities) {
      // Current weather check
      const current = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (
        current.data.weather &&
        current.data.weather[0].main === "Rain" &&
        rainingNow.length < 5
      ) {
        rainingNow.push(city);
      }

      // Forecast check (next 24h = 8 slots of 3h)
      const forecast = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      const rainComing = forecast.data.list
        .slice(0, 8)
        .some((slot) => slot.weather[0].main === "Rain");

      if (rainComing && rainingSoon.length < 5) {
        rainingSoon.push(city);
      }

      // Stop early if we already have 5+5
      if (rainingNow.length >= 5 && rainingSoon.length >= 5) break;
    }

    res.json({ rainingNow, rainingSoon });
  } catch (error) {
    console.error("Rain Status Error:", error.message);
    res.status(500).json({ error: "Could not fetch rain status" });
  }
});

app.listen(5000, () => {
  console.log("✅ Backend running on http://localhost:5000");
});
