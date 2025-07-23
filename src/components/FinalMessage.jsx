import React, { useEffect, useRef, useState } from "react";
import backgroundMusic from "../assets/finalmusic.mp3";

const slides = [
  { word: "Hello (ignore shitty audio)", image: "/pics/final1.jpg" },
  { word: "This year we faced our toughest fights", image: "/pics/final2.jpg" },
  { word: "Our lowest point in our relationship career (career it seems)", image: "/pics/final3.jpg" },
  { word: "But it was worth it cuz it was w u ", image: "/pics/final4.jpg" },
  { word: "cuz u know how to handle me ,how to make me happy and how to make me feel safe.", image: "/pics/final5.jpg" },
];

const videoSrc = "/pics/finalv.mp4";

export default function FinalMessage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const audioRef = useRef(null);

  // Slide transitions
  useEffect(() => {
    if (currentSlide < slides.length) {
      const timer = setTimeout(() => {
        setCurrentSlide((prev) => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      // all slides done
      setTimeout(() => setShowVideo(true), 1000);
    }
  }, [currentSlide]);

  // Background music
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, []);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* 🔊 Music */}
      <audio ref={audioRef} src={backgroundMusic} autoPlay loop hidden />

      {/* 🖼 Background Image */}
      {currentSlide < slides.length && (
        <img
          src={slides[currentSlide].image}
          alt={`bg-${currentSlide}`}
          className="absolute inset-0 w-full h-full object-contain bg-black transition-opacity duration-500 z-0"
        />
      )}

      {/* 🎥 Video */}
      {showVideo && !videoEnded && (
        <video
          src={videoSrc}
          autoPlay
          muted
          onEnded={handleVideoEnd}
          className="absolute inset-0 w-full h-full object-cover z-10"
        />
      )}

      {/* 📝 Word Display */}
      {!showVideo && currentSlide < slides.length && (
        <div className="absolute z-20 text-white text-4xl md:text-6xl font-bold text-center px-6 transition-opacity duration-700">
          <div className="bg-black bg-opacity-50 p-4 rounded-xl">
            {slides[currentSlide].word}
          </div>
        </div>
      )}

      {/* 🎉 Thank You */}
      {videoEnded && (
        <div className="absolute z-30 text-white text-5xl font-bold text-center animate-fade-in">
          Thank you for being by my side and handling me this year.<br />
          These past two years have truly been the best of my life and am lucky to have spend it with u .<br />
          Happy 2-year anniversary heres to many more. 
        </div>
      )}
    </div>
  );
}
