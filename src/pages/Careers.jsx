import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { useEffect, useState, useCallback } from "react";
import { useScrollReveal, useDelayedMount } from "../utils/hooks";
import { BUSINESS } from "../config/business.jsx";
import { Mail, MessageCircle, Phone, MapPin, Star, CheckCircle2, ArrowRight, Download, ExternalLink, ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { Helmet } from "react-helmet-async";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

:root {
  --cream:        #FFFFFF;
  --bg-soft:      #F7FDF4;
  --bg-section:   #F0FDF4;

  --green:        #65A30D;
  --green-hi:     #84CC16;
  --green-deep:   #4D7C0F;
  --green-tint:   rgba(101,163,13,0.08);
  --green-tint2:  rgba(101,163,13,0.15);

  --orange:       #F97316;
  --orange-hi:    #FB923C;
  --orange-deep:  #EA580C;
  --orange-tint:  rgba(249,115,22,0.08);

  --sky:          #0EA5E9;
  --sky-deep:     #0369A1;
  --sky-hi:       #38BDF8;

  --amber:        #D97706;
  --amber-hi:     #F59E0B;
  --amber-deep:   #92400E;

  --ink:          #111827;
  --ink-70:       #374151;
  --ink-45:       #6B7280;
  --ink-25:       #9CA3AF;

  --line:         #E5E7EB;
  --line2:        #D1D5DB;
  --shadow-sm:    0 1px 3px rgba(0,0,0,.08);
  --shadow-md:    0 4px 16px rgba(0,0,0,.08);
  --shadow-lg:    0 12px 40px rgba(0,0,0,.10);

  --fh: 'Outfit', system-ui, sans-serif;
  --fb: 'DM Sans', system-ui, sans-serif;
  --ease: cubic-bezier(.16,1,.3,1);
}

.cr*, .cr*::before, .cr*::after { box-sizing:border-box; margin:0; padding:0; }
.cr { background:var(--cream); color:var(--ink-70); font-family:var(--fb); min-height:100vh; overflow-x:hidden; }
.cr a { text-decoration:none; }

@keyframes cr-rise  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
@keyframes cr-line  { from{transform:scaleX(0)} to{transform:scaleX(1)} }
@keyframes cr-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
@keyframes cr-fade  { from{opacity:0} to{opacity:1} }
@keyframes cr-zoom  { from{opacity:0;transform:scale(.9)} to{opacity:1;transform:scale(1)} }

.cr-rv       { opacity:0; transform:translateY(32px); transition:opacity .7s var(--ease), transform .7s var(--ease); }
.cr-visible  { opacity:1 !important; transform:none !important; }

.cr-wrap { max-width:1140px; margin:0 auto; padding:0 44px; }

/* ══════════════════════════════════════
   UNIQUE HERO - Split with image
══════════════════════════════════════ */
.cr-hero {
  min-height: 75vh;
  padding: 140px 44px 80px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, var(--green-deep) 0%, var(--green) 50%, var(--green-hi) 100%);
  border-bottom: 1px solid var(--line);
}
.cr-hero::before {
  content:''; position:absolute; inset:0; pointer-events:none;
  background:
    radial-gradient(ellipse 55% 65% at 10% 55%, rgba(255,255,255,.12), transparent),
    radial-gradient(ellipse 50% 60% at 88% 18%, rgba(249,115,22,.14), transparent);
}

.cr-hero-grid {
  display:grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 64px;
  align-items: center;
  position: relative;
  z-index: 2;
  max-width: 1140px;
  margin: 0 auto;
}

