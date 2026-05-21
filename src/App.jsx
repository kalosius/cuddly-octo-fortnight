import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Camera, Calendar, Sparkles, Volume2, VolumeX } from "lucide-react";

import img1 from "./assets/leticia/leticiaone.jpg";
import img2 from "./assets/leticia/leticiatwo.jpg";
import img3 from "./assets/leticia/leticiathree.jpg";
import img4 from "./assets/leticia/leticiafour.jpg";
import img5 from "./assets/leticia/leticiafive.jpg";

import vid1 from "./assets/leticia/VID-leticiaone.mp4";
import vid2 from "./assets/leticia/VID-leticiatwo.mp4";
import vid3 from "./assets/leticia/VID-leticiathree.mp4";
import vid4 from "./assets/leticia/VID-leticiafour.mp4";
import vid5 from "./assets/leticia/VID-leticiafive.mp4";
import vid6 from "./assets/leticia/VID-leticiasix.mp4";
import vid7 from "./assets/leticia/VID-leticiaseven.mp4";

const FloatingElements = () => {
  const [elements, setElements] = useState([]);
  useEffect(() => {
    setElements(Array.from({ length: 20 }).map((_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 20 + 10, duration: Math.random() * 10 + 10, delay: Math.random() * 5,
    })));
  }, []);
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {elements.map((el) => (
        <motion.div
          key={el.id}
          style={{ position: "absolute", color: "rgba(236, 72, 153, 0.2)" }}
          initial={{ left: el.x + "%", top: "110vh", opacity: 0 }}
          animate={{ top: "-10vh", opacity: [0, 0.5, 0], rotate: 360 }}
          transition={{ duration: el.duration, repeat: Infinity, delay: el.delay, ease: "linear" }}
        >
          <Heart size={el.size} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};

const TypewriterText = ({ text, delay = 0, speed = 0.05 }) => {
  const characters = text.split("");
  return (
    <motion.span>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.1,
            delay: delay + index * speed,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const [daysTogether, setDaysTogether] = useState(0);

  const captions = [
    "Your smile lights up my world ✨",
    "Pure happiness in a single frame 💖",
    "The most beautiful person I know ❤️",
    "Every moment with you is a treasure 💎",
    "Forever falling for you 🌹"
  ];

  const videoCaptions = [
    "A moment frozen in time ✨",
    "Your grace in every move 💃",
    "That laugh I could listen to forever 💖",
    "Pure elegance and soul 🌹",
    "The magic of you 🪄",
    "A glimpse into paradise 🏝️",
    "My favorite adventure 🗺️"
  ];

  useEffect(() => {
    const anniversary = new Date("2026-02-07");
    const diffTime = Math.abs(new Date() - anniversary);
    setDaysTogether(Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1);
  }, []);

  useEffect(() => {
    if (!showIntro) {
      const interval = setInterval(() => {
        triggerFireworks();
      }, 15000);
      return () => clearInterval(interval);
    }
  }, [showIntro]);

  const triggerFireworks = () => {
    const styles = [
      // Style 1: Burst from bottom corners
      () => {
        const duration = 3 * 1000;
        const end = Date.now() + duration;
        (function frame() {
          confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.8 }, colors: ["#db2777", "#f472b6"] });
          confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.8 }, colors: ["#db2777", "#fbcfe8"] });
          if (Date.now() < end) requestAnimationFrame(frame);
        }());
      },
      // Style 2: Random center bursts
      () => {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ["#db2777", "#ffffff", "#f9a8d4"], scalar: 1.2 });
      },
      // Style 3: Shower from top
      () => {
        const duration = 3 * 1000;
        const end = Date.now() + duration;
        (function frame() {
          confetti({ particleCount: 2, angle: 270, spread: 360, origin: { x: Math.random(), y: -0.2 }, ticks: 200, colors: ["#db2777", "#fce7f3"] });
          if (Date.now() < end) requestAnimationFrame(frame);
        }());
      }
    ];

    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    randomStyle();
  };

  const handleStart = () => {
    setShowIntro(false);
    triggerFireworks();
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0d0208", color: "white", fontFamily: "serif", overflowX: "hidden" }}>
      <FloatingElements />
      <AnimatePresence>
        {showIntro && (
          <motion.div
            style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#0d0208" }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              style={{ position: "relative", width: "16rem", height: "16rem", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(219, 39, 119, 0.2)", borderRadius: "9999px", filter: "blur(48px)" }}></div>
              <Heart size={120} style={{ color: "#db2777" }} fill="currentColor" />
            </motion.div>
            <h1 style={{ fontSize: "3rem", fontWeight: "bold", color: "#db2777", marginTop: "2rem" }}>
              <TypewriterText text="For You, Leticia" speed={0.1} />
            </h1>
            <button
              onClick={handleStart}
              style={{ marginTop: "3rem", padding: "0.75rem 2rem", backgroundColor: "#db2777", borderRadius: "9999px", fontWeight: "bold", border: "none", color: "white", cursor: "pointer" }}
            >
              Open Heart ❤️
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {!showIntro && (
        <main style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "64rem", margin: "0 auto", padding: "5rem 1rem" }}>
          <section style={{ textAlign: "center", marginBottom: "8rem" }}>
            <Sparkles style={{ color: "#f472b6", margin: "0 auto 1.5rem" }} size={40} />
            <h1 style={{ fontSize: "5rem", color: "#f9a8d4", fontStyle: "italic" }}>
              <TypewriterText text="Happy Birthday Leticia" delay={0.5} />
            </h1>
            <p style={{ fontSize: "1.5rem", color: "rgba(249, 168, 212, 0.8)", margin: "1rem auto 0" }}>
              <TypewriterText text="Today the world celebrates the most beautiful soul in my life." delay={2} speed={0.03} />
            </p>
          </section>
          <section style={{ marginBottom: "8rem" }}>
            <h2 style={{ fontSize: "3rem", textAlign: "center", marginBottom: "4rem", color: "#f9a8d4", fontStyle: "italic" }}>
              <TypewriterText text="Leticia's Beautiful Moments" />
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
              {[img1, img2, img3, img4, img5].map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -10, rotate: i % 2 === 0 ? 2 : -2 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  style={{ backgroundColor: "white", padding: "1rem 1rem 3rem", position: "relative", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)" }}
                >
                  <div style={{ aspectRatio: "4/5", backgroundColor: "#fbcfe8", overflow: "hidden", position: "relative" }}>
                    <img src={img} alt={`Memory ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <p style={{ color: "#831843", textAlign: "center", marginTop: "1.5rem", fontStyle: "italic", fontWeight: "bold" }}>
                    <TypewriterText text={captions[i]} speed={0.08} />
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          <section style={{ marginBottom: "8rem" }}>
            <h2 style={{ fontSize: "3rem", textAlign: "center", marginBottom: "4rem", color: "#f9a8d4", fontStyle: "italic" }}>
              <TypewriterText text="Captured in Motion" />
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
              {[vid1, vid2, vid3, vid4, vid5, vid6, vid7].map((vid, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  style={{ borderRadius: "1.5rem", overflow: "hidden", backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(219, 39, 119, 0.2)", position: "relative" }}
                >
                  <video
                    src={vid}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: "100%", aspectRatio: "9/16", objectFit: "cover" }}
                  />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1rem", background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}>
                    <p style={{ color: "white", fontSize: "0.9rem", fontStyle: "italic" }}>
                      <TypewriterText text={videoCaptions[i]} speed={0.08} />
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
          <section style={{ marginBottom: "8rem", textAlign: "center", padding: "4rem 2rem", background: "rgba(131, 24, 67, 0.3)", borderRadius: "3rem", border: "1px solid rgba(219, 39, 119, 0.3)" }}>
             <p style={{ fontSize: "1.5rem", fontStyle: "italic", lineHeight: "1.6" }}>
                "<TypewriterText text="Happy Birthday Leticia ❤️" speed={0.07} /><br />
                <TypewriterText text="You make my world brighter, my days happier, and my life more beautiful." delay={2} speed={0.04} /><br />
                <TypewriterText text="I love you more than words can ever explain." delay={5} speed={0.04} />"
              </p>
          </section>
          <section style={{ marginBottom: "8rem", textAlign: "center" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              style={{ display: "inline-block", padding: "2rem 3rem", backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: "9999px", border: "1px solid rgba(219, 39, 119, 0.2)" }}
            >
              <Calendar style={{ color: "#f472b6", margin: "0 auto 1rem" }} size={32} />
              <div style={{ fontSize: "4.5rem", fontWeight: "bold", color: "#db2777" }}>
                {daysTogether}
              </div>
              <p style={{ color: "#f9a8d4", marginTop: "0.5rem", fontSize: "1.25rem", fontWeight: "300", fontStyle: "italic" }}>
                <TypewriterText text="Days of sharing love together ❤️" speed={0.06} />
              </p>
            </motion.div>
          </section>
          <section style={{ textAlign: "center", paddingBottom: "10rem" }}>
            <button
              onClick={() => { setShowSurprise(true); triggerFireworks(); }}
              style={{ padding: "1.25rem 3rem", backgroundColor: "#db2777", borderRadius: "9999px", fontWeight: "bold", fontSize: "1.5rem", border: "none", color: "white", cursor: "pointer", boxShadow: "0 0 20px rgba(219,39,119,0.5)" }}
            >
              Tap For A Surprise ❤️
            </button>
            {showSurprise && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ marginTop: "3rem", fontSize: "1.8rem", fontStyle: "italic", color: "#fbcfe8" }}
              >
                "<TypewriterText text="Every moment with you is a gift! Happy Birthday!" speed={0.06} />"
              </motion.div>
            )}
          </section>
        </main>
      )}
    </div>
  );
};
export default App;

