import { motion } from "framer-motion";

export default function StarBurst() {
  const stars = Array.from({ length: 15 });

  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-300 rounded-full"
          initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          animate={{
            opacity: 0,
            scale: 0.5,
            x: (Math.random() - 0.5) * 600,
            y: (Math.random() - 0.5) * 600,
          }}
          transition={{ duration: 1.2 }}
        />
      ))}
    </div>
  );
}
