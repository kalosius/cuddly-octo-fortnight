import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Camera, Calendar, Sparkles, Volume2, VolumeX } from "lucide-react";

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

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const [daysTogether, setDaysTogether] = useState(0);

  useEffect(() => {
    const anniversary = new Date("2023-01-01");
    const diffTime = Math.abs(new Date() - anniversary);
    setDaysTogether(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }, []);

  const triggerFireworks = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ particleCount, origin: { x: Math.random() * 0.2 + 0.1, y: Math.random() - 0.2 } });
      confetti({ particleCount, origin: { x: Math.random() * 0.2 + 0.7, y: Math.random() - 0.2 } });
    }, 250);
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
            <h1 style={{ fontSize: "3rem", fontWeight: "bold", color: "#db2777", marginTop: "2rem" }}>For You, My Love</h1>
            <button
              onClick={handleStart}
              style={{ marginTop: "3rem", padding: "0.75rem 2rem", backgroundColor: "#db2777", borderRadius: "9999px", fontWeight: "bold", border: "none", color: "white", cursor: "pointer" }}
            >
              Open Heart ??
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {!showIntro && (
        <main style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "64rem", margin: "0 auto", padding: "5rem 1rem" }}>
          <section style={{ textAlign: "center", marginBottom: "8rem" }}>
            <Sparkles style={{ color: "#f472b6", margin: "0 auto 1.5rem" }} size={40} />
            <h1 style={{ fontSize: "5rem", color: "#f9a8d4", fontStyle: "italic" }}>Happy Birthday <br /> My Love</h1>
            <p style={{ fontSize: "1.5rem", color: "rgba(249, 168, 212, 0.8)", margin: "1rem auto 0" }}>Today the world celebrates the most beautiful soul in my life.</p>
          </section>
          <section style={{ marginBottom: "8rem" }}>
            <h2 style={{ fontSize: "3rem", textAlign: "center", marginBottom: "4rem", color: "#f9a8d4", fontStyle: "italic" }}>Our Memories</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ backgroundColor: "white", padding: "1rem 1rem 3rem", position: "relative" }}>
                  <div style={{ aspectRatio: "4/5", backgroundColor: "#fbcfe8", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(131, 24, 67, 0.2)" }}>
                    <Camera size={48} />
                  </div>
                  <p style={{ color: "#831843", textAlign: "center", marginTop: "1.5rem", fontStyle: "italic" }}>A Beautiful Day ??</p>
                </div>
              ))}
            </div>
          </section>
          <section style={{ marginBottom: "8rem", textAlign: "center", padding: "4rem 2rem", background: "rgba(131, 24, 67, 0.3)", borderRadius: "3rem" }}>
             <p style={{ fontSize: "1.5rem", fontStyle: "italic" }}>
                "Happy Birthday my love ??<br />
                You make my world brighter, my days happier, and my life more beautiful.<br />
                I love you more than words can ever explain."
              </p>
          </section>
          <section style={{ textAlign: "center", paddingBottom: "10rem" }}>
            <button
              onClick={() => { setShowSurprise(true); triggerFireworks(); }}
              style={{ padding: "1.25rem 3rem", backgroundColor: "#db2777", borderRadius: "9999px", fontWeight: "bold", fontSize: "1.5rem", border: "none", color: "white", cursor: "pointer" }}
            >
              Tap For A Surprise ??
            </button>
            {showSurprise && <p style={{ marginTop: "3rem", fontSize: "1.5rem", fontStyle: "italic" }}>"Every moment with you is a gift! Happy Birthday!"</p>}
          </section>
        </main>
      )}
    </div>
  );
};
export default App;

