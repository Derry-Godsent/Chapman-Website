import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { useEffect, useState } from "react";
import { useScrollReveal, useDelayedMount } from "../utils/hooks";
import { TIMELINE, CLIENTS, BUSINESS } from "../config/business.jsx";
import { Helmet } from "react-helmet-async";


const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

:root {
  /* ── Base surfaces: rich warm brown mid-tones ── */
  --ab-bg:        #2A1F14;   /* page base */
  --ab-bg2:       #342618;   /* card surface */
  --ab-bg3:       #3E2E1C;   /* card hover / elevated */
  --ab-bg4:       #241A0F;   /* deeper section contrast */
  --ab-bg-alt:    #301F0E;   /* values interlude */

  /* ── Accent palette ── */
  --green:        #059669;
  --green-hi:     #10B981;
  --green-deep:   #047857;
  --green-glow:   rgba(5,150,105,.18);

  --gold:         #D97706;
  --gold-hi:      #F59E0B;
  --gold-lo:      #92400E;
  --gold-glow:    rgba(217,119,6,.18);

  --coral:        #DA7756;
  --coral-hi:     #E8896A;
  --coral-glow:   rgba(218,119,86,.18);

  /* ── Text on warm brown base ── */
  --txt-hi:       #F0E4CC;   /* headings */
  --txt-md:       #C4AA88;   /* body copy */
  --txt-lo:       #8A7055;   /* muted labels */
  --txt-xlo:      #5A4535;   /* very muted */

  /* ── Borders on dark warm base ── */
  --line:         rgba(240,228,204,.08);
  --line2:        rgba(240,228,204,.14);
  --line3:        rgba(240,228,204,.04);

  --font-head:    'Outfit', system-ui, sans-serif;
  --font-body:    'DM Sans', system-ui, sans-serif;
  --ease:         cubic-bezier(.16,1,.3,1);
  --ease2:        cubic-bezier(.4,0,.2,1);
}

.ab *, .ab *::before, .ab *::after { box-sizing:border-box; margin:0; padding:0; }

.ab {
  background: var(--ab-bg);
  color: var(--txt-md);
  font-family: var(--font-body);
  min-height: 100vh;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
.ab a { text-decoration:none; }

/* ── keyframes ── */
@keyframes ab-up    { from { opacity:0; transform:translateY(44px) } to { opacity:1; transform:translateY(0) } }
@keyframes ab-fade  { from { opacity:0 } to { opacity:1 } }
@keyframes ab-line  { from { transform:scaleX(0); transform-origin:left } to { transform:scaleX(1); transform-origin:left } }
@keyframes ab-bg-drift { from { transform:translateY(-50%) translateX(0) } to { transform:translateY(-52%) translateX(-28px) } }
@keyframes ab-pulse-green { 0%,100% { box-shadow:0 0 0 0 rgba(5,150,105,.4) } 50% { box-shadow:0 0 0 10px rgba(5,150,105,0) } }
@keyframes ab-badge-float { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-9px) } }
@keyframes ab-shimmer { 0% { left:-60% } 100% { left:140% } }

/* ── reveal classes ── */
.ab-rv       { opacity:0; transform:translateY(36px);  transition:opacity .85s var(--ease), transform .85s var(--ease); }
.ab-rv-fade  { opacity:0;                               transition:opacity 1.1s var(--ease); }
.ab-rv-left  { opacity:0; transform:translateX(-52px);  transition:opacity .8s var(--ease),  transform .8s var(--ease); }
.ab-rv-right { opacity:0; transform:translateX(52px);   transition:opacity .8s var(--ease),  transform .8s var(--ease); }
.ab-rv-scale { opacity:0; transform:scale(.88);          transition:opacity .75s var(--ease), transform .75s var(--ease); }
.ab-vis      { opacity:1 !important; transform:none !important; }

.ab-wrap      { max-width:1100px; margin:0 auto; padding:0 56px; }
.ab-wrap-wide { max-width:1320px; margin:0 auto; padding:0 56px; }

/* ── eyebrow ── */
.ab-eye {
  display:inline-flex; align-items:center; gap:8px;
  font-family:var(--font-body); font-size:11px; font-weight:600;
  letter-spacing:.22em; text-transform:uppercase; color:var(--coral);
}
.ab-eye::before { content:''; display:block; width:20px; height:1.5px; background:var(--coral); border-radius:2px; }

