import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundMusic from "../assets/background.mp3";

// Reveal images
import secret1 from "/pics/secret1.jpg";
import secret2 from "/pics/secret2.jpg";
import secret3 from "/pics/secret3.jpg";

// Hover background groups
const bgGroups = [
  ["/pics/bg1-1.jpg", "/pics/bg1-2.jpg", "/pics/bg1-3.jpg"],
  ["/pics/bg2-1.jpg", "/pics/bg2-2.jpg", "/pics/bg2-3.jpg"],
  ["/pics/bg3-1.jpg", "/pics/bg3-2.jpg", "/pics/bg3-3.jpg"]
];

const captions = [
  "The first pic we took when we became official",
  "One of the best pic of our first year(how tf did i survive ur annoying ass idk)",
  "Two years....damn we becoming old couple anol",
];

export default function RevealGallery() {
  const [revealed, setRevealed] = useState([false, false, false]);
  const [allRevealed, setAllRevealed] = useState(false);
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const parallaxRef = useRef(null);

  // Parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30;
      const y = (e.clientY / innerHeight - 0.5) * 30;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Track when all 3 are revealed
  useEffect(() => {
    if (revealed.every((r) => r)) {
      setAllRevealed(true);
    }
  }, [revealed]);

  // Click to go to next + stop music
  useEffect(() => {
    const handleClick = () => {
      if (allRevealed) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        navigate("/next");
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [allRevealed, navigate]);

  // Reveal image
  const handleReveal = (index) => {
    if (revealed[index]) return;
    const updated = [...revealed];
    updated[index] = true;
    setRevealed(updated);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center px-6 bg-black">

      {/* 🔊 Music */}
      <audio ref={audioRef} src={backgroundMusic} autoPlay loop hidden />

      {/* ✨ Title */}
      <h2 className="absolute top-6 w-full text-center text-white text-2xl font-bold z-30">
        Lets see how far we have come
      </h2>

      {/* 🌌 Background Hover Groups */}
      <div className="absolute inset-0 z-0" ref={parallaxRef}>
        {hovered !== null &&
          bgGroups[hovered].map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className={`absolute w-full h-full object-cover
                ${i === 0 ? "animate-up" : i === 1 ? "animate-down" : "animate-up"}
                opacity-100`}
              style={{
                animationDuration: "15s",
                animationIterationCount: "infinite",
                animationTimingFunction: "linear",
              }}
            />
          ))}
      </div>

      {/* 🖼 Reveal Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleReveal(index)}
            className="relative w-full max-w-md h-[32rem] overflow-hidden rounded-xl shadow-2xl transition-transform hover:scale-105 border-4 border-white cursor-pointer bg-black/10 backdrop-blur-sm"
          >
            {!revealed[index] && (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center text-white font-semibold text-xl z-10 transition-all duration-500">
                Click to Reveal
              </div>
            )}
            <img
              src={`/pics/secret${index + 1}.jpg`}
              alt={`Secret ${index + 1}`}
              className={`w-full h-[26rem] object-cover transition-all duration-700 ${
                revealed[index]
                  ? "blur-0 scale-100 opacity-100"
                  : "blur-md scale-110 opacity-60"
              }`}
            />
            {revealed[index] && (
              <div className="p-4 text-white bg-black/60 backdrop-blur-sm transition-opacity duration-500 animate-fade-in-up h-[6rem] flex items-center justify-center text-center text-sm font-medium">
                {captions[index]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