.cr-hero-content { color: #fff; }
.cr-hero-eyebrow {
  display:inline-flex; align-items:center; gap:10px;
  font-family:var(--fb); font-size:11px; font-weight:600;
  letter-spacing:.22em; text-transform:uppercase;
  color: rgba(255,255,255,.85); margin-bottom:24px;
}
.cr-hero-eyebrow::before {
  content:''; display:block; width:24px; height:2px;
  background:var(--orange-hi); border-radius:2px;
}
.cr-hero-title {
  font-family:var(--fh);
  font-size:clamp(42px,5.5vw,72px);
  font-weight:800; line-height:.95;
  letter-spacing:-.04em;
  color: #fff;
  margin-bottom: 24px;
}
.cr-hero-title .accent {
  background:linear-gradient(135deg, var(--orange-hi) 0%, #FDE68A 100%);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
  background-clip:text;
}
.cr-hero-sub {
  font-family:var(--fb); font-size:17px; font-weight:400;
  color: rgba(255,255,255,.9); line-height:1.8; max-width:480px;
  margin-bottom: 32px;
}

/* Hero visual - job card preview */
.cr-hero-visual {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cr-hero-card {
  background: #fff;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 30px 70px rgba(0,0,0,.25);
  max-width: 380px;
  width: 100%;
  animation: cr-pulse 4s ease-in-out infinite;
}
.cr-hero-card-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--line);
}
.cr-hero-card-icon {
  width: 50px; height: 50px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--green), var(--green-hi));
  display: flex; align-items: center; justify-content: center;
  color: #fff;
}
.cr-hero-card-title {
  font-family: var(--fh);
  font-size: 16px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.3;
}
.cr-hero-card-location {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--fb);
  font-size: 13px;
  color: var(--ink-45);
  margin-top: 4px;
}
.cr-hero-card-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 16px;
}
.cr-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border-radius: 100px;
  font-family: var(--fb);
  font-size: 11px;
  font-weight: 600;
}
.cr-badge-full {
  background: var(--green-tint);
  color: var(--green-deep);
}
.cr-badge-urgent {
  background: var(--orange-tint);
  color: var(--orange-deep);
}

/* ══════════════════════════════════════
   FLYER CAROUSEL SECTION (FIXED)
══════════════════════════════════════ */
.cr-carousel-section {
  background: var(--bg-soft);
  padding: 60px 0;
  border-bottom: 1px solid var(--line);
}
.cr-carousel-container {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}
.cr-carousel-wrapper {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  background: #fff;
  cursor: pointer;
  transition: transform .3s var(--ease), box-shadow .3s;
}
.cr-carousel-wrapper:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 50px rgba(0,0,0,.15);
}
.cr-carousel-slide {
  display: block;
  animation: cr-fade 0.6s var(--ease);
}
.cr-carousel-image {
  width: 100%;
  height: auto;
  display: block;
  aspect-ratio: 3/4;
  object-fit: contain;
  background: #f9fafb;
}
.cr-carousel-expand {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255,255,255,.95);
  border: 2px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all .25s var(--ease);
  box-shadow: var(--shadow-md);
  color: var(--ink);
  z-index: 2;
}
.cr-carousel-expand:hover {
  background: #fff;
  border-color: var(--green);
  color: var(--green);
  transform: scale(1.1);
}
.cr-carousel-caption {
  text-align: center;
  padding: 16px;
  background: #fff;
  border-top: 1px solid var(--line);
  font-family: var(--fb);
  font-size: 13px;
  color: var(--ink-45);
}

/* Lightbox Modal */
.cr-lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(17,24,39,.95);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  animation: cr-fade .3s var(--ease);
}
.cr-lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  animation: cr-zoom .3s var(--ease);
}
.cr-lightbox-image {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 30px 80px rgba(0,0,0,.5);
}
.cr-lightbox-close {
  position: absolute;
  top: -50px;
  right: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255,255,255,.1);
  border: 2px solid rgba(255,255,255,.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  transition: all .25s;
}
.cr-lightbox-close:hover {
  background: rgba(255,255,255,.2);
  border-color: rgba(255,255,255,.4);
  transform: rotate(90deg);
}

/* ══════════════════════════════════════
   JOB DETAILS SECTION
══════════════════════════════════════ */
.cr-section { padding: 96px 0; }

.cr-job-container {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 40px;
  align-items: start;
}

/* Main job content */
.cr-job-main {
  background: #fff;
  border-radius: 24px;
  padding: 48px;
  box-shadow: var(--shadow-md);
  border-top: 4px solid var(--orange);
}
.cr-job-header {
  margin-bottom: 40px;
  padding-bottom: 32px;
  border-bottom: 2px solid var(--line);
}
.cr-job-position {
  font-family: var(--fh);
  font-size: clamp(24px, 3.5vw, 36px);
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 12px;
  line-height: 1.2;
}
.cr-job-position span {
  color: var(--orange);
}
.cr-job-location {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--fb);
  font-size: 14px;
  color: var(--ink-45);
}