/* ── luxury button ── */
.ab-btn {
  position:relative; overflow:hidden;
  display:inline-flex; align-items:center; gap:10px;
  font-family:var(--font-head); font-size:14px; font-weight:700;
  padding:15px 32px; border-radius:14px; cursor:pointer; border:none; outline:none;
  transition:transform .35s var(--ease), box-shadow .35s;
}
.ab-btn::before {
  content:''; position:absolute; left:-60%; top:0; bottom:0; width:40%;
  background:linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent);
  transform:skewX(-15deg); transition:left .55s var(--ease);
}
.ab-btn:hover::before { left:140%; }
.ab-btn-primary { background:var(--txt-hi); color:#1C0E05; box-shadow:0 8px 28px rgba(0,0,0,.35); }
.ab-btn-primary:hover { transform:translateY(-4px); box-shadow:0 18px 48px rgba(0,0,0,.45); }
.ab-btn-primary:active { transform:scale(.96); transition-duration:.1s; }

/* ══════════════════════
   HERO
══════════════════════ */
.ab-hero {
  position:relative; overflow:hidden;
  padding:160px 56px 100px;
  border-bottom:1px solid var(--line2);
  background:var(--ab-bg4);
}
.ab-hero::before {
  content:''; position:absolute; inset:0; pointer-events:none;
  background:
    radial-gradient(ellipse 55% 65% at 10% 55%, rgba(5,150,105,.12), transparent),
    radial-gradient(ellipse 50% 60% at 88% 18%, rgba(218,119,86,.14), transparent),
    radial-gradient(ellipse 40% 50% at 60% 92%, rgba(217,119,6,.10), transparent);
}

.ab-hero-bg-word {
  position:absolute; right:-60px; top:50%;
  font-family:var(--font-head); font-size:clamp(180px,22vw,320px);
  font-weight:900; color:rgba(240,228,204,.03);
  letter-spacing:-0.05em; line-height:1; pointer-events:none;
  transform:translateY(-50%);
  animation:ab-bg-drift 22s ease-in-out infinite alternate;
  user-select:none;
}

.ab-hero-rule {
  height:1.5px;
  background:linear-gradient(90deg, var(--green), var(--gold), transparent);
  width:160px;
  transform:scaleX(0); transform-origin:left;
  animation:ab-line 1s .15s var(--ease) forwards;
  margin-bottom:52px;
}

.ab-hero-badge {
  position:absolute; top:72px; right:56px;
  background:rgba(217,119,6,.15); border:1.5px solid rgba(217,119,6,.3);
  border-radius:100px; padding:12px 22px;
  font-family:var(--font-head); font-size:12px; font-weight:700;
  color:var(--gold-hi); letter-spacing:.05em; text-transform:uppercase;
  animation:ab-badge-float 4.5s ease-in-out infinite;
  box-shadow:0 8px 28px rgba(217,119,6,.2);
}

/* stat strip */
.ab-stat-strip {
  display:flex; gap:0; margin-top:72px; padding-top:48px;
  border-top:1px solid var(--line2);
}
.ab-stat-item { flex:1; padding-right:40px; border-right:1px solid var(--line2); }
.ab-stat-item:last-child  { border-right:none; padding-right:0; padding-left:40px; }
.ab-stat-item:not(:first-child):not(:last-child) { padding-left:40px; }
.ab-stat-num {
  font-family:var(--font-head);
  font-size:clamp(32px,4.5vw,52px);
  font-weight:900; color:var(--txt-hi); line-height:1; letter-spacing:-0.04em;
  margin-bottom:6px;
}
.ab-stat-label { font-family:var(--font-body); font-size:13px; color:var(--txt-lo); }

/* ══════════════════════
   CHAPTER SYSTEM
══════════════════════ */
.ab-chapter {
  display:grid; grid-template-columns:220px 1fr; gap:64px;
  align-items:start; padding:96px 0;
  border-top:1px solid var(--line);
}
.ab-chapter-label {
  font-family:var(--font-body); font-size:11px; font-weight:600;
  letter-spacing:.22em; text-transform:uppercase; color:var(--txt-xlo);
  padding-top:8px;
}
.ab-chapter-num {
  font-family:var(--font-head); font-size:80px; font-weight:900;
  color:rgba(240,228,204,.05); letter-spacing:-0.05em; line-height:1;
  margin-bottom:4px;
}
.ab-chapter-bar { height:3px; width:48px; border-radius:2px; margin-top:12px; }

/* ── pull-quote ── */
.ab-pull {
  font-family:var(--font-head);
  font-size:clamp(24px,3.2vw,38px);
  font-weight:800; line-height:1.18;
  letter-spacing:-0.025em; color:var(--txt-hi);
  max-width:680px; margin-bottom:24px;
}
.ab-body-text {
  font-family:var(--font-body); font-size:15.5px; font-weight:300;
  color:var(--txt-md); line-height:1.9; max-width:580px;
}

/* callout */
.ab-callout {
  margin-top:28px; padding:18px 22px;
  border-left:3px solid var(--green);
  border-radius:0 12px 12px 0;
  background:rgba(5,150,105,.12);
  font-family:var(--font-body); font-size:14px; font-weight:400;
  color:var(--green-hi); line-height:1.75; max-width:520px;
}

/* ══════════════════════
   VM CARDS
══════════════════════ */
.ab-vm-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(260px,1fr)); gap:16px; }

