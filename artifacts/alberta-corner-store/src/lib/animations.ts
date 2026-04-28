import { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const heroZoom: Variants = {
  initial: { scale: 1.05 },
  animate: {
    scale: 1,
    transition: {
      duration: 18,
      ease: "easeOut",
    },
  },
};

export const hoverScale: Variants = {
  hover: {
    scale: 1.02,
    x: 5,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

// --- ADVANCED VARIANTS ---

export const maskReveal: Variants = {
  initial: { y: "100%" },
  animate: {
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

export const clipPathReveal: Variants = {
  initial: { 
    opacity: 0,
    clipPath: "inset(5% 0% 0% 0%)",
    y: 5
  },
  whileInView: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

export const letterBounce: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};