.cr-section-title {
  font-family: var(--fh);
  font-size: 20px;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.cr-section-icon {
  width: 32px; height: 32px;
  border-radius: 8px;
  background: var(--green-tint);
  display: flex; align-items: center; justify-content: center;
  color: var(--green);
}

.cr-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.cr-list-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
  font-family: var(--fb);
  font-size: 14.5px;
  color: var(--ink-70);
  line-height: 1.6;
}
.cr-list-item:last-child { border-bottom: none; }
.cr-list-icon {
  flex-shrink: 0;
  width: 20px; height: 20px;
  color: var(--green);
  margin-top: 2px;
}

.cr-offer-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 20px;
}
.cr-offer-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  background: var(--bg-soft);
  border-radius: 12px;
  border: 1px solid var(--line);
}
.cr-offer-star {
  color: var(--orange);
  flex-shrink: 0;
}
.cr-offer-text {
  font-family: var(--fb);
  font-size: 14px;
  font-weight: 500;
  color: var(--ink-70);
}

/* Sidebar */
.cr-sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Apply card */
.cr-apply-card {
  background: linear-gradient(135deg, var(--green-deep) 0%, var(--green) 100%);
  border-radius: 20px;
  padding: 32px 28px;
  box-shadow: var(--shadow-lg);
  color: #fff;
}
.cr-apply-title {
  font-family: var(--fh);
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
}
.cr-apply-subtitle {
  font-family: var(--fb);
  font-size: 13.5px;
  color: rgba(255,255,255,.8);
  margin-bottom: 24px;
}

.cr-apply-method {
  margin-bottom: 24px;
}
.cr-apply-label {
  font-family: var(--fb);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(255,255,255,.7);
  margin-bottom: 12px;
}
.cr-phone-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.cr-phone-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: rgba(255,255,255,.15);
  border-radius: 12px;
  font-family: var(--fh);
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  transition: background .25s, transform .25s;
}
.cr-phone-item:hover {
  background: rgba(255,255,255,.25);
  transform: translateX(4px);
}

.cr-apply-online {
  display: block;
  width: 100%;
  padding: 16px;
  background: #fff;
  color: var(--green-deep);
  font-family: var(--fh);
  font-size: 14px;
  font-weight: 700;
  border-radius: 12px;
  text-align: center;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(0,0,0,.15);
  transition: transform .25s var(--ease), box-shadow .25s;
  margin-bottom: 12px;
}
.cr-apply-online:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,.2);
}
.cr-apply-email {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  background: rgba(255,255,255,.1);
  border-radius: 12px;
  font-family: var(--fb);
  font-size: 13px;
  color: rgba(255,255,255,.9);
  text-decoration: none;
  transition: background .25s;
}
.cr-apply-email:hover {
  background: rgba(255,255,255,.2);
}

/* Info card */
.cr-info-card {
  background: #fff;
  border-radius: 20px;
  padding: 28px;
  box-shadow: var(--shadow-md);
  border: 1.5px solid var(--line);
}
.cr-info-title {
  font-family: var(--fh);
  font-size: 16px;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.cr-info-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
}
.cr-info-item:last-child { border-bottom: none; }
.cr-info-icon {
  width: 36px; height: 36px;
  border-radius: 10px;
  background: var(--orange-tint);
  display: flex; align-items: center; justify-content: center;
  color: var(--orange);
  flex-shrink: 0;
}
.cr-info-content {
  flex: 1;
}
.cr-info-label {
  font-family: var(--fb);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .05em;
  text-transform: uppercase;
  color: var(--ink-45);
  margin-bottom: 4px;
}
.cr-info-value {
  font-family: var(--fb);
  font-size: 14px;
  color: var(--ink-70);
  line-height: 1.5;
}

