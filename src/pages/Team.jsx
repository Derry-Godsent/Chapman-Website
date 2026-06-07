import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { useEffect, useState } from "react";
import { useScrollReveal, useDelayedMount } from "../utils/hooks";
import { BUSINESS } from "../config/business.jsx";
import { Helmet } from "react-helmet-async";

/* 
   TEAM — Unique Split-Layout Hero (FIXED)
   · 10+ Years badge (2016-2026)
   · Cards arranged in a circle around the badge — no overlap
   · Bright, clean aesthetic
*/
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
  --shadow-lg:    0 20px 50px rgba(0,0,0,.12), 0 8px 20px rgba(0,0,0,.06);
  --shadow-xl:    0 30px 70px rgba(0,0,0,.15), 0 12px 30px rgba(0,0,0,.08);

  --fh: 'Outfit', system-ui, sans-serif;
  --fb: 'DM Sans', system-ui, sans-serif;
  --ease: cubic-bezier(.16,1,.3,1);
}

.tm*, .tm*::before, .tm*::after { box-sizing:border-box; margin:0; padding:0; }
.tm { background:var(--cream); color:var(--ink-70); font-family:var(--fb); min-height:100vh; overflow-x:hidden; }
.tm a { text-decoration:none; }

/* Keyframes */
@keyframes tm-rise  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
@keyframes tm-line  { from{transform:scaleX(0)} to{transform:scaleX(1)} }
@keyframes tm-float-1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(0,-10px)} }
@keyframes tm-float-2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(0,-12px)} }
@keyframes tm-float-3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(0,-8px)} }
@keyframes tm-float-4 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(0,-11px)} }
@keyframes tm-float-5 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(0,-9px)} }
@keyframes tm-orb-drift { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-15px) scale(1.05)} }
@keyframes tm-fade-in { from{opacity:0;transform:translate(-50%,-50%) scale(.8)} to{opacity:1;transform:translate(-50%,-50%) scale(1)} }
@keyframes tm-badge-pulse { 0%,100%{box-shadow:0 20px 50px rgba(101,163,13,.35)} 50%{box-shadow:0 20px 60px rgba(101,163,13,.5)} }

/* Scroll reveals */
.tm-rv       { opacity:0; transform:translateY(32px); transition:opacity .7s var(--ease), transform .7s var(--ease); }
.tm-visible  { opacity:1 !important; transform:none !important; }

.tm-wrap { max-width:1140px; margin:0 auto; padding:0 44px; }

/* Eyebrow */
.tm-eye {
  display:inline-flex; align-items:center; gap:10px;
  font-family:var(--fb); font-size:10.5px; font-weight:600;
  letter-spacing:.22em; text-transform:uppercase;
  color:var(--orange); margin-bottom:18px;
}
.tm-eye::before {
  content:''; display:block; width:18px; height:1.5px;
  background:currentColor; border-radius:2px;
}
.tm-eye-white {
  display:inline-flex; align-items:center; gap:10px;
  font-family:var(--fb); font-size:10.5px; font-weight:600;
  letter-spacing:.22em; text-transform:uppercase;
  color:rgba(255,255,255,.75); margin-bottom:18px;
}
.tm-eye-white::before {
  content:''; display:block; width:18px; height:1.5px;
  background:rgba(255,255,255,.5); border-radius:2px;
}

/* Headlines */
.tm-h1 {
  font-family:var(--fh);
  font-size:clamp(42px,5.5vw,72px);
  font-weight:800; line-height:.97;
  letter-spacing:-.04em;
  color:var(--ink);
}
.tm-h2 {
  font-family:var(--fh);
  font-size:clamp(30px,4.2vw,54px);
  font-weight:800; line-height:1.04;
  letter-spacing:-.035em;
  color:var(--ink);
}
.tm-h2-dark {
  font-family:var(--fh);
  font-size:clamp(30px,4.2vw,54px);
  font-weight:800; line-height:1.04;
  letter-spacing:-.035em;
  color:#fff;
}

