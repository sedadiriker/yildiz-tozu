import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MemoryBookFlip from "./MemoryBookFlip";
import { studentBooks } from "./mockData";

const students = Object.keys(studentBooks);

export default function MemoryBook() {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const openStudentBook = (student) => setSelectedStudent(student);
  const closeStudentBook = () => setSelectedStudent(null);

  // Yıldız konumları (rasgele)
  const generatePositions = (count) => {
    const isMobile = window.innerWidth < 640; 
    const positions = [];

    while (positions.length < count) {
      const pos = {
        top: Math.random() * 70 + 15,
        left: isMobile
          ? Math.random() * 60 + 20 // mobilde daha geniş merkez aralığı
          : Math.random() * 70 + 15,
      };

      const tooClose = positions.some(
        (p) =>
          Math.abs(p.top - pos.top) < 12 && Math.abs(p.left - pos.left) < 12
      );
      if (!tooClose) positions.push(pos);
    }

    return positions;
  };

  const positions = generatePositions(students.length);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full text-white overflow-hidden">
      {/* Arka plan */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2B2E4A] via-[#00162F] to-black opacity-90 z-0"></div>

      {/* Başlık */}
      <div className="absolute top-6 w-full flex flex-col justify-center items-center z-10">
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-center
           bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300
           bg-clip-text text-transparent mb-5"
        >
          🌟 Yıldız Tozu Sınıfı 🌟
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-lg sm:text-2xl mb-10 text-center max-w-lg drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        >
          {["Biraz sevgi,", " biraz hayal... ", "Gerisi yıldız tozu ✨"].map(
            (line, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.8, duration: 1 }}
              >
                {line}
              </motion.span>
            )
          )}
        </motion.p>
      </div>

      {/* Yıldızlar */}
      {students.map((student, index) => {
        const gender = studentBooks[student]?.[0]?.gender;

        // Cinsiyete göre rengi belirle (Tailwind sınıfları)
        let starColorClass;
        let shadowColorClass;

        if (gender === "female") {
          starColorClass = "text-pink-300";
          shadowColorClass = "drop-shadow-[0_0_8px_rgba(255,192,203,0.7)]"; // Pembe gölge
        } else if (gender === "male") {
          starColorClass = "text-cyan-300";
          shadowColorClass = "drop-shadow-[0_0_8px_rgba(0,255,255,0.7)]"; // Mavi gölge
        } else {
          // Cinsiyet tanımlanmamışsa varsayılan sarı
          starColorClass = "text-yellow-300";
          shadowColorClass = "drop-shadow-[0_0_8px_rgba(255,255,0,0.7)]";
        }

        // Yıldız hareket animasyonu için benzersiz bir delay
        const delay = 4 + Math.random() * 2;

        return (
          <motion.div
            key={student} // Key olarak öğrenci ismini kullanmak daha güvenlidir
            className="absolute cursor-pointer select-none flex items-center justify-center w-[70px] h-[70px] sm:w-[90px] sm:h-[90px]"
            style={{
              top: `${positions[index].top}%`,
              left: `${positions[index].left}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0.5, y: 30 }}
            animate={{
              opacity: 1,
              scale: [1, 1.2, 1],
              y: [0, 10 * Math.cos(index), 0],
              x: [0, 10 * Math.sin(index), 0],
            }}
            transition={{
              opacity: { delay: index * 0.2, duration: 0.8 },
              scale: { repeat: Infinity, duration: delay, ease: "easeInOut" },
              y: { repeat: Infinity, duration: delay, ease: "easeInOut" },
              x: { repeat: Infinity, duration: delay, ease: "easeInOut" },
            }}
            onClick={() => openStudentBook(student)}
          >
            {/* Dinamik renk sınıfı atandı */}
            <span
              className={`absolute text-6xl sm:text-9xl ${starColorClass} ${shadowColorClass}`}
            >
              ★
            </span>
            <span className="absolute text-black font-bold text-sm sm:text-base text-center pointer-events-none">
              {student}
            </span>
          </motion.div>
        );
      })}

      {/* Modal Defter */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            key="modal"
            className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeStudentBook}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
              className="relative w-[90%]"
            >
              <MemoryBookFlip
                selectedStudent={selectedStudent}
                pages={studentBooks[selectedStudent]}
                onClose={closeStudentBook}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