.ab-vm {
  position:relative; overflow:hidden;
  border-radius:20px; padding:40px 36px;
  border:1.5px solid var(--line2);
  background:var(--ab-bg2);
  transition:transform .5s var(--ease), box-shadow .5s, border-color .35s, background .35s;
  cursor:default;
}
.ab-vm::after {
  content:''; position:absolute; top:-50px; right:-50px;
  width:160px; height:160px; border-radius:50%; pointer-events:none;
}
.ab-vm:hover { transform:translateY(-8px); background:var(--ab-bg3); }

.ab-vm-vision  { border-color:rgba(218,119,86,.25); }
.ab-vm-mission { border-color:rgba(217,119,6,.25); }
.ab-vm-vision::after  { background:radial-gradient(circle, rgba(218,119,86,.12), transparent 70%); }
.ab-vm-mission::after { background:radial-gradient(circle, rgba(217,119,6,.10),  transparent 70%); }
.ab-vm-vision:hover  { box-shadow:0 28px 60px rgba(218,119,86,.2); border-color:rgba(218,119,86,.4); }
.ab-vm-mission:hover { box-shadow:0 28px 60px rgba(217,119,6,.18); border-color:rgba(217,119,6,.4); }

.ab-vm-icon {
  width:44px; height:44px; border-radius:12px;
  display:flex; align-items:center; justify-content:center;
  font-size:22px; margin-bottom:18px;
}
.ab-vm-vision  .ab-vm-icon { background:rgba(218,119,86,.2); }
.ab-vm-mission .ab-vm-icon { background:rgba(217,119,6,.18); }

.ab-vm-label {
  font-family:var(--font-body); font-size:10px; font-weight:600;
  letter-spacing:.2em; text-transform:uppercase; margin-bottom:12px;
}
.ab-vm-vision  .ab-vm-label { color:var(--coral-hi); }
.ab-vm-mission .ab-vm-label { color:var(--gold-hi); }

.ab-vm-text {
  font-family:var(--font-body); font-size:14.5px; font-weight:300;
  color:var(--txt-md); line-height:1.85;
}

/* ══════════════════════
   VALUES INTERLUDE
══════════════════════ */
.ab-values {
  background:var(--ab-bg-alt);
  border-top:1px solid var(--line2);
  border-bottom:1px solid var(--line2);
  padding:80px 0;
}
.ab-values-head {
  font-family:var(--font-head);
  font-size:clamp(26px,3.5vw,40px);
  font-weight:900; letter-spacing:-0.03em;
  color:var(--txt-hi); text-align:center; margin-bottom:52px;
}
.ab-values-grid {
  display:grid;
  grid-template-columns:repeat(auto-fit, minmax(200px,1fr));
  gap:2px;
}
.ab-value-card {
  background:var(--ab-bg2); padding:36px 28px;
  text-align:center; position:relative; overflow:hidden;
  transition:transform .45s var(--ease), background .3s, box-shadow .4s;
  border-right:1px solid var(--line);
}
.ab-value-card:last-child { border-right:none; }
.ab-value-card:hover { transform:translateY(-7px); background:var(--ab-bg3); z-index:1; box-shadow:0 20px 48px rgba(0,0,0,.35); }
.ab-value-icon {
  width:54px; height:54px; border-radius:50%;
  margin:0 auto 18px;
  display:flex; align-items:center; justify-content:center;
  font-size:22px;
}
.ab-value-title {
  font-family:var(--font-head); font-size:15px; font-weight:700;
  color:var(--txt-hi); margin-bottom:8px;
}
.ab-value-desc {
  font-family:var(--font-body); font-size:13px; font-weight:300;
  color:var(--txt-lo); line-height:1.75;
}

