import { useState, useEffect } from "react";

function VideoCarousel({ videos = [], duration = 8000, showOnMobile = false }) {
  const [isMobile, setIsMobile] = useState(!showOnMobile && window.innerWidth < 768);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [failedIndices, setFailedIndices] = useState(new Set());

  useEffect(() => {
    const handleResize = () => setIsMobile(!showOnMobile && window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showOnMobile]);

  // Auto-advance
  useEffect(() => {
    if (isMobile || videos.length <= 1) return;
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % videos.length);
      // Clean up old video after fade completes
      setTimeout(() => setPrevIndex(null), 1000);
    }, duration);
    return () => clearInterval(interval);
  }, [isMobile, videos.length, duration, currentIndex]);

  const handleVideoError = (index) => {
    console.warn(`Video ${index} failed. Using gradient fallback.`);
    setFailedIndices((prev) => new Set([...prev, index]));
  };

  const allFailed = videos.length > 0 && failedIndices.size === videos.length;

  // Fallback: mobile or all videos failed
  if (isMobile || allFailed) {
    return (
      <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, #09090b 0%, #111115 50%, #18181d 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(-45deg, rgba(120,119,198,0.08), rgba(100,100,255,0.04))",
          backgroundSize: "400% 400%",
          animation: "gradientShift 15s ease infinite",
        }} />
        <style>{`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
      {/* Only render current + previous video to save memory */}
      {[currentIndex, prevIndex].filter(i => i !== null && !failedIndices.has(i)).map((index) => {
        const isActive = index === currentIndex;
        const video = videos[index];
        
        return (
          <video
            key={index}
            autoPlay={isActive}
            muted
            loop
            playsInline
            fetchpriority="low"
            preload={isActive ? "metadata" : "none"}
            onError={() => handleVideoError(index)}
            style={{
              position: "absolute",
              top: "50%", left: "50%",
              minWidth: "100%", minHeight: "100%",
              width: "auto", height: "auto",
              transform: "translate(-50%, -50%) translateZ(0)",
              objectFit: "cover",
              opacity: isActive ? 0.45 : 0,
              transition: "opacity 0.8s ease-out",
              willChange: "opacity",
              pointerEvents: "none",
            }}
          >
            <source src={video.src} type={video.type || "video/mp4"} />
          </video>
        );
      })}

      {/* Overlay & Texture */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(9,9,11,0.75) 0%, rgba(9,9,11,0.9) 100%)",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.5,
        pointerEvents: "none",
      }} />

      {/* Dots */}
      {videos.length > 1 && (
        <div style={{
          position: "absolute", bottom: "30px", left: "50%", transform: "translateX(-50%)",
          display: "flex", gap: "8px", zIndex: 10,
        }}>
          {videos.map((_, idx) => {
            if (failedIndices.has(idx)) return null;
            return (
              <button
                key={idx}
                onClick={() => { setPrevIndex(currentIndex); setCurrentIndex(idx); }}
                style={{
                  width: idx === currentIndex ? "24px" : "8px",
                  height: "4px", borderRadius: "2px",
                  background: idx === currentIndex ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
                  border: "none", padding: 0, transition: "all 0.3s ease", cursor: "pointer",
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default VideoCarousel;