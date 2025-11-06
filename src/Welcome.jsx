// Welcome.js
import StarsBackground from "./StarsBackground";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tuba from "./assets/tuba.png";
import { useNavigate } from "react-router-dom";

export default function Welcome({ audioRef }) {
  const navigate = useNavigate();
  const [showTeacherMessage, setShowTeacherMessage] = useState(false);
  const [started, setStarted] = useState(false);
const [isAnimatingOut, setIsAnimatingOut] = useState(false); 
  const animationTimeoutRef = useRef(null);
  const navigateTimeoutRef = useRef(null);
   const handleStart = () => {
    setStarted(true);

    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      audio.currentTime = 0;
      audio.play().catch(err => console.log("Ses çalınamadı:", err));
    }

    // 1. Mesajın gösterilmesini geciktir
    setTimeout(() => setShowTeacherMessage(true), 7000);
    
    // 2. Mesajlar bittikten sonra (15 saniye), ana bileşenin çıkışını tetikle
    animationTimeoutRef.current = setTimeout(() => {
        setIsAnimatingOut(true); // <motion.div>'in çıkış animasyonunu başlatır
        
        // 3. Yönlendirmeyi, çıkış animasyon süresi (0.8s) + güvenlik marjı (0.2s) sonrasına ayarla
        navigateTimeoutRef.current = setTimeout(() => {
             navigate("/memory-book");
        }, 1000); // 1 saniye sonra yönlendir
        
    }, 15000); 
  };

   useEffect(() => {
      return () => {
          if (animationTimeoutRef.current) {
              clearTimeout(animationTimeoutRef.current);
          }
          if (navigateTimeoutRef.current) {
              clearTimeout(navigateTimeoutRef.current);
          }
      };
  }, []);

  return (
    <AnimatePresence>
   <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: "easeIn" } }} 
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative flex flex-col items-center justify-center h-screen text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#2B2E4A] via-[#00162F] to-black opacity-90 z-0"></div>
      <StarsBackground />

      <AnimatePresence>
        {!started && (
          <motion.div
            style={{ cursor: "pointer" }}
            animate={{ opacity: started ? 0 : 1, y: started ? -20 : 0 }}
            transition={{ duration: 1 }}
            onClick={handleStart}
            className="flex flex-col items-center justify-center select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <motion.span
              animate={{ y: [0, 5, 0], scale: [1, 1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="text-4xl sm:text-5xl text-yellow-300 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
            >
              ✨
            </motion.span>

            <motion.span
              animate={{ opacity: started ? 0 : 1 }}
              whileHover={{ scale: 1.2, color: "#FFD700", textShadow: "0 0 8px #FFD700" }}
              whileTap={{ scale: 1.1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="mt-2 text-lg sm:text-xl text-white cursor-pointer select-none"
            >
              Minik yıldızlar için dokun
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Açılış yazısı */}
      {started && !showTeacherMessage && (
        <>
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-4xl sm:text-6xl font-bold mb-8 text-center leading-snug drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
          >
            <span className="block text-yellow-300">Sevgiyle Parlayan</span>
            Yıldızlarımızın Anı Defteri
          </motion.h1>

        
        </>
      )}

      {showTeacherMessage && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="relative flex flex-col items-center mt-6 text-center text-3xl sm:text-4xl drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          <motion.img src={Tuba} alt="Tuba Öğretmen" className="w-32 h-32 sm:w-60 sm:h-60 rounded-full shadow-lg object-cover z-10 relative mb-6" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }} />
          {/* Mesajlar */}
          {["Minik Yıldızlardan Tuba Öğretmenimize...", "Işığınızla yolumuzu aydınlattığınız için teşekkürler ✨"].map((line, index) => (
            <motion.span key={index} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.5, duration: 2, ease: "easeOut" }} className="block mt-2 text-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
              {line}
            </motion.span>
          ))}
        </motion.div>
       )}
      {isAnimatingOut && (
          <motion.div key="exit-trigger" style={{ position: 'absolute', opacity: 0 }} />
      )}
    </motion.div>
   </AnimatePresence>
  );
}
