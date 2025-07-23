import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import backgroundMusic from "../assets/wrapped-music.mp3";

const stats = [
  { text: "Minutes listened? Too little.", image: "/pics/1.jpg" },
  { text: "Minutes spent together? Never enough.", image: "/pics/2.jpg" },
  { text: "Distance the whole time? Fuck lot.", image: "/pics/3.jpg" },
  { text: "Love? Forever.", image: "/pics/4.jpg" },
];

// 🧠 create audio globally
const audio = new Audio(backgroundMusic);
audio.loop = true;
audio.volume = 0.5;

let hasStartedMusic = false;

export default function WrappedStats() {
  const [revealedCount, setRevealedCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasStartedMusic) {
      audio
        .play()
        .catch(() => {
          // autoplay blocked
          const resume = () => {
            audio.play();
            document.removeEventListener("click", resume);
          };
          document.addEventListener("click", resume);
        });
      hasStartedMusic = true;
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
      hasStartedMusic = false; // reset flag if you revisit
    };
  }, []);

  useEffect(() => {
    const handleClick = () => {
      if (revealedCount < stats.length) {
        setRevealedCount((prev) => prev + 1);
      } else {
        navigate("/end");
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [revealedCount, navigate]);

  return (
    <div className="min-h-screen w-full animate-bgPulse bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex flex-col items-center px-6 py-10 gap-10 overflow-y-auto">
      <h1 className="text-white text-3xl md:text-5xl font-bold text-center">
        Your 2025 Wrapped
      </h1>

      {stats.slice(0, revealedCount).map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-6 bg-white/10 backdrop-blur-sm rounded-xl p-6 w-full max-w-3xl shadow-xl border border-white/20"
        >
          <img
            src={item.image}
            alt={`stat-${index}`}
            className="w-40 h-40 object-cover rounded-xl border-2 border-white"
          />
          <p className="text-white text-xl md:text-2xl font-semibold text-center md:text-left">
            {item.text}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