/* ══════════════════════════════════════
   UNIQUE SPLIT-HERO (FIXED)
══════════════════════════════════════ */
.tm-hero {
  min-height: 85vh;
  padding: 140px 44px 80px;
  position: relative;
  overflow: hidden;
  background: #fff;
  border-bottom: 1px solid var(--line);
}
/* Decorative orbs */
.tm-hero::before {
  content:''; position:absolute;
  width:600px; height:600px; border-radius:50%;
  top:-200px; right:-150px;
  background:radial-gradient(circle, var(--green-tint), transparent 70%);
  animation:tm-orb-drift 18s ease-in-out infinite;
  pointer-events:none;
}
.tm-hero::after {
  content:''; position:absolute;
  width:500px; height:500px; border-radius:50%;
  bottom:-150px; left:-100px;
  background:radial-gradient(circle, var(--orange-tint), transparent 70%);
  animation:tm-orb-drift 22s ease-in-out infinite reverse;
  pointer-events:none;
}

.tm-hero-grid {
  display:grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 64px;
  align-items: center;
  position: relative;
  z-index: 2;
  max-width: 1140px;
  margin: 0 auto;
  min-height: 60vh;
}

/* Left: Text */
.tm-hero-text { position: relative; }
.tm-hero-eyebrow {
  display:inline-flex; align-items:center; gap:10px;
  font-family:var(--fb); font-size:11px; font-weight:600;
  letter-spacing:.22em; text-transform:uppercase;
  color:var(--orange); margin-bottom:24px;
}
.tm-hero-eyebrow::before {
  content:''; display:block; width:24px; height:2px;
  background:var(--orange); border-radius:2px;
}
.tm-hero-headline {
  font-family:var(--fh);
  font-size:clamp(44px,5.8vw,76px);
  font-weight:800; line-height:.95;
  letter-spacing:-.04em;
  color:var(--ink);
  margin-bottom:24px;
}
.tm-hero-headline .accent {
  background:linear-gradient(135deg, var(--orange) 0%, var(--orange-hi) 100%);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
  background-clip:text;
}
.tm-hero-sub {
  font-family:var(--fb); font-size:17px; font-weight:400;
  color:var(--ink-70); line-height:1.8; max-width:480px;
  margin-bottom:36px;
}

/* Stats strip inside hero */
.tm-hero-stats {
  display:flex; gap:32px; padding-top:28px;
  border-top:1px solid var(--line);
  max-width:480px;
}
.tm-hero-stat-num {
  font-family:var(--fh); font-size:32px; font-weight:800;
  color:var(--ink); line-height:1; letter-spacing:-.03em;
  background:linear-gradient(135deg, var(--green), var(--green-hi));
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
  background-clip:text;
}
.tm-hero-stat-lbl {
  font-family:var(--fb); font-size:12px; color:var(--ink-45);
  margin-top:4px; letter-spacing:.02em;
}

/* Right: Floating avatar cards — arranged in a circle around the badge */
.tm-hero-visual {
  position: relative;
  height: 520px;
  width: 100%;
}

.tm-avatar-card {
  position: absolute;
  background: #fff;
  border-radius: 18px;
  padding: 14px 16px;
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 200px;
  border: 1px solid var(--line);
  opacity: 1;
  z-index: 2;
}
.tm-avatar-circle {
  width: 44px; height: 44px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--fh);
  font-size: 15px; font-weight: 800;
  color: #fff;
  flex-shrink: 0;
  letter-spacing: -.02em;
}
.tm-avatar-info { display:flex; flex-direction:column; }
.tm-avatar-name {
  font-family:var(--fh); font-size:13px; font-weight:700;
  color:var(--ink); letter-spacing:-.01em;
}
.tm-avatar-role {
  font-family:var(--fb); font-size:10.5px; font-weight:500;
  color:var(--ink-45); margin-top:2px;
}

/* 
   Cards positioned in a pentagon/circle around the center.
   The center (around 50% 50%) is left clear for the badge.
*/
.tm-avatar-card.card-1 {
  top: 2%; left: 50%;
  transform: translateX(-50%);
  animation: tm-float-1 6s ease-in-out infinite;
}
.tm-avatar-card.card-1 .tm-avatar-circle { background: linear-gradient(135deg, var(--green), var(--green-hi)); }

.tm-avatar-card.card-2 {
  top: 28%; right: 2%;
  animation: tm-float-2 7s ease-in-out infinite;
}
.tm-avatar-card.card-2 .tm-avatar-circle { background: linear-gradient(135deg, var(--orange), var(--orange-hi)); }

