import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Camera, Calendar, Sparkles, Volume2, VolumeX, Flower, Flower2, Gift, Star } from "lucide-react";

import img1 from "./assets/annie/annieone.jpeg";
import img2 from "./assets/annie/annietwo.jpeg";
import img3 from "./assets/annie/annie4.jpeg";
import img4 from "./assets/annie/annie6.jpeg";
import img5 from "./assets/annie/WhatsApp Image 2026-05-24 at 21.37.57.jpeg";

import vid1 from "./assets/annie/WhatsApp Video 2026-05-24 at 21.37.56.mp4";
import vid2 from "./assets/annie/videotwo.mp4";

import birthdaySong from "./assets/birthdaysongs/HAPPY-BIRTHDAY-INSTRUMENTAL-Piano-_-Sax-_Media_ne1BjpeVj9c_009_128k.mp3";

const FloatingElements = () => {
  /* ... (FloatingElements internal logic) ... */
};

const CursorTrail = () => {
  const [dots, setDots] = useState([]);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const newDot = { id: Date.now(), x: e.clientX, y: e.clientY };
      setDots((prev) => [...prev.slice(-15), newDot]);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999 }}>
      {dots.map((dot, i) => (
        <motion.div
          key={dot.id}
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          exit={{ opacity: 0 }}
          style={{
            position: "absolute",
            left: dot.x,
            top: dot.y,
            width: "10px",
            height: "10px",
            background: i % 2 === 0 ? "#db2777" : "#f472b6",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            filter: "blur(2px)"
          }}
        />
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

const BirthdayCake = ({ onBlown }) => {
  /* ... (code omitted for brevity in thought, but I will provide full replacement) ... */
};

const GiftBox = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      if (onOpen) onOpen();
    }
  };
  
  return (
    <div style={{ textAlign: "center", margin: "4rem 0" }}>
      <motion.div
        animate={isOpen ? { scale: [1, 1.1, 1] } : {}}
        onClick={handleOpen}
        style={{ cursor: "pointer", display: "inline-block", position: "relative" }}
      >
        <motion.div
          animate={isOpen ? { y: -50, opacity: 0 } : { y: 0, opacity: 1 }}
          style={{ position: "absolute", inset: 0, zIndex: 5, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Gift size={100} style={{ color: "#db2777" }} />
        </motion.div>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ padding: "2rem", backgroundColor: "rgba(219, 39, 119, 0.1)", borderRadius: "2rem", border: "2px dashed #db2777" }}
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div style={{ fontSize: "4rem", fontWeight: "bold", color: "#db2777", marginBottom: "0.5rem", textShadow: "0 0 20px rgba(219,39,119,0.5)" }}>
                  Sweet 21 ✨
                </div>
                <Heart size={40} style={{ color: "#db2777", marginBottom: "1rem" }} fill="currentColor" />
                <p style={{ fontSize: "1.5rem", color: "#f9a8d4", fontStyle: "italic" }}>
                  "You are my greatest gift, Annie Hope."
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "1rem" }}>
                  <Flower size={30} style={{ color: "#f472b6" }} />
                  <Star size={30} style={{ color: "#fbbf24" }} />
                  <Flower size={30} style={{ color: "#f472b6" }} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isOpen && (
          <p style={{ marginTop: "1rem", color: "#f9a8d4", opacity: 0.6 }}>Tap to open your gift 🎁</p>
        )}
      </motion.div>
    </div>
  );
};

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const [daysTogether, setDaysTogether] = useState(0);
  const [showWishModal, setShowWishModal] = useState(false);
  const [wish, setWish] = useState("");
  const [isWishSent, setIsWishSent] = useState(false);
  const [isMediaReady, setIsMediaReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const audioRef = useRef(null);
  
  const allImages = [img1, img2, img3, img4, img5];
  const allVideos = [vid1, vid2];

  useEffect(() => {
    // Artificial progress for effect
    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 100); // 10 seconds total (100 * 100ms)

    // Preload Images
    const imagePromises = allImages.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve; // Continue even if one fails
      });
    });

    // Preload Videos (Basic pre-fetch hint)
    const videoPromises = allVideos.map((src) => {
      return new Promise((resolve) => {
        const video = document.createElement("video");
        video.src = src;
        video.preload = "auto";
        video.onloadeddata = resolve;
        video.onerror = resolve;
        // Timeout for video loading to not block forever
        setTimeout(resolve, 3000);
      });
    });

    Promise.all([...imagePromises, ...videoPromises]).then(() => {
      setIsMediaReady(true);
    });
  }, []);

  const captions = [
    "Your smile lights up my world ✨",
    "Pure happiness in a single frame 💖",
    "The most beautiful person I know ❤️",
    "Every moment with you is a treasure 💎",
    "Forever falling for you 🌹"
  ];

  const videoCaptions = [
    "A moment frozen in time ✨",
    "Captured in motion, forever ours ✨"
  ];

  useEffect(() => {
    const anniversary = new Date("2022-01-02");
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
    if (audioRef.current) {
      audioRef.current.currentTime = 2;
      audioRef.current.volume = 0;
      audioRef.current.play().then(() => {
        let vol = 0;
        const fadeInterval = setInterval(() => {
          if (vol < 1) {
            vol += 0.01;
            if (vol > 1) vol = 1;
            audioRef.current.volume = vol;
          } else {
            clearInterval(fadeInterval);
          }
        }, 80);
      }).catch(e => console.log("Autoplay blocked:", e));
      setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        let vol = audioRef.current.volume;
        const fadeOut = setInterval(() => {
          if (vol > 0) {
            vol -= 0.1;
            if (vol < 0) vol = 0;
            audioRef.current.volume = vol;
          } else {
            clearInterval(fadeOut);
            audioRef.current.pause();
          }
        }, 50);
      } else {
        audioRef.current.volume = 0;
        audioRef.current.play();
        let vol = 0;
        const fadeIn = setInterval(() => {
          if (vol < 1) {
            vol += 0.1;
            if (vol > 1) vol = 1;
            audioRef.current.volume = vol;
          } else {
            clearInterval(fadeIn);
          }
        }, 50);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSendWish = (e) => {
    e.preventDefault();
    if (!wish.trim()) return;
    
    const message = encodeURIComponent(`Annie Hope's Birthday Wish: ${wish}`);
    const whatsappUrl = `https://wa.me/256704978132?text=${message}`;
    
    window.open(whatsappUrl, "_blank");
    setIsWishSent(true);
    setTimeout(() => {
      setShowWishModal(false);
      setIsWishSent(false);
      setWish("");
    }, 3000);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0d0208", color: "white", fontFamily: "serif", overflowX: "hidden" }}>
      <audio ref={audioRef} src={birthdaySong} loop />
      <FloatingElements />
      <CursorTrail />

      {!showIntro && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={toggleMusic}
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: 100,
            backgroundColor: "rgba(219, 39, 119, 0.5)",
            border: "none",
            borderRadius: "9999px",
            padding: "1rem",
            color: "white",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            boxShadow: "0 0 15px rgba(219,39,119,0.3)"
          }}
        >
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </motion.button>
      )}

      <AnimatePresence>
        {showIntro && (
          <motion.div
            style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#0d0208" }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: loadingProgress === 100 ? [1, 1.2, 1] : [1, 1.05, 1],
                opacity: 1 
              }}
              transition={{ 
                duration: loadingProgress === 100 ? 0.8 : 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              style={{ position: "relative", width: "16rem", height: "16rem", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(219, 39, 119, 0.2)", borderRadius: "9999px", filter: "blur(48px)" }}></div>
              <Heart size={120} style={{ color: "#db2777" }} fill="currentColor" />
            </motion.div>
            <h1 style={{ fontSize: "3rem", fontWeight: "bold", color: "#db2777", marginTop: "2rem" }}>
              <TypewriterText text="For You, Annie Hope" speed={0.1} />
            </h1>

            <div style={{ marginTop: "2rem", width: "20rem", textAlign: "center" }}>
              <div style={{ height: "4px", width: "100%", backgroundColor: "rgba(219, 39, 119, 0.2)", borderRadius: "9999px", overflow: "hidden", position: "relative" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                  style={{ height: "100%", backgroundColor: "#db2777", boxShadow: "0 0 10px #db2777" }}
                />
              </div>
              <p style={{ marginTop: "1rem", color: "#f9a8d4", fontSize: "0.9rem", fontStyle: "italic", height: "1.5rem" }}>
                {loadingProgress < 30 ? "Gathering roses..." : 
                 loadingProgress < 60 ? "Polishing memories..." : 
                 loadingProgress < 90 ? "Adding sparkle..." : 
                 "Your surprise is ready ✨"}
              </p>
              <p style={{ color: "#db2777", fontWeight: "bold", fontSize: "1.2rem", marginTop: "0.5rem" }}>
                {loadingProgress}%
              </p>
            </div>

            <button
              onClick={handleStart}
              disabled={loadingProgress < 100 || !isMediaReady}
              style={{ 
                marginTop: "2rem", 
                padding: "0.75rem 3rem", 
                backgroundColor: (loadingProgress === 100 && isMediaReady) ? "#db2777" : "rgba(219, 39, 119, 0.3)", 
                borderRadius: "9999px", 
                fontWeight: "bold", 
                border: "none", 
                color: "white", 
                cursor: (loadingProgress === 100 && isMediaReady) ? "pointer" : "not-allowed",
                transition: "all 0.5s",
                boxShadow: (loadingProgress === 100 && isMediaReady) ? "0 0 20px rgba(219,39,119,0.5)" : "none"
              }}
            >
              {(loadingProgress === 100 && isMediaReady) ? "Open Heart ❤️" : "Preparing Your Day..."}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {!showIntro && (
        <main style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "64rem", margin: "0 auto", padding: "5rem 1rem" }}>
          <section style={{ textAlign: "center", marginBottom: "8rem" }}>
            <Sparkles style={{ color: "#f472b6", margin: "0 auto 1.5rem" }} size={40} />
            <h1 style={{ fontSize: "5rem", color: "#f9a8d4", fontStyle: "italic" }}>
              <TypewriterText text="Happy Birthday Annie Hope" delay={0.5} />
            </h1>
            <p style={{ fontSize: "1.5rem", color: "rgba(249, 168, 212, 0.8)", margin: "1rem auto 0" }}>
              <TypewriterText text="Today the world celebrates the most beautiful soul in my life." delay={2} speed={0.03} />
            </p>
          </section>
          <section style={{ marginBottom: "8rem" }}>
            <h2 style={{ fontSize: "3rem", textAlign: "center", marginBottom: "4rem", color: "#f9a8d4", fontStyle: "italic" }}>
              <TypewriterText text="Annie Hope's Beautiful Moments" />
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
            <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
              {allVideos.map((vid, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  style={{ borderRadius: "1.5rem", overflow: "hidden", backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(219, 39, 119, 0.2)", position: "relative", maxWidth: "400px", width: "100%" }}
                >
                  <video
                    src={vid}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
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
                "<TypewriterText text="Happy Birthday Annie Hope ❤️" speed={0.07} /><br />
                <TypewriterText text="You make my world brighter, my days happier, and my life more beautiful." delay={2} speed={0.04} /><br />
                <TypewriterText text="I love you more over and over again" delay={5} speed={0.04} />"
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

          {/* New Interactive Birthday Cake Section */}
          <section id="cake-section" style={{ marginBottom: "8rem", textAlign: "center" }}>
            <h2 style={{ fontSize: "3rem", marginBottom: "4rem", color: "#f9a8d4", fontStyle: "italic" }}>
              <TypewriterText text="A Sweet Treat for You" />
            </h2>
            <BirthdayCake />
          </section>

          <section id="gift-section" style={{ marginBottom: "8rem", textAlign: "center" }}>
            <h2 style={{ fontSize: "3rem", marginBottom: "4rem", color: "#f9a8d4", fontStyle: "italic" }}>
              <TypewriterText text="One Last Surprise" />
            </h2>
            <GiftBox onOpen={() => {
              triggerFireworks();
              setTimeout(triggerFireworks, 500);
              setTimeout(triggerFireworks, 1000);
            }} />
          </section>

          <section id="wish-section" style={{ paddingBottom: "10rem", textAlign: "center" }}>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "3rem", color: "#f9a8d4", fontStyle: "italic" }}>
              <TypewriterText text="Ready to Dream?" />
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowWishModal(true)}
              style={{
                padding: "1rem 3rem",
                backgroundColor: "transparent",
                border: "2px solid #db2777",
                borderRadius: "9999px",
                color: "#f472b6",
                fontWeight: "bold",
                fontSize: "1.4rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                boxShadow: "0 0 15px rgba(219,39,119,0.3)"
              }}
            >
              Make a Wish ✨
            </motion.button>
          </section>
        </main>
      )}

      <AnimatePresence>
        {showWishModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              backgroundColor: "rgba(0,0,0,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem"
            }}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              style={{
                backgroundColor: "#1a0510",
                padding: "2.5rem",
                borderRadius: "2rem",
                width: "100%",
                maxWidth: "400px",
                border: "1px solid #db2777",
                textAlign: "center"
              }}
            >
              {!isWishSent ? (
                <>
                  <h3 style={{ color: "#f9a8d4", fontSize: "1.8rem", marginBottom: "1.5rem", fontStyle: "italic" }}>What's your secret wish?</h3>
                  <form onSubmit={handleSendWish}>
                    <textarea
                      value={wish}
                      onChange={(e) => setWish(e.target.value)}
                      placeholder="Write your birthday wish here..."
                      style={{
                        width: "100%",
                        height: "120px",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(219,39,119,0.3)",
                        borderRadius: "1rem",
                        padding: "1rem",
                        color: "white",
                        fontSize: "1rem",
                        marginBottom: "1.5rem",
                        outline: "none",
                        resize: "none"
                      }}
                    />
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <button
                        type="button"
                        onClick={() => setShowWishModal(false)}
                        style={{ flex: 1, padding: "0.75rem", borderRadius: "9999px", border: "1px solid #db2777", backgroundColor: "transparent", color: "#db2777", cursor: "pointer" }}
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        style={{ flex: 1, padding: "0.75rem", borderRadius: "9999px", backgroundColor: "#db2777", border: "none", color: "white", fontWeight: "bold", cursor: "pointer" }}
                      >
                        Send Wish ✨
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <Sparkles style={{ color: "#db2777", marginBottom: "1rem" }} size={48} />
                  <h3 style={{ color: "#f9a8d4", fontSize: "1.8rem", marginBottom: "1rem" }}>Wish Sent!</h3>
                  <p style={{ color: "rgba(249, 168, 212, 0.8)" }}>Your wish has been sent to the universe (and WhatsApp) ❤️</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default App;

