import { Link } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import { Sparkles, ShieldCheck, Truck, Droplets, X, ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import { useReveal, useDelayedMount } from "../utils/hooks";
import { Helmet } from "react-helmet-async";

const HOME_VIDEOS = [
  { src: "/videos/home-1.mp4", type: "video/mp4" },
  { src: "/videos/home-2.mp4", type: "video/mp4" },
  { src: "/videos/home-3.mp4", type: "video/mp4" },
  { src: "/videos/home-4.mp4", type: "video/mp4" },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

:root {
  --cream:        #FFFFFF;
  --bg-soft:      #F7FDF4;
  --bg-section:   #F0FDF4;
  --bg-card:      #FFFFFF;

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
  --sky-tint:     rgba(14,165,233,0.08);

  --amber:        #D97706;
  --amber-hi:     #F59E0B;
  --amber-deep:   #92400E;
  --amber-tint:   rgba(217,119,6,0.08);

  --ink:          #111827;
  --ink-70:       #374151;
  --ink-45:       #6B7280;
  --ink-25:       #9CA3AF;

  --line:         #E5E7EB;
  --line2:        #D1D5DB;
  --shadow-sm:    0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04);
  --shadow-md:    0 4px 16px rgba(0,0,0,.08), 0 2px 6px rgba(0,0,0,.04);
  --shadow-lg:    0 12px 40px rgba(0,0,0,.10), 0 4px 12px rgba(0,0,0,.05);

  --fh: 'Outfit', system-ui, sans-serif;
  --fb: 'DM Sans', system-ui, sans-serif;
  --ease: cubic-bezier(.16,1,.3,1);
  --ease2: cubic-bezier(.4,0,.2,1);
}

/* ── Reset ── */
.hm *, .hm *::before, .hm *::after { box-sizing:border-box; margin:0; padding:0; }
.hm { background:var(--cream); color:var(--ink-70); font-family:var(--fb); min-height:100vh; overflow-x:hidden; }
.hm a { text-decoration:none; }

/* ── Keyframes ── */
@keyframes hm-rise    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
@keyframes hm-fade    { from{opacity:0} to{opacity:1} }
@keyframes hm-pop     { from{opacity:0;transform:scale(.93) translateY(8px)} to{opacity:1;transform:scale(1) translateY(0)} }
@keyframes hm-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
@keyframes hm-orb     { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.08)} 66%{transform:translate(-20px,15px) scale(.95)} }
@keyframes hm-grain   { 0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)} 20%{transform:translate(3%,2%)} 30%{transform:translate(-1%,4%)} 40%{transform:translate(4%,-1%)} 50%{transform:translate(-3%,3%)} 60%{transform:translate(2%,-4%)} 70%{transform:translate(-4%,1%)} 80%{transform:translate(1%,-2%)} 90%{transform:translate(-2%,4%)} }
@keyframes hm-dot-grow { from{width:10px} to{width:28px} }

/* ── Scroll reveals ── */
.hm-rv       { opacity:0; }
.hm-rv.show  { animation:hm-rise .7s var(--ease) forwards; }
.hm-rv.d1.show { animation-delay:.06s; }
.hm-rv.d2.show { animation-delay:.13s; }
.hm-rv.d3.show { animation-delay:.20s; }
.hm-rv.d4.show { animation-delay:.27s; }

/* ── Layout ── */
.hm-wrap { max-width:1140px; margin:0 auto; padding:0 44px; }
.hm-section { padding:108px 0; }
.hm-section + .hm-section { border-top:1px solid var(--line); }

/* ── Eyebrow ── */
.hm-eyebrow {
  display:inline-flex; align-items:center; gap:10px;
  font-family:var(--fb); font-size:10.5px; font-weight:600;
  letter-spacing:.22em; text-transform:uppercase;
  color:var(--orange); margin-bottom:18px;
}
.hm-eyebrow::before {
  content:''; display:block; width:18px; height:1.5px;
  background:currentColor; border-radius:2px;
}