.tm-avatar-card.card-3 {
  bottom: 22%; right: 12%;
  animation: tm-float-3 6.5s ease-in-out infinite;
}
.tm-avatar-card.card-3 .tm-avatar-circle { background: linear-gradient(135deg, var(--amber), var(--amber-hi)); }

.tm-avatar-card.card-4 {
  bottom: 22%; left: 12%;
  animation: tm-float-4 7.5s ease-in-out infinite;
}
.tm-avatar-card.card-4 .tm-avatar-circle { background: linear-gradient(135deg, var(--sky), var(--sky-hi)); }

.tm-avatar-card.card-5 {
  top: 28%; left: 2%;
  animation: tm-float-5 6.8s ease-in-out infinite;
}
.tm-avatar-card.card-5 .tm-avatar-circle { background: linear-gradient(135deg, var(--green-deep), var(--green)); }

/* 
   Central badge — truly centered, higher z-index, 
   stays above cards without blocking them.
*/
.tm-hero-badge {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 120px; height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--green-deep), var(--green), var(--green-hi));
  display: flex; align-items: center; justify-content: center;
  flex-direction: column;
  color: #fff;
  box-shadow: 0 20px 50px rgba(101,163,13,.35);
  z-index: 10;
  border: 5px solid #fff;
  pointer-events: none;
  animation: tm-fade-in .8s .4s var(--ease) both, tm-badge-pulse 4s ease-in-out infinite;
}
.tm-hero-badge-num {
  font-family:var(--fh); font-size:32px; font-weight:900;
  line-height:1; letter-spacing:-.03em;
}
.tm-hero-badge-lbl {
  font-family:var(--fb); font-size:9px; font-weight:600;
  letter-spacing:.12em; text-transform:uppercase;
  margin-top:3px; opacity:.92;
}

/* Team Card — Professional Grid */
.tm-card {
  background:#fff;
  border-top:4px solid var(--green);
  border-left:1px solid var(--line);
  border-right:1px solid var(--line);
  border-bottom:1px solid var(--line);
  border-radius:20px; overflow:hidden;
  transition:border-color .35s, transform .4s var(--ease), box-shadow .4s;
  position:relative;
  box-shadow:var(--shadow-md);
}
.tm-card:hover {
  border-color:var(--orange);
  transform:translateY(-7px);
  box-shadow:var(--shadow-xl);
}
.tm-card-img {
  width:100%; aspect-ratio:4/3;
  background:linear-gradient(135deg, var(--green), var(--green-hi));
  display:flex; align-items:center; justify-content:center;
  color:#fff; font-family:var(--fh); font-size:14px; font-weight:600;
  letter-spacing:.04em; text-transform:uppercase;
  transition:transform .4s var(--ease);
  object-fit: cover;
}
.tm-card:hover .tm-card-img { transform:scale(1.04); }
.tm-card-body { padding:28px 24px; }
.tm-card-name {
  font-family:var(--fh); font-size:18px; font-weight:700;
  color:var(--ink); margin-bottom:4px; letter-spacing:-.01em;
}
.tm-card-role {
  font-family:var(--fb); font-size:12px; font-weight:600;
  color:var(--orange); letter-spacing:.08em; text-transform:uppercase; margin-bottom:12px;
}
.tm-card-bio {
  font-family:var(--fb); font-size:14px; font-weight:400;
  color:var(--ink-70); line-height:1.7;
}
.tm-card-contact {
  margin-top: 16px; padding-top: 14px;
  border-top: 1px solid var(--line);
  display: flex; flex-direction: column; gap: 6px;
}
.tm-contact-link {
  font-family: var(--fb); font-size: 12.5px; font-weight: 500;
  color: var(--green); text-decoration: none;
  transition: color .2s, transform .2s;
  display: inline-block;
}
.tm-contact-link:hover {
  color: var(--orange); transform: translateX(3px);
}

/* Section spacing */
.tm-section { padding:80px 0; background:var(--bg-soft); }
.tm-section + .tm-section { border-top:1px solid var(--line); }

