import React from "react";
import { motion } from "framer-motion";
import { useTypewriter } from "react-simple-typewriter";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function IntroSlide() {
  const [text] = useTypewriter({
    words: ["UR BOYPRAANDDD", "MOTTAAA", "KUCHU PUCHU"],
    loop: true,
    delaySpeed: 2000,
  });

  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500 via-yellow-400 to-orange-400 animate-gradient z-0" />

      {/* Three full-height scrolling image columns */}
      <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center z-10">
        {/* Left column - scroll up */}
        <div className="w-1/3 h-full overflow-hidden">
          <div className="animate-slideUpSlow flex flex-col">
            {[...Array(2)].map((_, i) => (
              <img
                key={i}
                src="/pics/main.jpg"
                className="w-full h-screen object-cover border-[6px] border-black"
              />
            ))}
          </div>
        </div>

        {/* Middle column - scroll down */}
        <div className="w-1/3 h-full overflow-hidden">
          <div className="animate-slideDownSlow flex flex-col">
            {[...Array(2)].map((_, i) => (
              <img
                key={i}
                src="/pics/main2.jpg"
                className="w-full h-screen object-cover border-[6px] border-black"
              />
            ))}
          </div>
        </div>

        {/* Right column - scroll up */}
        <div className="w-1/3 h-full overflow-hidden">
          <div className="animate-slideUpSlow flex flex-col">
            {[...Array(2)].map((_, i) => (
              <img
                key={i}
                src="/pics/main3.jpg"
                className="w-full h-screen object-cover border-[6px] border-black"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Centered Overlay Text + CTA */}
      <div className="absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          HAPPYYY 2ND YEAR ANNIVERSARY 👋
        </h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-xl md:text-2xl text-white mb-6"
        >
          FROM YOUR <span className="text-red-600 font-semibold">{text}</span>
        </motion.p>

        <motion.button
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-black px-6 py-3 rounded-full font-semibold transition hover:bg-gray-300 mb-4"
          onClick={() => navigate("/gallery")}
        >
          CLICK ME!!!!
        </motion.button>

        <motion.div
          className="flex gap-6 justify-center text-2xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <a href="#" className="hover:text-blue-300 transition">
            <FaLinkedin />
          </a>
          <a href="#" className="hover:text-gray-300 transition">
            <FaGithub />
          </a>
          <a href="#" className="hover:text-sky-400 transition">
            <FaTwitter />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
