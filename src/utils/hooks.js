import { useEffect, useRef, useState } from "react";

/**
 * useScrollReveal — Exact original IntersectionObserver logic, now centralized
 * Mirrors your original per-page hooks 1:1. No timing overrides.
 */
// Replace your current useScrollReveal with this version:
export function useScrollReveal(selector, visibleClass, threshold = 0.1, deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(visibleClass);
          io.unobserve(entry.target);
        }
      });
    }, { threshold });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, deps); // ✅ Now accepts dependencies
}

/**
 * useReveal — Returns [ref, isVisible] for staggered section reveals
 * Compatible with Home.jsx .hm-rv pattern
 */
export function useReveal(threshold = 0.14) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShow(true);
        io.disconnect();
      }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, show];
}

/**
 * useDelayedMount — Delays hero animation start (replaces setTimeout pattern)
 */
export function useDelayedMount(delay = 60) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return ready;
}

/**
 * usePrefersReducedMotion — For accessibility (unused until we apply it)
 */
export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(media.matches);
    const listener = (e) => setPrefersReduced(e.matches);
    media.addEventListener?.("change", listener);
    return () => media.removeEventListener?.("change", listener);
  }, []);
  return prefersReduced;
}