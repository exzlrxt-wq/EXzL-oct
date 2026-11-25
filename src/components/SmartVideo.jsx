"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Viewport-aware video player that avoids downloading/decoding all 6 portfolio
 * videos concurrently on initial page load while still pre-buffering ahead of entry.
 * Once loaded, it preserves its buffer and simply pauses when off-screen.
 */
export default function SmartVideo({ src, className, active }) {
  const videoRef = useRef(null);
  const [ioActive, setIoActive] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const useIo = active === undefined;
  const isActive = useIo ? ioActive : active;

  useEffect(() => {
    if (!useIo) return;
    const el = videoRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIoActive(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => setIoActive(entry.isIntersecting),
      { rootMargin: "600px 600px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [useIo]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (isActive) {
      if (!hasLoaded) setHasLoaded(true);
      const playPromise = el.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    } else if (hasLoaded) {
      el.pause();
    }
  }, [isActive, hasLoaded]);

  const shouldAttachSrc = hasLoaded || isActive;

  return (
    <video
      ref={videoRef}
      src={shouldAttachSrc ? src : undefined}
      className={className}
      muted
      loop
      playsInline
      preload={shouldAttachSrc ? "auto" : "none"}
    />
  );
}