/* ══════════════════════
   TIMELINE
══════════════════════ */
.ab-tl-item {
  display:grid; grid-template-columns:100px 1fr; gap:32px;
  padding:28px 0; border-bottom:1px solid var(--line);
  opacity:0; transform:translateX(-36px);
  transition:opacity .7s var(--ease), transform .7s var(--ease);
}
.ab-tl-item:last-child { border-bottom:none; }
.ab-tl-item.ab-vis { opacity:1; transform:none; }

.ab-tl-year {
  font-family:var(--font-head); font-size:12px; font-weight:700;
  letter-spacing:.1em; color:var(--txt-xlo); padding-top:6px;
}
.ab-tl-content { display:flex; gap:14px; align-items:flex-start; }
.ab-tl-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; margin-top:6px; }
.ab-tl-text {
  font-family:var(--font-body); font-size:15px; font-weight:300;
  color:var(--txt-md); line-height:1.85;
}

/* ══════════════════════
   CLIENT PILLS
══════════════════════ */
.ab-client {
  display:inline-flex; align-items:center; gap:10px;
  padding:13px 22px; border-radius:100px;
  background:var(--ab-bg2); border:1.5px solid var(--line2);
  font-family:var(--font-head); font-size:15px; font-weight:600;
  color:var(--txt-md); letter-spacing:-.01em;
  transition:border-color .3s, color .3s, background .3s, transform .45s var(--ease), box-shadow .4s;
  opacity:0; transform:scale(.88) translateY(12px);
}
.ab-client.ab-vis { opacity:1; transform:scale(1) translateY(0); }
.ab-client::before {
  content:''; display:block; width:7px; height:7px; border-radius:50%;
  background:var(--green); transition:background .3s; flex-shrink:0;
}
.ab-client:hover {
  border-color:var(--green-hi);
  background:rgba(5,150,105,.14);
  color:var(--green-hi);
  transform:translateY(-5px) scale(1) !important;
  box-shadow:0 12px 32px rgba(5,150,105,.2);
}
.ab-client:hover::before { background:var(--green-hi); animation:ab-pulse-green 1.2s infinite; }

/* ══════════════════════
   CTA PANEL
══════════════════════ */
.ab-cta {
  background:var(--ab-bg2);
  border:1px solid var(--line2);
  border-radius:28px; padding:80px 64px;
  position:relative; overflow:hidden; text-align:center;
}
.ab-cta::before {
  content:''; position:absolute; inset:0; pointer-events:none;
  background:
    radial-gradient(ellipse 55% 65% at 25% 50%, rgba(5,150,105,.14), transparent),
    radial-gradient(ellipse 45% 55% at 78% 28%, rgba(218,119,86,.12), transparent),
    radial-gradient(ellipse 40% 50% at 60% 90%, rgba(217,119,6,.10), transparent);
}
.ab-cta-shimmer {
  position:absolute; top:0; bottom:0; width:40%;
  background:linear-gradient(90deg, transparent, rgba(255,255,255,.03), transparent);
  transform:skewX(-15deg);
  animation:ab-shimmer 6s ease-in-out infinite;
  pointer-events:none;
}
.ab-cta h2 {
  font-family:var(--font-head);
  font-size:clamp(32px,5vw,56px);
  font-weight:900; letter-spacing:-0.035em;
  color:var(--txt-hi); margin-bottom:16px; position:relative;
}
.ab-cta p {
  font-family:var(--font-body); font-size:17px; font-weight:300;
  color:var(--txt-lo); margin-bottom:44px;
  line-height:1.75; position:relative;
}
.ab-cta .ab-btn-primary {
  background:linear-gradient(135deg, var(--green), var(--green-hi));
  color:#fff;
  box-shadow:0 8px 28px rgba(5,150,105,.35);
}
.ab-cta .ab-btn-primary:hover {
  box-shadow:0 18px 48px rgba(5,150,105,.45);
}

/* ══════════════════════
   FOOTER INSIDE PAGE
══════════════════════ */
.ab-page-footer {
  border-top:1px solid var(--line); padding:32px 56px;
  text-align:center; font-family:var(--font-body);
  font-size:13px; color:var(--txt-xlo);
}