/* ── Headlines ── */
.hm-h1 {
  font-family:var(--fh);
  font-size:clamp(46px,6.5vw,84px);
  font-weight:800; line-height:.97;
  letter-spacing:-.04em;
  background:linear-gradient(140deg,#fff 30%,var(--orange-hi) 100%);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
  background-clip:text;
}
.hm-h2 {
  font-family:var(--fh);
  font-size:clamp(30px,4.2vw,54px);
  font-weight:800; line-height:1.04;
  letter-spacing:-.035em;
  color:var(--ink);
}
.hm-h2-white {
  font-family:var(--fh);
  font-size:clamp(30px,4.2vw,54px);
  font-weight:800; line-height:1.04;
  letter-spacing:-.035em;
  color:#fff;
}
.hm-h2-dark {
  font-family:var(--fh);
  font-size:clamp(30px,4.2vw,54px);
  font-weight:800; line-height:1.04;
  letter-spacing:-.035em;
  color:var(--ink);
}

/* ── Buttons ── */
.hm-btn-primary {
  display:inline-flex; align-items:center; gap:9px;
  background:linear-gradient(135deg,var(--green),var(--green-hi));
  color:#fff; font-family:var(--fh);
  font-size:13.5px; font-weight:700; letter-spacing:.01em;
  padding:13px 26px; border-radius:100px;
  box-shadow:0 4px 16px rgba(101,163,13,.30);
  transition:transform .25s var(--ease),box-shadow .25s,filter .25s;
}
.hm-btn-primary:hover { transform:translateY(-3px); box-shadow:0 10px 28px rgba(101,163,13,.42); filter:brightness(1.05); }
.hm-btn-primary:active { transform:translateY(-1px) scale(.97); transition-duration:.1s; }

.hm-btn-ghost {
  display:inline-flex; align-items:center; gap:9px;
  border:1.5px solid rgba(255,255,255,.35);
  color:rgba(255,255,255,.9);
  font-family:var(--fh); font-size:13.5px; font-weight:600;
  padding:12px 24px; border-radius:100px;
  transition:border-color .25s,color .25s,background .25s,transform .25s var(--ease);
  backdrop-filter:blur(8px);
}
.hm-btn-ghost:hover { border-color:rgba(255,255,255,.7); color:#fff; background:rgba(255,255,255,.12); transform:translateY(-2px); }

.hm-btn-cta-white {
  display:inline-flex; align-items:center; gap:9px;
  background:#fff;
  color:var(--green-deep); font-family:var(--fh);
  font-size:13.5px; font-weight:700; letter-spacing:.01em;
  padding:13px 26px; border-radius:100px;
  box-shadow:0 4px 20px rgba(0,0,0,.15);
  transition:transform .25s var(--ease),box-shadow .25s,filter .25s;
  margin:0 auto;
}
.hm-btn-cta-white:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(0,0,0,.2); filter:brightness(1.02); }
.hm-btn-cta-white:active { transform:translateY(-1px) scale(.97); transition-duration:.1s; }

/* ── Hero grain overlay ── */
.hm-grain {
  position:absolute; inset:-40%; width:180%; height:180%;
  opacity:.025;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:160px;
  animation:hm-grain 6s steps(1) infinite;
  pointer-events:none; z-index:2;
}

/* ── Hero orbs ── */
.hm-orb {
  position:absolute; border-radius:50%;
  filter:blur(72px); pointer-events:none;
  animation:hm-orb 14s ease-in-out infinite;
}

/* ── VIDEO CAROUSEL ── */
.hm-video-wrap {
  position:absolute; inset:0; z-index:0; overflow:hidden;
}
.hm-video-slide {
  position:absolute; inset:0;
  opacity:0; transition:opacity 1.2s ease;
}
.hm-video-slide.active { opacity:1; }
.hm-video-slide video {
  width:100%; height:100%; object-fit:cover;
  /* Slight desaturation so text always pops */
  filter:saturate(0.85) brightness(0.9);
}

/* Carousel controls */
.hm-carousel-btn {
  position:absolute; top:50%; transform:translateY(-50%);
  z-index:6; width:52px; height:52px; border-radius:50%;
  background:rgba(0,0,0,.32);
  border:2px solid rgba(255,255,255,.35);
  color:#fff; backdrop-filter:blur(12px);
  display:flex; align-items:center; justify-content:center;
  cursor:pointer; transition:background .25s,transform .35s var(--ease),border-color .25s,box-shadow .25s;
}
.hm-carousel-btn:hover {
  background:rgba(249,115,22,.75);
  border-color:var(--orange-hi);
  box-shadow:0 0 0 4px rgba(249,115,22,.25);
  transform:translateY(-50%) scale(1.1);
}
.hm-carousel-btn:active { transform:translateY(-50%) scale(.95); }
.hm-carousel-prev { left:28px; }
.hm-carousel-next { right:28px; }

/* ── Carousel dots — pill style ── */
.hm-carousel-dots {
  position:absolute; bottom:32px; left:50%; transform:translateX(-50%);
  z-index:6; display:flex; gap:8px; align-items:center;
  background:rgba(0,0,0,.28); backdrop-filter:blur(8px);
  padding:8px 14px; border-radius:100px;
  border:1px solid rgba(255,255,255,.15);
}
.hm-carousel-dot {
  height:10px; width:10px; border-radius:100px;
  background:rgba(255,255,255,.40);
  border:none; padding:0;
  cursor:pointer;
  transition:background .35s var(--ease), width .35s var(--ease);
  flex-shrink:0;
}
.hm-carousel-dot.active {
  width:28px;
  background:var(--orange-hi);
}

/* ── Service cards — per-card accent colors ── */

/* Card base */
.hm-card {
  background:#fff;
  border-top:4px solid transparent;
  border-left:1px solid var(--line);
  border-right:1px solid var(--line);
  border-bottom:1px solid var(--line);
  border-radius:22px; padding:36px 30px 48px;
  cursor:pointer; position:relative; overflow:hidden;
  transition:border-color .3s,background .3s,transform .38s var(--ease),box-shadow .38s var(--ease);
  box-shadow:var(--shadow-sm);
}
.hm-card::after {
  content:''; position:absolute;
  top:0; left:-100%; width:60%; height:100%;
  transition:left .55s var(--ease);
}
.hm-card:hover { transform:translateY(-8px); }
.hm-card:hover::after { left:140%; }

/* Card 1 — Laundry — Lemon Green */
.hm-card-0 {
  background:linear-gradient(160deg,#F0FDF4 0%,#fff 55%);
  border-top-color:var(--green);
}
.hm-card-0::after { background:linear-gradient(90deg,transparent,rgba(101,163,13,.07),transparent); }
.hm-card-0:hover { border-color:var(--green); box-shadow:0 22px 52px rgba(101,163,13,.18),0 0 0 1px rgba(101,163,13,.14); }
.hm-card-0 .hm-card-icon-wrap { background:rgba(101,163,13,.10); border-color:rgba(101,163,13,.25); color:var(--green); }
.hm-card-0:hover .hm-card-icon-wrap { background:var(--green); color:#fff; border-color:var(--green-hi); }
.hm-card-0 .hm-card-arrow { color:rgba(101,163,13,.30); }
.hm-card-0:hover .hm-card-arrow { color:var(--green); }

/* Card 2 — Fumigation — Orange */
.hm-card-1 {
  background:linear-gradient(160deg,#FFF7ED 0%,#fff 55%);
  border-top-color:var(--orange);
}
.hm-card-1::after { background:linear-gradient(90deg,transparent,rgba(249,115,22,.07),transparent); }
.hm-card-1:hover { border-color:var(--orange); box-shadow:0 22px 52px rgba(249,115,22,.18),0 0 0 1px rgba(249,115,22,.14); }
.hm-card-1 .hm-card-icon-wrap { background:rgba(249,115,22,.10); border-color:rgba(249,115,22,.25); color:var(--orange); }
.hm-card-1:hover .hm-card-icon-wrap { background:var(--orange); color:#fff; border-color:var(--orange-hi); }
.hm-card-1 .hm-card-arrow { color:rgba(249,115,22,.30); }
.hm-card-1:hover .hm-card-arrow { color:var(--orange); }

/* Card 3 — Car Detailing — Sky Blue */
.hm-card-2 {
  background:linear-gradient(160deg,#F0F9FF 0%,#fff 55%);
  border-top-color:var(--sky);
}
.hm-card-2::after { background:linear-gradient(90deg,transparent,rgba(14,165,233,.07),transparent); }
.hm-card-2:hover { border-color:var(--sky); box-shadow:0 22px 52px rgba(14,165,233,.18),0 0 0 1px rgba(14,165,233,.14); }
.hm-card-2 .hm-card-icon-wrap { background:rgba(14,165,233,.10); border-color:rgba(14,165,233,.25); color:var(--sky); }
.hm-card-2:hover .hm-card-icon-wrap { background:var(--sky); color:#fff; border-color:#38BDF8; }
.hm-card-2 .hm-card-arrow { color:rgba(14,165,233,.30); }
.hm-card-2:hover .hm-card-arrow { color:var(--sky); }

/* Card 4 — Deep Cleaning — Amber */
.hm-card-3 {
  background:linear-gradient(160deg,#FFFBEB 0%,#fff 55%);
  border-top-color:var(--amber-hi);
}
.hm-card-3::after { background:linear-gradient(90deg,transparent,rgba(217,119,6,.07),transparent); }
.hm-card-3:hover { border-color:var(--amber-hi); box-shadow:0 22px 52px rgba(217,119,6,.18),0 0 0 1px rgba(217,119,6,.14); }
.hm-card-3 .hm-card-icon-wrap { background:rgba(217,119,6,.10); border-color:rgba(217,119,6,.25); color:var(--amber); }
.hm-card-3:hover .hm-card-icon-wrap { background:var(--amber); color:#fff; border-color:var(--amber-hi); }
.hm-card-3 .hm-card-arrow { color:rgba(217,119,6,.30); }
.hm-card-3:hover .hm-card-arrow { color:var(--amber); }

/* Shared card sub-elements */
.hm-card-icon-wrap {
  width:50px; height:50px; border-radius:14px;
  border:1.5px solid var(--line2);
  display:flex; align-items:center; justify-content:center;
  margin-bottom:22px;
  transition:background .3s,border-color .3s,color .3s,transform .3s var(--ease);
}
.hm-card:hover .hm-card-icon-wrap { transform:scale(1.08) rotate(-4deg); }
.hm-card-title {
  font-family:var(--fh); font-size:17px; font-weight:700;
  color:var(--ink); margin-bottom:10px;
}
.hm-card-desc {
  font-family:var(--fb); font-size:13px; font-weight:400;
  color:var(--ink-45); line-height:1.65;
}
.hm-card-arrow {
  position:absolute; bottom:22px; right:24px;
  transition:color .3s,transform .3s var(--ease);
}
.hm-card:hover .hm-card-arrow { transform:translate(4px,-4px); }

/* ── About panel ── */
.hm-panel {
  background:var(--bg-section);
  border:1.5px solid var(--line);
  border-radius:26px; padding:64px 60px;
  display:grid; grid-template-columns:1fr 220px;
  gap:56px; align-items:center;
  box-shadow:var(--shadow-sm);
}

/* ── Why list ── */
.hm-why {
  display:flex; align-items:center; gap:14px;
  padding:17px 22px; border-radius:14px;
  border:1.5px solid var(--line);
  background:#fff;
  font-family:var(--fb); font-size:14px; font-weight:500;
  color:var(--ink);
  transition:border-color .28s,transform .32s var(--ease),box-shadow .32s;
  box-shadow:var(--shadow-sm);
}
.hm-why:hover { border-color:var(--green); transform:translateX(7px); box-shadow:0 4px 20px rgba(101,163,13,.12); }
.hm-why-dot {
  width:8px; height:8px; border-radius:50%;
  background:var(--green); flex-shrink:0;
  box-shadow:0 0 0 3px rgba(101,163,13,.18);
  transition:box-shadow .3s;
}
.hm-why:hover .hm-why-dot { box-shadow:0 0 0 5px rgba(101,163,13,.22); }

/* ── CTA panel ── */
.hm-cta-panel {
  background:linear-gradient(135deg,var(--green-deep) 0%,var(--green) 50%,var(--green-hi) 100%);
  border:none;
  border-radius:26px; padding:88px 60px;
  text-align:center; position:relative; overflow:hidden;
  box-shadow:0 20px 60px rgba(101,163,13,.30);
}
.hm-cta-panel::before {
  content:''; position:absolute;
  top:-120px; left:50%; transform:translateX(-50%);
  width:480px; height:480px; border-radius:50%;
  background:radial-gradient(circle,rgba(255,255,255,.10),transparent 70%);
  pointer-events:none;
}
.hm-cta-panel::after {
  content:''; position:absolute;
  bottom:-80px; right:-80px;
  width:300px; height:300px; border-radius:50%;
  background:radial-gradient(circle,rgba(249,115,22,.25),transparent 70%);
  pointer-events:none;
}

/* ── Trust marquee ── */
.hm-marquee-wrap { overflow:hidden; }
.hm-marquee-track {
  display:flex; width:max-content;
  animation:hm-marquee 24s linear infinite;
}
.hm-marquee-track:hover { animation-play-state:paused; }
.hm-marquee-item {
  display:flex; align-items:center; gap:32px;
  padding:0 32px;
  font-family:var(--fh); font-size:12px; font-weight:700;
  letter-spacing:.18em; text-transform:uppercase;
  color:#fff; white-space:nowrap;
}
.hm-marquee-item::after { content:'◆'; font-size:7px; opacity:.6; }

/* ── Stat number ── */
.hm-stat-num {
  font-family:var(--fh);
  font-size:clamp(30px,4vw,48px);
  font-weight:800; color:#fff;
  line-height:1; letter-spacing:-.04em;
}
.hm-stat-label {
  font-family:var(--fb); font-size:12px;
  color:rgba(255,255,255,.65); margin-top:5px;
  letter-spacing:.04em;
}

/* ── About mini stats ── */
.hm-about-stat-num {
  font-family:var(--fh); font-size:34px; font-weight:800;
  color:var(--green-deep); line-height:1; letter-spacing:-.04em;
}
.hm-about-stat-label {
  font-family:var(--fb); font-size:12px; color:var(--ink-45); margin-top:5px;
}

/* ── Modal ── */
.hm-overlay {
  position:fixed; inset:0; z-index:9999;
  background:rgba(17,24,39,.60);
  backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
  display:grid; place-items:center; padding:24px;
  animation:hm-fade .2s ease forwards;
}
.hm-modal {
  position:relative; width:100%; max-width:500px;
  background:#fff;
  border:1.5px solid var(--line2);
  border-radius:24px; padding:36px 32px;
  max-height:88vh; overflow-y:auto;
  animation:hm-pop .32s var(--ease) forwards;
  box-shadow:0 40px 80px rgba(0,0,0,.18);
}
.hm-modal-close {
  position:absolute; top:18px; right:18px;
  width:34px; height:34px; border-radius:50%;
  background:var(--line); border:none;
  display:flex; align-items:center; justify-content:center;
  cursor:pointer; color:var(--ink-45);
  transition:background .2s,color .2s;
}
.hm-modal-close:hover { background:var(--line2); color:var(--ink); }
.hm-modal-badge {
  display:inline-flex; align-items:center; gap:7px;
  background:var(--green-tint); color:var(--green-deep);
  border:1px solid var(--green-tint2);
  font-family:var(--fb); font-size:11px; font-weight:600;
  letter-spacing:.08em; text-transform:uppercase;
  padding:5px 12px; border-radius:100px; margin-bottom:16px;
}
.hm-modal-title {
  font-family:var(--fh); font-size:24px; font-weight:800;
  color:var(--ink); letter-spacing:-.025em; margin-bottom:10px;
}
.hm-modal-desc {
  font-family:var(--fb); font-size:14px;
  color:var(--ink-70); line-height:1.75; margin-bottom:28px;
}
.hm-modal-sub {
  font-family:var(--fb); font-size:10.5px; font-weight:600;
  letter-spacing:.15em; text-transform:uppercase;
  color:var(--orange); margin-bottom:16px;
}
.hm-modal-steps { display:flex; flex-direction:column; gap:12px; margin-bottom:28px; }
.hm-modal-step {
  display:flex; gap:14px; align-items:flex-start;
  padding:14px 16px; border-radius:14px;
  background:#F8FAFC;
  border:1px solid var(--line);
}
.hm-step-num {
  flex-shrink:0; width:28px; height:28px; border-radius:9px;
  background:var(--green); color:#fff;
  font-family:var(--fh); font-size:12px; font-weight:700;
  display:flex; align-items:center; justify-content:center;
}
.hm-step-title {
  font-family:var(--fh); font-size:13px; font-weight:700;
  color:var(--ink); margin-bottom:3px;
}
.hm-step-desc {
  font-family:var(--fb); font-size:12.5px;
  color:var(--ink-70); line-height:1.55;
}
.hm-modal-cta {
  display:block; width:100%; text-align:center;
  padding:15px; border-radius:14px;
  background:linear-gradient(135deg,var(--green),var(--green-hi));
  color:#fff; font-family:var(--fh); font-size:14px; font-weight:700;
  box-shadow:0 6px 18px rgba(101,163,13,.28);
  transition:transform .25s var(--ease),box-shadow .25s,filter .25s;
}
.hm-modal-cta:hover { transform:translateY(-2px); box-shadow:0 12px 32px rgba(101,163,13,.38); filter:brightness(1.04); }
.hm-modal-cta:active { transform:scale(.97); transition-duration:.1s; }

/* ── Responsive ── */
@media(max-width:768px){
  .hm-wrap { padding:0 22px; }
  .hm-section { padding:76px 0; }
  .hm-panel { grid-template-columns:1fr; gap:36px; padding:40px 30px; }
  .hm-cta-panel { padding:64px 30px; }
  .hm-carousel-btn { width:42px; height:42px; }
  .hm-carousel-prev { left:14px; }
  .hm-carousel-next { right:14px; }
}
@media(max-width:560px){
  .hm-h1 { font-size:40px; }
  .hm-h2,.hm-h2-dark,.hm-h2-white { font-size:28px; }
}
`;

function StyleTag() {
  useEffect(() => {
    if (document.getElementById("hm-css-v4")) return;
    const el = document.createElement("style");
    el.id = "hm-css-v4"; el.textContent = CSS;
    document.head.prepend(el);
    return () => el.remove();
  }, []);
  return null;
}

function CountUp({ target, suffix = "", duration = 1500 }) {
  const [val, setVal] = useState(0);
  const [ref, show] = useReveal(0.5);
  useEffect(() => {
    if (!show) return;
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [show, target, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Video Carousel with click, swipe, pill dots ── */
function VideoCarousel({ videos, duration = 10000 }) {
  const [current, setCurrent] = useState(0);
  const videoRefs = useRef([]);
  const timerRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const goTo = useCallback((idx) => {
    setCurrent((idx + videos.length) % videos.length);
  }, [videos.length]);

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => goTo(current + 1), duration);
    return () => clearTimeout(timerRef.current);
  }, [current, duration, goTo]);

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === current) { v.currentTime = 0; v.play().catch(() => {}); }
      else v.pause();
    });
  }, [current]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) dx < 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <div className="hm-video-wrap" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {videos.map((v, i) => (
        <div key={i} className={`hm-video-slide${i === current ? " active" : ""}`}>
          <video
            ref={el => videoRefs.current[i] = el}
            src={v.src}
            muted playsInline loop
            preload={i === 0 ? "auto" : "metadata"}
          />
        </div>
      ))}

      <button className="hm-carousel-btn hm-carousel-prev" onClick={prev} aria-label="Previous video">
        <ChevronLeft size={22} />
      </button>
      <button className="hm-carousel-btn hm-carousel-next" onClick={next} aria-label="Next video">
        <ChevronRight size={22} />
      </button>

      <div className="hm-carousel-dots">
        {videos.map((_, i) => (
          <button
            key={i}
            className={`hm-carousel-dot${i === current ? " active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to video ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

const SERVICES = [
  { icon: <Sparkles size={20} />, title: "Laundry Services", desc: "Professional wash, dry, press & fold for homes and businesses. Walk-in or scheduled pickup with eco-friendly, fabric-safe care." },
  { icon: <ShieldCheck size={20} />, title: "Fumigation", desc: "Certified pest elimination for homes, offices, and warehouses. EPA-approved, family and staff-safe treatments." },
  { icon: <Truck size={20} />, title: "Car Detailing", desc: "Complete interior restoration, exterior polish, and long-lasting ceramic protection. Drive away looking brand new." },
  { icon: <Droplets size={20} />, title: "Deep Cleaning", desc: "Comprehensive sanitization for homes, offices, hospitals, and schools. We tackle floors, restrooms, high-touch surfaces, and hard-to-reach areas to deliver a fresh, hygienic environment." },
];

const TRUST = ["Trusted by Hospitals", "Banks", "Offices", "Schools", "Homes Across Ashanti Region"];

const WHY = [
  "Trained & Vetted Staff",
  "Reliable Scheduling",
  "Professional Equipment",
  "Affordable Fixed Pricing",
  "Same-Day Service Available",
  "Eco-Friendly Supplies",
];

const SERVICE_WORKFLOWS = {
  "Laundry Services": [
    { step: "1", title: "Drop-off & Inspection", desc: "We log every item, note fabric types, and identify stains or special care needs." },
    { step: "2", title: "Sorting & Pre-treatment", desc: "Items are separated by color and fabric, then pre-treated with eco-friendly stain removers." },
    { step: "3", title: "Wash, Dry & Press", desc: "Professional machine washing, temperature-controlled drying, and expert ironing or folding." },
    { step: "4", title: "Quality Check & Packaging", desc: "Each piece is inspected, neatly packaged, and ready for pickup or delivery." },
  ],
  "Fumigation": [
    { step: "1", title: "Site Inspection", desc: "We assess the infestation type, severity, and affected areas to determine the right treatment." },
    { step: "2", title: "Custom Treatment Plan", desc: "You receive a clear quote and safety guidelines. We use EPA-approved, family-safe chemicals." },
    { step: "3", title: "Safe Application", desc: "Certified technicians apply the treatment thoroughly, targeting nests, cracks, and high-activity zones." },
    { step: "4", title: "Ventilation & Re-entry", desc: "After the required settling time, we ventilate the space and confirm it's safe for re-entry." },
  ],
  "Car Detailing": [
    { step: "1", title: "Initial Inspection & Vacuum", desc: "We document your vehicle's condition and thoroughly vacuum all interior surfaces and crevices." },
    { step: "2", title: "Deep Interior Clean", desc: "Seats, carpets, and dashboards are steam-cleaned, conditioned, and treated for stains or odors." },
    { step: "3", title: "Exterior Wash & Polish", desc: "Hand wash, clay bar decontamination, and machine polish to restore shine and remove swirl marks." },
    { step: "4", title: "Protection & Handover", desc: "Wax or ceramic sealant is applied, tires dressed, and a final walkaround ensures your satisfaction." },
  ],
  "Deep Cleaning": [
    { step: "1", title: "Site Assessment & Planning", desc: "We evaluate the space type, size, and specific needs: whether office, hospital, school, or home, to tailor our cleaning strategy." },
    { step: "2", title: "Preparation & Dry Removal", desc: "We clear dust, cobwebs, and debris from ceilings, vents, and high surfaces, while protecting sensitive equipment and furniture." },
    { step: "3", title: "Deep Scrub & Disinfection", desc: "Professional-grade machines and hospital-safe disinfectants are used to sanitize floors, surfaces, restrooms, and high-touch areas across the entire space." },
    { step: "4", title: "Quality Inspection & Handover", desc: "We conduct a thorough walkthrough to ensure every zone meets our strict standards, leaving your space fresh, safe, and ready for immediate use." },
  ],
};

export default function Home() {
  const go = useDelayedMount(80);
  const [svcRef, svcShow] = useReveal();
  const [abtRef, abtShow] = useReveal();
  const [whyRef, whyShow] = useReveal();
  const [ctaRef, ctaShow] = useReveal();
  const [selected, setSelected] = useState(null);

  const hi = (delay) => ({
    opacity: go ? 1 : 0,
    animation: go ? `hm-rise .75s ${delay}s var(--ease) forwards` : "none",
  });

  return (
    <div className="hm">
      <StyleTag />
      <Helmet>
        <title>Chapman Prestige Limited | Professional Cleaning & Laundry in Kumasi</title>
        <meta name="description" content="Chapman Prestige Limited delivers trusted residential, commercial, and healthcare cleaning services across Ashanti Region. Book your service today." />
        <link rel="canonical" href="https://chapmanprestigelimited.com/" />
      </Helmet>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "140px 44px 80px",
        position: "relative", overflow: "hidden",
        borderBottom: "1px solid var(--line)",
      }}>
        <VideoCarousel videos={HOME_VIDEOS} duration={10000} />

        {/* Colour orbs */}
        <div className="hm-orb" style={{ width:600, height:600, top:"10%", left:"60%", background:"radial-gradient(circle,rgba(101,163,13,.28),transparent 70%)", animationDuration:"16s" }} />
        <div className="hm-orb" style={{ width:400, height:400, top:"55%", left:"10%", background:"radial-gradient(circle,rgba(249,115,22,.22),transparent 70%)", animationDuration:"11s", animationDelay:"4s" }} />
        <div className="hm-grain" />

        {/* Multi-layer overlay: vignette sides + strong bottom-to-top gradient for text legibility */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(10,15,20,.92) 0%, rgba(10,15,20,.60) 40%, rgba(10,15,20,.25) 75%, rgba(10,15,20,.10) 100%)", zIndex:1, pointerEvents:"none" }} />
        {/* Side vignettes */}
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at center, transparent 50%, rgba(10,15,20,.45) 100%)", zIndex:1, pointerEvents:"none" }} />

        <div style={{ position:"relative", zIndex:2, maxWidth:860, margin:"0 auto", width:"100%" }}>
          {/* Frosted text backdrop for extra readability */}
          <div style={{
            background:"rgba(10,15,20,.35)",
            backdropFilter:"blur(2px)",
            WebkitBackdropFilter:"blur(2px)",
            borderRadius:24,
            padding:"40px 48px 44px",
            border:"1px solid rgba(255,255,255,.08)",
            display:"inline-block",
            width:"100%",
          }}>
            <p className="hm-eyebrow" style={{ color:"var(--orange-hi)", ...hi(0) }}>
              Est. 2016 · Kumasi, Ghana
            </p>

            <h1 className="hm-h1" style={{ marginBottom:24, ...hi(0.08) }}>
              Professional Cleaning&nbsp;&amp; Laundry Services You Can&nbsp;Trust
            </h1>

            <p style={{ fontFamily:"var(--fb)", fontSize:17, fontWeight:500, color:"rgba(255,255,255,.85)", lineHeight:1.8, maxWidth:520, marginBottom:40, ...hi(0.16) }}>
              Chapman Prestige Limited delivers high-quality cleaning, laundry, fumigation,
              and sanitation for homes, hospitals, offices, and institutions across Ghana.
            </p>

            <div style={{ display:"flex", gap:12, flexWrap:"wrap", ...hi(0.24) }}>
              <Link to="/contact" className="hm-btn-primary">Book a Service <ArrowRight size={15} /></Link>
              <Link to="/services" className="hm-btn-ghost">Explore Services</Link>
            </div>

            {/* Stats */}
            <div style={{ display:"flex", gap:48, marginTop:40, paddingTop:40, borderTop:"1px solid rgba(255,255,255,.15)", flexWrap:"wrap", ...hi(0.34) }}>
              {[
                { value:10,  suffix:"+", label:"Years in Business" },
                { value:500, suffix:"+", label:"Clients Served" },
                { value:100, suffix:"%", label:"Satisfaction Rate" },
              ].map(s => (
                <div key={s.label}>
                  <div className="hm-stat-num"><CountUp target={s.value} suffix={s.suffix} /></div>
                  <div className="hm-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST MARQUEE ── */}
      <div style={{ background:"linear-gradient(135deg,var(--green-deep),var(--green))", padding:"20px 0", overflow:"hidden", borderBottom:"1px solid var(--line)" }}>
        <div className="hm-marquee-wrap">
          <div className="hm-marquee-track">
            {[...TRUST, ...TRUST, ...TRUST, ...TRUST].map((t, i) => (
              <div key={i} className="hm-marquee-item">{t}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section className="hm-section" ref={svcRef} style={{ background:"var(--bg-soft)" }}>
        <div className="hm-wrap">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:52, flexWrap:"wrap", gap:20 }}>
            <div>
              <p className={`hm-eyebrow hm-rv ${svcShow ? "show" : ""}`}>What We Do</p>
              <h2 className={`hm-h2 hm-rv ${svcShow ? "show" : ""}`} style={{ animationDelay:".06s" }}>Our Core Services</h2>
            </div>
            <Link to="/services"
              className={`hm-rv ${svcShow ? "show" : ""}`}
              style={{ animationDelay:".12s", fontFamily:"var(--fh)", fontSize:13, fontWeight:700, color:"var(--green)", display:"flex", alignItems:"center", gap:6 }}>
              View All <ChevronRight size={14} />
            </Link>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(245px,1fr))", gap:18 }}>
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className={`hm-card hm-card-${i} hm-rv d${i+1} ${svcShow ? "show" : ""}`}
                onClick={() => setSelected(s)}
              >
                <div className="hm-card-icon-wrap">{s.icon}</div>
                <h3 className="hm-card-title">{s.title}</h3>
                <p className="hm-card-desc">{s.desc}</p>
                <div className="hm-card-arrow"><ArrowRight size={16} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="hm-section" ref={abtRef} style={{ background:"#fff" }}>
        <div className="hm-wrap">
          <div className={`hm-panel hm-rv ${abtShow ? "show" : ""}`}>
            <div>
              <p className="hm-eyebrow">Who We Are</p>
              <h2 className="hm-h2" style={{ marginBottom:20 }}>Built on Trust &amp; Quality</h2>
              <p style={{ fontFamily:"var(--fb)", fontSize:15.5, fontWeight:400, color:"var(--ink-70)", lineHeight:1.82, marginBottom:36, maxWidth:520 }}>
                Chapman Prestige Limited is a professional cleaning and laundry company based in
                Kwadaso-Ohwimase, Kumasi. Since 2016, we've been committed to reliable, consistent,
                high-quality service using trained staff and professional-grade equipment.
              </p>
              <Link to="/about" style={{
                display:"inline-flex", alignItems:"center", gap:8,
                fontFamily:"var(--fh)", fontSize:13.5, fontWeight:700,
                color:"var(--green)",
                borderBottom:"1.5px solid rgba(101,163,13,.35)", paddingBottom:4,
                transition:"border-color .2s,color .2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--green)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(101,163,13,.35)"; }}
              >
                Learn more <ArrowRight size={14} />
              </Link>
            </div>

            {/* Mini stats */}
            <div style={{ borderLeft:"1px solid var(--line)", paddingLeft:48, display:"flex", flexDirection:"column", gap:0 }}>
              {[{ n:"10+", l:"Years Active" }, { n:"500+", l:"Happy Clients" }, { n:"4", l:"Core Services" }].map(({ n, l }, i) => (
                <div key={l} style={{ padding:"22px 0", borderBottom: i < 2 ? "1px solid var(--line)" : "none" }}>
                  <div className="hm-about-stat-num">{n}</div>
                  <div className="hm-about-stat-label">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="hm-section" ref={whyRef} style={{ background:"var(--bg-soft)" }}>
        <div className="hm-wrap">
          <p className={`hm-eyebrow hm-rv ${whyShow ? "show" : ""}`} style={{ color:"var(--orange)" }}>Our Edge</p>
          <h2 className={`hm-h2-dark hm-rv ${whyShow ? "show" : ""}`} style={{ animationDelay:".06s", marginBottom:52 }}>
            Why Choose Chapman Prestige
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:10 }}>
            {WHY.map((item, i) => (
              <div key={item} className={`hm-why hm-rv d${(i % 4) + 1} ${whyShow ? "show" : ""}`}>
                <div className="hm-why-dot" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding:"0 44px 108px", background:"#fff" }} ref={ctaRef}>
        <div className="hm-wrap">
          <div className={`hm-cta-panel hm-rv ${ctaShow ? "show" : ""}`}>
            <div style={{ position:"relative", zIndex:1 }}>
              <p className="hm-eyebrow" style={{ justifyContent:"center", color:"rgba(255,255,255,.75)" }}>Get Started</p>
              <h2 className="hm-h2-white" style={{ marginBottom:16 }}>Need Cleaning Services Today?</h2>
              <p style={{ fontFamily:"var(--fb)", fontSize:16, fontWeight:400, color:"rgba(255,255,255,.75)", marginBottom:44, lineHeight:1.75, maxWidth:460, margin:"0 auto 44px" }}>
                Contact Chapman Prestige Limited now and get fast, professional service anywhere in Kumasi.
              </p>
              <Link to="/contact" className="hm-btn-cta-white">
                Contact Us Today <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE MODAL ── */}
      {selected && (
        <div className="hm-overlay" onClick={() => setSelected(null)}>
          <div className="hm-modal" onClick={e => e.stopPropagation()}>
            <button className="hm-modal-close" onClick={() => setSelected(null)} aria-label="Close">
              <X size={14} />
            </button>
            <div className="hm-modal-badge">
              {selected.icon}&nbsp; {selected.title}
            </div>
            <h3 className="hm-modal-title">{selected.title}</h3>
            <p className="hm-modal-desc">{selected.desc}</p>

            <p className="hm-modal-sub">How We Work</p>
            <div className="hm-modal-steps">
              {(SERVICE_WORKFLOWS[selected.title] || []).map((w, i) => (
                <div key={i} className="hm-modal-step">
                  <span className="hm-step-num">{w.step}</span>
                  <div>
                    <div className="hm-step-title">{w.title}</div>
                    <div className="hm-step-desc">{w.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/contact" className="hm-modal-cta" onClick={() => setSelected(null)}>
              Book {selected.title}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}