/* Responsive */
@media(max-width:1024px){
  .cr-hero-grid { grid-template-columns: 1fr; text-align: center; }
  .cr-hero-sub { margin: 0 auto 32px; }
  .cr-hero-visual { order: -1; }
  .cr-job-container { grid-template-columns: 1fr; }
  .cr-sidebar { order: -1; }
}
@media(max-width:768px){
  .cr-wrap { padding: 0 22px; }
  .cr-hero { padding: 120px 22px 60px; }
  .cr-section { padding: 64px 0; }
  .cr-job-main { padding: 32px 24px; }
  .cr-offer-grid { grid-template-columns: 1fr; }
  .cr-apply-card { padding: 24px 20px; }
  .cr-carousel-container { max-width: 100%; }
  .cr-lightbox { padding: 20px 10px; }
  .cr-lightbox-close { top: -45px; }
}
@media(max-width:560px){
  .cr-hero-title { font-size: 36px; }
  .cr-job-position { font-size: 22px; }
}
`;

function StyleTag() {
  useEffect(() => {
    if (document.getElementById("cr-css-v3")) return;
    const el = document.createElement("style");
    el.id = "cr-css-v3"; el.textContent = CSS;
    document.head.prepend(el);
    return () => el.remove();
  }, []);
  return null;
}

/* ══════════════════════════════════════
   IMAGE CAROUSEL COMPONENT (FIXED)
══════════════════════════════════════ */
function ImageCarousel({ images }) {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto-advance every 6 seconds (only if multiple images)
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, images.length]);

  // Close lightbox on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    if (lightboxOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [lightboxOpen]);

  if (images.length === 0) return null;

  const currentImage = images[current];

  return (
    <>
      <div className="cr-carousel-container">
        <div 
          className="cr-carousel-wrapper"
          onClick={() => setLightboxOpen(true)}
        >
          {/* Expand button */}
          <button 
            className="cr-carousel-expand"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(true);
            }}
            aria-label="Expand image"
          >
            <Maximize2 size={18} />
          </button>

          {/* Image */}
          <div className="cr-carousel-slide">
            {currentImage.src ? (
              <img 
                src={currentImage.src} 
                alt={currentImage.alt || "Job Advert"} 
                className="cr-carousel-image"
              />
            ) : (
              <div style={{
                width: '100%',
                aspectRatio: '3/4',
                background: 'linear-gradient(135deg, var(--green-tint) 0%, var(--orange-tint) 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px',
                textAlign: 'center',
              }}>
                <Download size={48} style={{ color: 'var(--green)', marginBottom: '16px' }} />
                <div style={{ fontFamily: 'var(--fh)', fontSize: '20px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px' }}>
                  {currentImage.title || "Job Flyer"}
                </div>
                <div style={{ fontFamily: 'var(--fb)', fontSize: '13px', color: 'var(--ink-70)' }}>
                  {currentImage.desc || "Click to view full size"}
                </div>
              </div>
            )}
          </div>

          {/* Caption */}
          <div className="cr-carousel-caption">
            {currentImage.caption || "Click to expand • Press ESC to close"}
          </div>
        </div>

        {/* Dots navigation (only if multiple images) */}
        {images.length > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '20px',
          }}>
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                style={{
                  width: index === current ? '28px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: index === current ? 'var(--green)' : 'var(--line2)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all .25s var(--ease)',
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="cr-lightbox"
          onClick={() => setLightboxOpen(false)}
        >
          <div 
            className="cr-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="cr-lightbox-close"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close"
            >
              <X size={24} />
            </button>
            {currentImage.src ? (
              <img 
                src={currentImage.src} 
                alt={currentImage.alt || "Job Advert"} 
                className="cr-lightbox-image"
              />
            ) : (
              <div style={{
                width: '100%',
                maxWidth: '600px',
                aspectRatio: '3/4',
                background: 'linear-gradient(135deg, var(--green-tint) 0%, var(--orange-tint) 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '60px',
                textAlign: 'center',
                borderRadius: '12px',
              }}>
                <Download size={64} style={{ color: 'var(--green)', marginBottom: '24px' }} />
                <div style={{ fontFamily: 'var(--fh)', fontSize: '28px', fontWeight: 700, color: 'var(--ink)', marginBottom: '12px' }}>
                  {currentImage.title || "Job Flyer"}
                </div>
                <div style={{ fontFamily: 'var(--fb)', fontSize: '15px', color: 'var(--ink-70)', maxWidth: '400px' }}>
                  {currentImage.desc || "No image available"}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default function Careers() {
  const go = useDelayedMount(60);
  useScrollReveal(".cr-rv", "cr-visible");

  const hi = (delay) => ({
    opacity: go ? 1 : 0,
    animation: go ? `cr-rise .7s ${delay}s var(--ease) forwards` : "none",
  });

  // Carousel images - add your job flyer here
  const carouselImages = [
    { 
      src: "/job-advert.jpg", 
      alt: "Field Operations & Technical Lead Job Advert - Chapman Prestige Limited",
      title: "Job Flyer",
      desc: "Download our job advert to learn more about this opportunity",
      caption: "Field Operations & Technical Lead Position"
    },
    // Add more images here if needed:
    // { src: "/image2.jpg", alt: "Another image", caption: "Description" }
  ];

  return (
    <PageWrapper>
      <StyleTag />
      <Helmet>
        <title>Careers | Field Operations & Technical Lead - Chapman Prestige Limited</title>
        <meta name="description" content="Join Chapman Prestige Limited as Field Operations & Technical Lead in Kumasi. Competitive salary, growth opportunities. Apply now!" />
        <link rel="canonical" href="https://chapmanprestigelimited.com/careers" />
      </Helmet>

      <div className="cr">
        {/* ══ UNIQUE HERO ══ */}
        <section className="cr-hero">
          <div className="cr-hero-grid">
            <div className="cr-hero-content">
              <div className="cr-hero-eyebrow" style={hi(0)}>
                We're Hiring
              </div>
              <h1 className="cr-hero-title" style={hi(0.1)}>
                Join Our Team at<br/>
                <span className="accent">Chapman Prestige.</span>
              </h1>
              <p className="cr-hero-sub" style={hi(0.2)}>
                We're looking for a hardworking, responsible, and dedicated individual to join our team in Kumasi.
              </p>
            </div>

            <div className="cr-hero-visual" style={hi(0.3)}>
              <div className="cr-hero-card">
                <div className="cr-hero-card-header">
                  <div className="cr-hero-card-icon">
                    <CheckCircle2 size={28} />
                  </div>
                  <div>
                    <div className="cr-hero-card-title">
                      Field Operations &<br/>Technical Lead
                    </div>
                    <div className="cr-hero-card-location">
                      <MapPin size={14} />
                      Kumasi, Ashanti Region
                    </div>
                  </div>
                </div>
                <div className="cr-hero-card-badges">
                  <span className="cr-badge cr-badge-full">
                    <CheckCircle2 size={12} />
                    Full-time
                  </span>
                  <span className="cr-badge cr-badge-urgent">
                    <Star size={12} />
                    Urgent
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ FLYER CAROUSEL ══ */}
        <section className="cr-carousel-section">
          <div className="cr-wrap">
            <ImageCarousel images={carouselImages} />
          </div>
        </section>

        {/* ══ JOB DETAILS ══ */}
        <section className="cr-section">
          <div className="cr-wrap">
            <div className="cr-job-container">
              
              {/* Main Content */}
              <div className="cr-job-main cr-rv">
                <div className="cr-job-header">
                  <h2 className="cr-job-position">
                    Field Operations & <span>Technical Lead</span>
                  </h2>
                  <div className="cr-job-location">
                    <MapPin size={16} />
                    Kwadaso–Ohwimase, Kumasi (Frankatson Agrochemicals)
                  </div>
                </div>

                {/* Responsibilities */}
                <div style={{ marginBottom: 40 }}>
                  <h3 className="cr-section-title">
                    <div className="cr-section-icon">
                      <CheckCircle2 size={18} />
                    </div>
                    Responsibilities
                  </h3>
                  <ul className="cr-list">
                    <li className="cr-list-item">
                      <CheckCircle2 className="cr-list-icon" size={20} />
                      Support laundry and cleaning operations
                    </li>
                    <li className="cr-list-item">
                      <CheckCircle2 className="cr-list-icon" size={20} />
                      Supervise cleaning staff
                    </li>
                    <li className="cr-list-item">
                      <CheckCircle2 className="cr-list-icon" size={20} />
                      Assist with fumigation activities
                    </li>
                    <li className="cr-list-item">
                      <CheckCircle2 className="cr-list-icon" size={20} />
                      Recruit and manage cleaning personnel
                    </li>
                    <li className="cr-list-item">
                      <CheckCircle2 className="cr-list-icon" size={20} />
                      Ensure excellent customer service
                    </li>
                  </ul>
                </div>

                {/* Requirements */}
                <div style={{ marginBottom: 40 }}>
                  <h3 className="cr-section-title">
                    <div className="cr-section-icon">
                      <Star size={18} />
                    </div>
                    Requirements
                  </h3>
                  <ul className="cr-list">
                    <li className="cr-list-item">
                      <CheckCircle2 className="cr-list-icon" size={20} />
                      Ability to read, write and communicate effectively
                    </li>
                    <li className="cr-list-item">
                      <CheckCircle2 className="cr-list-icon" size={20} />
                      Hardworking and willing to learn
                    </li>
                    <li className="cr-list-item">
                      <CheckCircle2 className="cr-list-icon" size={20} />
                      Team player
                    </li>
                    <li className="cr-list-item">
                      <CheckCircle2 className="cr-list-icon" size={20} />
                      Experience in cleaning, laundry or supervision is an advantage but not required
                    </li>
                  </ul>
                </div>

                {/* What We Offer */}
                <div>
                  <h3 className="cr-section-title">
                    <div className="cr-section-icon">
                      <Star size={18} />
                    </div>
                    What We Offer
                  </h3>
                  <div className="cr-offer-grid">
                    <div className="cr-offer-item">
                      <Star className="cr-offer-star" size={20} />
                      <span className="cr-offer-text">Competitive salary</span>
                    </div>
                    <div className="cr-offer-item">
                      <Star className="cr-offer-star" size={20} />
                      <span className="cr-offer-text">Career growth opportunities</span>
                    </div>
                    <div className="cr-offer-item">
                      <Star className="cr-offer-star" size={20} />
                      <span className="cr-offer-text">Professional working environment</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="cr-sidebar">
                
                {/* Apply Card */}
                <div className="cr-apply-card cr-rv">
                  <h3 className="cr-apply-title">Ready to Apply?</h3>
                  <p className="cr-apply-subtitle">
                    Applications are reviewed as they are received.
                  </p>

                  <div className="cr-apply-method">
                    <div className="cr-apply-label">Call / WhatsApp</div>
                    <div className="cr-phone-list">
                      <a href="tel:+233542128342" className="cr-phone-item">
                        <Phone size={18} />
                        054 212 8342
                      </a>
                      <a href="tel:+233534134809" className="cr-phone-item">
                        <Phone size={18} />
                        053 413 4809
                      </a>
                      <a href="tel:+233232276648" className="cr-phone-item">
                        <Phone size={18} />
                        023 227 6648
                      </a>
                    </div>
                  </div>

                  <a 
                    href="https://forms.gle/9UwAtwj8ofcTMFKSA" 
                    target="_blank" 
                    rel="noreferrer"
                    className="cr-apply-online"
                  >
                    <ExternalLink size={16} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} />
                    Apply Online Here
                  </a>

                  <a href="mailto:chapmanprestigeltd1@gmail.com" className="cr-apply-email">
                    <Mail size={16} />
                    chapmanprestigeltd1@gmail.com
                  </a>
                </div>

                {/* Info Card */}
                <div className="cr-info-card cr-rv">
                  <h3 className="cr-info-title">
                    <MapPin size={20} />
                    Location
                  </h3>
                  <div className="cr-info-item">
                    <div className="cr-info-icon">
                      <MapPin size={18} />
                    </div>
                    <div className="cr-info-content">
                      <div className="cr-info-label">Address</div>
                      <div className="cr-info-value">
                        Kwadaso–Ohwimase, Kumasi<br/>
                        (Frankatson Agrochemicals)<br/>
                        Ashanti Region, Ghana
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}