/* ── RESPONSIVE ── */
@media(max-width:960px){
  .ab-wrap, .ab-wrap-wide { padding:0 32px; }
  .ab-hero { padding:140px 32px 80px; }
  .ab-chapter { grid-template-columns:1fr; gap:32px; padding:72px 32px; }
  .ab-hero-bg-word { font-size:120px; }
  .ab-cta { padding:56px 36px; }
  .ab-hero-badge { display:none; }
  .ab-stat-strip { flex-wrap:wrap; gap:32px; border-top:1px solid var(--line2); }
  .ab-stat-item { border-right:none; padding:0; flex:none; width:calc(50% - 16px); }
}
@media(max-width:600px){
  .ab-hero { padding:120px 24px 64px; }
  .ab-chapter { padding:60px 24px; }
  .ab-values { padding:60px 0; }
  .ab-values-grid { gap:0; }
  .ab-value-card { border-right:none; border-bottom:1px solid var(--line); }
  .ab-cta { padding:48px 24px; border-radius:20px; }
  .ab-page-footer { padding:28px 24px; }
  .ab-hero-bg-word { font-size:80px; }
}
`;

function Styles() {
  useEffect(() => {
    if (document.getElementById("ab2-css")) return;
    const t = document.createElement("style");
    t.id = "ab2-css"; t.textContent = CSS;
    document.head.prepend(t);
    return () => t.remove();
  }, []);
  return null;
}

function useCountUp(target, suffix = "+", duration = 1800) {
  const [value, setValue] = useState("0" + suffix);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const update = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = t * t * (3 - 2 * t);
      setValue(Math.round(eased * target) + suffix);
      if (t < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [started, target, suffix, duration]);

  return [value, setStarted];
}

function StatItem({ target, suffix, label, delay }) {
  const [value, setStarted] = useCountUp(target, suffix);
  const ref = useEffect(() => {}, []);

  useEffect(() => {
    const el = document.querySelector(".ab-stat-strip");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setStarted(true), delay); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, setStarted]);

  return (
    <div className="ab-stat-item">
      <div className="ab-stat-num">{value}</div>
      <div className="ab-stat-label">{label}</div>
    </div>
  );
}

function About() {
  const go = useDelayedMount(60);
  useScrollReveal(".ab-rv,.ab-rv-fade,.ab-rv-left,.ab-rv-right,.ab-rv-scale,.ab-tl-item,.ab-client,.ab-value-card", "ab-vis");

  const hi = (d) => ({
    opacity: go ? 1 : 0,
    animation: go ? `ab-up .8s ${d}s cubic-bezier(.16,1,.3,1) forwards` : "none",
  });

  const TIMELINE_DATA = TIMELINE?.length ? TIMELINE : [
    { year: "2016", text: "Founded in Kumasi's Kwadaso-Ohwimase area, offering professional cleaning services to local businesses and households." },
    { year: "2018", text: "Secured first major institutional client, marking the shift into corporate service delivery." },
    { year: "2020", text: "Expanded into healthcare cleaning, establishing strict hygiene protocols for medical facilities." },
    { year: "2022", text: "Added laundry services and fumigation, growing the client base to include major financial institutions." },
    { year: "2024", text: "Launched car detailing and outsourced cleaning staff; now serving 500+ clients across the Ashanti Region." },
  ];

  const CLIENTS_DATA = CLIENTS?.length ? CLIENTS : [
    "St Martins Hospital", "Star Assurance", "Nuben Court",
    "Kumasi Technical University", "Faith Healers Hospital", "Private Estates",
  ];

  const tlDotColors = ["var(--coral)", "var(--gold)", "var(--green)", "var(--gold)", "var(--coral)"];

  return (
    <PageWrapper>
      <Helmet>
        <title>About Us | Chapman Prestige Limited</title>
        <meta name="description" content="Learn about Chapman Prestige: our mission, team, and commitment to quality cleaning services in Ghana since 2016." />
        <link rel="canonical" href="https://chapmanprestigelimited.com/about" />
      </Helmet>

      <div className="ab">
        <Styles />

        {/* ── HERO ── */}
        <section className="ab-hero">
          <div className="ab-hero-bg-word">PRESTIGE</div>

          <div className="ab-hero-badge" style={hi(0.6)}>✦ Est. 2016</div>

          <div className="ab-wrap" style={{ position: "relative" }}>
            <div className="ab-hero-rule" />

            <p className="ab-eye" style={{ marginBottom: 32, ...hi(0.38) }}>
              Est. 2016 · Kumasi, Ghana
            </p>

            <h1 style={{
              fontFamily: "var(--font-head)",
              fontSize: "clamp(52px,9vw,108px)",
              fontWeight: 900, lineHeight: .90, letterSpacing: "-0.045em",
              color: "var(--txt-hi)", marginBottom: 36, maxWidth: 860,
              ...hi(0.48),
            }}>
              Built on<br />
              <span style={{ color: "var(--gold-hi)" }}>Eight Years</span><br />
              of <em style={{ fontStyle: "normal", color: "var(--coral-hi)" }}>Trust.</em>
            </h1>

            <p style={{
              fontFamily: "var(--font-body)", fontSize: 18, fontWeight: 300,
              color: "var(--txt-md)", lineHeight: 1.8, maxWidth: 500,
              ...hi(0.6),
            }}>
              {BUSINESS.shortName}, the Ashanti Region's trusted partner for professional
              cleaning, laundry, and sanitation since 2016.
            </p>

            {/* stat strip */}
            <div className="ab-stat-strip" style={hi(0.72)}>
              <StatItem target={10}   suffix="+" label="Years active"    delay={0}   />
              <StatItem target={500} suffix="+" label="Clients served"  delay={180} />
              <StatItem target={4}   suffix="+" label="Service lines"   delay={360} />
            </div>
          </div>
        </section>

        {/* ── VALUES INTERLUDE ── */}
        <section className="ab-values">
          <div className="ab-wrap">
            <h2 className="ab-values-head ab-rv">What We Stand For</h2>
            <div className="ab-values-grid">
              {[
                { icon: "🎯", label: "Precision",      desc: "Every facility treated with exacting detail, every time.",                       bg: "rgba(218,119,86,.2)"  },
                { icon: "🌿", label: "Sustainability",  desc: "Eco-friendly products safe for people and the environment.",                     bg: "rgba(5,150,105,.2)"   },
                { icon: "🤝", label: "Trust",          desc: "Institutions depend on us because we deliver without fail.",                      bg: "rgba(217,119,6,.2)"   },
                { icon: "⭐", label: "Excellence",     desc: "We hold every space to the highest standard of cleanliness.",                     bg: "rgba(5,150,105,.15)"  },
              ].map(({ icon, label, desc, bg }, i) => (
                <div key={label} className="ab-value-card ab-rv" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="ab-value-icon" style={{ background: bg }}>{icon}</div>
                  <div className="ab-value-title">{label}</div>
                  <div className="ab-value-desc">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CHAPTER 01: WHO WE ARE ── */}
        <section style={{ padding: "0 56px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="ab-chapter">
              <div>
                <div className="ab-chapter-num ab-rv-fade" style={{ color: "var(--green)", fontWeight: 800 }}>01</div>
<div className="ab-chapter-label ab-rv" style={{ color: "var(--gold-hi)", fontWeight: 600 }}>Who we are</div>
<div className="ab-chapter-bar ab-rv" style={{ background: "linear-gradient(90deg,var(--green),var(--gold-hi))", transitionDelay: ".08s" }} />
              </div>
              <div>
                <p className="ab-pull ab-rv">
                  A cleaning company that treats every facility like it's our own.
                </p>
                <p className="ab-body-text ab-rv" style={{ transitionDelay: ".1s" }}>
                  {BUSINESS.name} is a professional cleaning and laundry company
                  based in Kwadaso-Ohwimase, Kumasi. We serve corporate organisations,
                  healthcare institutions, financial establishments, and private clients across
                  the Ashanti Region.
                </p>
                <p className="ab-body-text ab-rv" style={{ marginTop: 20, transitionDelay: ".18s" }}>
                  We are committed to professionalism, attention to detail, and client satisfaction.
                  Our team is trained and supervised to ensure every facility we serve meets the
                  highest standards of cleanliness and hygiene, every single visit.
                </p>
                <div className="ab-callout ab-rv" style={{ transitionDelay: ".26s" }}>
                  Trusted by hospitals, banks, and 500+ clients since 2016. We've built our
                  reputation one clean facility at a time.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CHAPTER 02: VISION & MISSION ── */}
        <section style={{ padding: "0 56px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="ab-chapter">
              <div>
                <div className="ab-chapter-num ab-rv-fade" style={{ color: "var(--green)", fontWeight: 800 }}>02</div>
<div className="ab-chapter-label ab-rv" style={{ color: "var(--gold-hi)", fontWeight: 600 }}>Our Purpose</div>
<div className="ab-chapter-bar ab-rv" style={{ background: "linear-gradient(90deg, var(--green), var(--gold-hi))", transitionDelay: ".08s" }} />
              </div>
              <div>
                <p className="ab-pull ab-rv" style={{ marginBottom: 32 }}>
                  Driven by a vision bigger than Kumasi.
                </p>
                <div className="ab-vm-grid">
                  {[
                    {
                      cls: "ab-vm-vision",
                      icon: "🔭",
                      label: "Vision",
                      text: "To become the most trusted cleaning and sanitation provider in Ghana and expand across Africa, delivering excellence everywhere we serve.",
                    },
                    {
                      cls: "ab-vm-mission",
                      icon: "🌱",
                      label: "Mission",
                      text: "To deliver outstanding cleaning and laundry services using sustainable, environmentally friendly products that ensure safety for clients, communities, and the environment.",
                    },
                  ].map(({ cls, icon, label, text }, i) => (
                    <div key={label} className={`ab-vm ${cls} ab-rv`} style={{ transitionDelay: `${i * 0.12}s` }}>
                      <div className="ab-vm-icon">{icon}</div>
                      <div className="ab-vm-label">{label}</div>
                      <p className="ab-vm-text">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CHAPTER 03: HISTORY ── */}
        <section style={{ padding: "0 56px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="ab-chapter">
              <div>
                <div className="ab-chapter-num ab-rv-fade" style={{ color: "var(--green)", fontWeight: 800 }}>03</div>
<div className="ab-chapter-label ab-rv" style={{ color: "var(--gold-hi)", fontWeight: 600 }}>Our history</div>
<div className="ab-chapter-bar ab-rv" style={{ background: "linear-gradient(90deg, var(--green), var(--gold-hi))", transitionDelay: ".08s" }} />
              </div>
              <div style={{ width: "100%" }}>
                <p className="ab-pull ab-rv" style={{ marginBottom: 40 }}>
                  Eight years of steady, earned growth.
                </p>
                {TIMELINE_DATA.map((item, i) => (
  <div key={item.year} className="ab-tl-item" style={{ transitionDelay: `${i * 0.1}s` }}>
    <div 
      className="ab-tl-year"
      style={{
        background: "linear-gradient(135deg, var(--green), var(--gold-hi))",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {item.year}
    </div>
    <div className="ab-tl-content">
      <div className="ab-tl-dot" style={{ background: tlDotColors[i % tlDotColors.length] }} />
      <p className="ab-tl-text">{item.text}</p>
    </div>
  </div>
))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CHAPTER 04: CLIENTS ── */}
        <section style={{ padding: "0 56px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="ab-chapter" style={{ alignItems: "center" }}>
              <div>
                <div className="ab-chapter-num ab-rv-fade" style={{ color: "var(--green)", fontWeight: 800 }}>04</div>
<div className="ab-chapter-label ab-rv" style={{ color: "var(--gold-hi)", fontWeight: 600 }}>Major clients</div>
<div className="ab-chapter-bar ab-rv" style={{ background: "linear-gradient(90deg, var(--green), var(--gold-hi))", transitionDelay: ".08s" }} />
              </div>
              <div>
                <p className="ab-pull ab-rv" style={{ marginBottom: 36 }}>
                  Trusted by institutions that demand the highest standards.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  {CLIENTS_DATA.map((c, i) => (
                    <div key={c} className="ab-client" style={{ transitionDelay: `${i * 0.1}s` }}>
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding: "0 56px 100px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="ab-cta ab-rv">
              <div className="ab-cta-shimmer" />
              <p className="ab-eye" style={{ justifyContent: "center", marginBottom: 20, color: "rgba(255,255,255,.4)" }}>
                Work with us
              </p>
              <h2>Ready to Work With Us?</h2>
              <p>Professional cleaning services tailored to your needs, anywhere in Kumasi.</p>
              <Link to="/contact" className="ab-btn ab-btn-primary">Contact Us</Link>
            </div>
          </div>
        </section>

        <footer className="ab-page-footer">
          © {new Date().getFullYear()} {BUSINESS.name}.
        </footer>
      </div>
    </PageWrapper>
  );
}

export default About;