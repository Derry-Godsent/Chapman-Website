import { motion } from "framer-motion";

/* ══════════════════════════════════════════
   PageWrapper — route transition envelope
   Each page slides up and fades in,
   exits by fading + sliding up slightly.
   Clean, cinematic, not jarring.
══════════════════════════════════════════ */
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}

export default PageWrapper;