/* CTA Card — Green gradient */
.tm-cta-card {
  background:linear-gradient(135deg,var(--green-deep) 0%,var(--green) 50%,var(--green-hi) 100%);
  border:none;
  border-radius:24px; padding:64px 40px;
  text-align:center;
  box-shadow:0 20px 60px rgba(101,163,13,.30);
  position:relative; overflow:hidden;
}
.tm-cta-card::before {
  content:''; position:absolute; inset:0; pointer-events:none;
  background:
    radial-gradient(ellipse 55% 65% at 10% 55%, rgba(255,255,255,.12), transparent),
    radial-gradient(ellipse 40% 50% at 90% 90%, rgba(255,255,255,.08), transparent);
}

/* Button */
.tm-btn-primary {
  display:inline-flex; align-items:center; gap:9px;
  background:#fff;
  color:var(--green-deep); font-family:var(--fh);
  font-size:13.5px; font-weight:700; letter-spacing:.01em;
  padding:13px 26px; border-radius:100px;
  box-shadow:0 4px 20px rgba(0,0,0,.15);
  transition:transform .25s var(--ease), box-shadow .25s, filter .25s;
  position:relative;
}
.tm-btn-primary:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(0,0,0,.20); filter:brightness(1.02); }
.tm-btn-primary:active { transform:translateY(-1px) scale(.97); transition-duration:.1s; }

