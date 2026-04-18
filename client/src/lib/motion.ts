import type { Variants } from 'framer-motion'

/** Staggered children fade-up — use on container */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
}

/** Single item fade up */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
}

/** Scale + fade in */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
}

/** Slide in from right */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

/** Slide in from left */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

/** Page transition wrapper */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
}

/** Step slide: for multi-step form transitions */
export const stepSlideIn: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    x: -60,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
}
