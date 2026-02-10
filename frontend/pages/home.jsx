
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  const message = `Welcome to the Weather World ☁️ 
  Janiye kaisa rahega aaj ka mausam – kya wo hoga suhana 🌤️ 
  ya phir aaj bhi barish ki wajah se ghar par beth kar gana gana padega 🎶🌧️.  
  Har din ka weather, ek naye andaaz me!`;

  useEffect(() => {
    let timer;

    if (!isDeleting && index < message.length) {
      timer = setTimeout(() => {
        setText((prev) => prev + message.charAt(index));
        setIndex(index + 1);
      }, 50);
    } else if (!isDeleting && index === message.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 5000); // 10 sec wait before deleting
    } else if (isDeleting && index > 0) {
      timer = setTimeout(() => {
        setText(message.substring(0, index - 1));
        setIndex(index - 1);
      }, 25);
    } else if (isDeleting && index === 0) {
      setIsDeleting(false);
    }

    return () => clearTimeout(timer);
  }, [index, isDeleting]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-4 sm:p-6 text-center">
      <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-6 leading-snug max-w-2xl px-2">
        {text}
        <span className="animate-pulse">|</span>
      </h1>

      {index === message.length && !isDeleting && (
        <Link
          to="/weather"
          className="px-6 py-2 text-base md:text-lg font-semibold bg-yellow-400 text-black rounded-lg shadow-lg hover:scale-105 hover:bg-yellow-300 transition-transform"
        >
          🌍 Check Weather
        </Link>
      )}
    </div>
  );
}