/* Responsive */
@media(max-width:960px){
  .tm-hero-grid { grid-template-columns:1fr; gap:40px; }
  .tm-hero-visual { height:440px; order:-1; }
  .tm-hero { min-height: auto; padding:120px 22px 60px; }
}
@media(max-width:768px){
  .tm-wrap { padding:0 22px; }
  .tm-section { padding:60px 0; }
  .tm-cta-card { padding:48px 24px; }
  .tm-avatar-card { min-width: 170px; padding: 12px 14px; }
  .tm-avatar-circle { width: 38px; height: 38px; font-size: 13px; }
  .tm-avatar-name { font-size: 12px; }
  .tm-avatar-role { font-size: 10px; }
  .tm-hero-stats { gap:20px; flex-wrap:wrap; }
  .tm-hero-badge { width:100px; height:100px; }
  .tm-hero-badge-num { font-size:26px; }
}
@media(max-width:560px){
  .tm-h1 { font-size:40px; }
  .tm-h2, .tm-h2-dark { font-size:28px; }
  .tm-hero-visual { height: 380px; }
  .tm-avatar-card { min-width: 150px; padding: 10px 12px; gap: 10px; }
  .tm-avatar-circle { width: 34px; height: 34px; font-size: 12px; }
  .tm-avatar-card.card-2 { right: 0%; }
  .tm-avatar-card.card-3 { right: 5%; }
  .tm-avatar-card.card-4 { left: 5%; }
  .tm-avatar-card.card-5 { left: 0%; }
}
`;

function StyleTag() {
  useEffect(() => {
    if (document.getElementById("tm-css-v3")) return;
    const el = document.createElement("style");
    el.id = "tm-css-v3"; el.textContent = CSS;
    document.head.prepend(el);
    return () => el.remove();
  }, []);
  return null;
}

// Team data
const TEAM = {
  leadership: [
    {
      name: "William Chapman",
      role: "Founder & CEO",
      image: "/team/x.jpg",
      contact: { email: "kenchapsy@gmail.com", phone: "+44 7459 323742" },
      bio: "Visionary leader with 15+ years in facility management. Sets the strategic direction for Chapman Prestige, ensuring every service upholds our promise of reliability and community impact."
    },
    {
      name: "Princeton Bright",
      role: "Business Growth Strategist",
      image: "/team/x.jpg",
      contact: { email: "derrickbright164@gmail.com", phone: "+233 54 212 8342" },
      bio: "Drives client partnerships and service expansion across the Ashanti Region. Oversees quality assurance and ensures our operations scale without compromising prestige standards."
    },
    {
      name: "King George Boakye",
      role: "Site Supervisor & Client Relations",
      image: "/team/George.jpg",
      contact: { email: "boakyekinggeorge@gmail.com", phone: "+233 55 506 2231" },
      bio: "Manages on-site service execution and maintains direct communication with clients. Ensures timely delivery, rapid feedback resolution, and consistent team performance."
    },
    {
      name: "Princeton Addington Kwayisi Sakyi",
      role: "Operations & Logistics Lead",
      image: "/team/x.jpg",
      contact: { email: "princetonsakyi@gmail.com", phone: "+233 23 227 6648" },
      bio: "Coordinates fleet scheduling, chemical inventory, and equipment maintenance. Keeps daily operations running smoothly and efficiently across all service locations."
    }
  ],
  staff: [
    {
      name: "Comfort",
      role: "Laundry Supervisor",
      image: "/team/x.jpg",
      contact: { email: "-", phone: "-" },
      bio: "Manages the full laundry workflow from intake to delivery. Oversees staff scheduling, quality checks, and ensures garments are processed with care and returned on time."
    },
    {
      name: "James Owusu",
      role: "Steam Press Operator",
      image: "/team/x.jpg",
      contact: { email: "-", phone: "-" },
      bio: "Expert in high-volume garment pressing and fabric finishing. Ensures crisp, professional results for uniforms, linens, and delicate items using industrial-grade equipment."
    },
    {
      name: "Hagar Asante",
      role: "On-site Supervisor - St. Martins Hospital",
      image: "/team/x.jpg",
      contact: { email: "-", phone: "-" },
      bio: "Leads daily sanitation routines in clinical environments. Trained in infection control protocols, PPE management, and hospital-grade disinfection standards."
    },
    {
      name: "Prosper Agbetsiame",
      role: "Cleaning Team Lead",
      image: "/team/x.jpg",
      contact: { email: "-", phone: "-" },
      bio: "Directs residential and commercial cleaning crews. Specializes in deep-cleaning operations, staff training, and maintaining strict attention to detail on every job site."
    }
  ]
};

export default function Team() {
  const go = useDelayedMount(60);
  useScrollReveal(".tm-rv", "tm-visible");

  const hi = (delay) => ({
    opacity: go ? 1 : 0,
    animation: go ? `tm-rise .7s ${delay}s var(--ease) forwards` : "none",
  });

  return (
    <PageWrapper>
      <StyleTag />
      <Helmet>
        <title>Our Team | Chapman Prestige Limited</title>
        <meta name="description" content="Meet the skilled professionals behind Chapman Prestige's trusted cleaning, laundry, and sanitation services." />
        <link rel="canonical" href="https://chapmanprestigelimited.com/team" />
      </Helmet>

      <div className="tm">
        {/* ══ UNIQUE SPLIT-HERO ══ */}
        <section className="tm-hero">
          <div className="tm-hero-grid">
            {/* Left: Text content */}
            <div className="tm-hero-text">
              <div className="tm-hero-eyebrow" style={hi(0)}>
                Our People
              </div>
              <h1 className="tm-hero-headline" style={hi(0.1)}>
                The People<br/>
                Behind the <span className="accent">Prestige.</span>
              </h1>
              <p className="tm-hero-sub" style={hi(0.2)}>
                Skilled professionals dedicated to delivering spotless results, 
                every single day. Meet the team that makes Chapman Prestige 
                the Ashanti Region's trusted name.
              </p>
              <div className="tm-hero-stats" style={hi(0.3)}>
                <div>
                  <div className="tm-hero-stat-num">10+</div>
                  <div className="tm-hero-stat-lbl">Years of Excellence</div>
                </div>
                <div>
                  <div className="tm-hero-stat-num">50+</div>
                  <div className="tm-hero-stat-lbl">Team Members</div>
                </div>
                <div>
                  <div className="tm-hero-stat-num">100%</div>
                  <div className="tm-hero-stat-lbl">Dedication</div>
                </div>
              </div>
            </div>

            {/* Right: Floating avatar cards arranged in a circle */}
            <div className="tm-hero-visual">
              {/* Card 1 — Top center (Green) */}
              <div className="tm-avatar-card card-1">
                <div className="tm-avatar-circle">WC</div>
                <div className="tm-avatar-info">
                  <div className="tm-avatar-name">William C.</div>
                  <div className="tm-avatar-role">Founder & CEO</div>
                </div>
              </div>

              {/* Card 2 — Top right (Orange) */}
              <div className="tm-avatar-card card-2">
                <div className="tm-avatar-circle">PB</div>
                <div className="tm-avatar-info">
                  <div className="tm-avatar-name">Princeton B.</div>
                  <div className="tm-avatar-role">Growth Strategist</div>
                </div>
              </div>

              {/* Card 3 — Bottom right (Amber) */}
              <div className="tm-avatar-card card-3">
                <div className="tm-avatar-circle">PS</div>
                <div className="tm-avatar-info">
                  <div className="tm-avatar-name">Princeton S.</div>
                  <div className="tm-avatar-role">Operations Lead</div>
                </div>
              </div>

              {/* Card 4 — Bottom left (Sky) */}
              <div className="tm-avatar-card card-4">
                <div className="tm-avatar-circle">KG</div>
                <div className="tm-avatar-info">
                  <div className="tm-avatar-name">King George</div>
                  <div className="tm-avatar-role">Site Supervisor</div>
                </div>
              </div>

              {/* Card 5 — Top left (Deep Green) */}
              <div className="tm-avatar-card card-5">
                <div className="tm-avatar-circle">C</div>
                <div className="tm-avatar-info">
                  <div className="tm-avatar-name">Comfort</div>
                  <div className="tm-avatar-role">Laundry Supervisor</div>
                </div>
              </div>

              {/* Central badge — 10+ Years (2016-2026) */}
              <div className="tm-hero-badge">
                <div className="tm-hero-badge-num">10+</div>
                <div className="tm-hero-badge-lbl">Years</div>
              </div>
            </div>
          </div>
        </section>

        {/* LEADERSHIP */}
        <section className="tm-section">
          <div className="tm-wrap">
            <p className="tm-eye tm-rv" style={{ marginBottom:40 }}>Leadership & Management</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:24 }}>
              {TEAM.leadership.map((p, i) => (
                <div key={p.name} className={`tm-card tm-rv ${go ? "tm-visible" : ""}`} style={{ transitionDelay: (i * 0.08) + "s" }}>
                  <img 
                    src={p.image} 
                    alt={`${p.name}, ${p.role}`} 
                    className="tm-card-img"
                    style={{ objectFit: "cover" }}
                    onError={(e) => { e.target.src = "/team/placeholder.jpg"; }}
                  />
                  <div className="tm-card-body">
                    <h3 className="tm-card-name">{p.name}</h3>
                    <div className="tm-card-role">{p.role}</div>
                    <p className="tm-card-bio">{p.bio}</p>
                    
                    <div className="tm-card-contact">
                      <a href={`mailto:${p.contact.email}`} className="tm-contact-link">
                        {p.contact.email}
                      </a>
                      <a href={`tel:${p.contact.phone}`} className="tm-contact-link">
                        {p.contact.phone}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OPERATIONS & STAFF */}
        <section className="tm-section">
          <div className="tm-wrap">
            <p className="tm-eye tm-rv" style={{ marginBottom:40 }}>Operations & Staff</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
              {TEAM.staff.map((p, i) => (
                <div key={p.name} className={`tm-card tm-rv ${go ? "tm-visible" : ""}`} style={{ transitionDelay: (i * 0.07) + "s" }}>
                  <img 
                    src={p.image} 
                    alt={`${p.name}, ${p.role}`} 
                    className="tm-card-img"
                    style={{ objectFit: "cover" }}
                    onError={(e) => { e.target.src = "/team/placeholder.jpg"; }}
                  />
                  <div className="tm-card-body">
                    <h3 className="tm-card-name">{p.name}</h3>
                    <div className="tm-card-role">{p.role}</div>
                    <p className="tm-card-bio">{p.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding:"0 44px 100px", background:"var(--bg-soft)" }}>
          <div className="tm-wrap">
            <div className={`tm-cta-card tm-rv ${go ? "tm-visible" : ""}`}>
              <p className="tm-eye-white" style={{ justifyContent:"center", marginBottom:16 }}>Join us</p>
              <h2 className="tm-h2-dark" style={{ marginBottom:16, position:"relative" }}>
                Want to Be Part of the Team?
              </h2>
              <p style={{
                fontFamily:"var(--fb)", fontSize:16, fontWeight:400,
                color:"rgba(255,255,255,.85)", marginBottom:32, lineHeight:1.75, maxWidth:480, margin:"0 auto 32px",
                position:"relative",
              }}>
                We're always looking for dedicated professionals. Check our open positions or send us your details.
              </p>
              <Link to="/careers" className="tm-btn-primary" style={{ position:"relative" }}>
                View Open Roles
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}