import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Sparkles, ShieldCheck, Truck, Droplets, X, ArrowRight, ChevronRight } from "lucide-react";
import { useReveal, useDelayedMount } from "../utils/hooks";
import VideoCarousel from "../components/VideoCarousel";
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
  --cream:        #FAF6EE;
  --cocoa:        #18120C;
  --cocoa2:       #231A12;
  --cocoa3:       #2E2218;

  --green:        #059669;
  --green-hi:     #10B981;
  --green-deep:   #047857;
  --gold:         #D97706;
  --gold-hi:      #F59E0B;
  --gold-low:     #92400E;

  --ink:          #1C1208;
  --ink-70:       #4B3E30;
  --ink-45:       #7A6A59;
  --ink-25:       #A89B8C;

  --line:         rgba(28,18,8,0.10);
  --line2:        rgba(28,18,8,0.18);
  --glow-g:       rgba(5,150,105,0.18);
  --glow-o:       rgba(217,119,6,0.15);

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
@keyframes hm-rise  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
@keyframes hm-fade  { from{opacity:0} to{opacity:1} }
@keyframes hm-pop   { from{opacity:0;transform:scale(.93) translateY(8px)} to{opacity:1;transform:scale(1) translateY(0)} }
@keyframes hm-line  { from{transform:scaleX(0)} to{transform:scaleX(1)} }
@keyframes hm-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
@keyframes hm-orb   { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.08)} 66%{transform:translate(-20px,15px) scale(.95)} }
@keyframes hm-grain { 0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)} 20%{transform:translate(3%,2%)} 30%{transform:translate(-1%,4%)} 40%{transform:translate(4%,-1%)} 50%{transform:translate(-3%,3%)} 60%{transform:translate(2%,-4%)} 70%{transform:translate(-4%,1%)} 80%{transform:translate(1%,-2%)} 90%{transform:translate(-2%,4%)} }
@keyframes hm-shimmer { from{transform:translateX(-100%)} to{transform:translateX(100%)} }

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
  color:var(--gold); margin-bottom:18px;
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
  background:linear-gradient(140deg,#fff 30%,var(--gold-hi) 100%);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
  background-clip:text;
}
.hm-h2 {
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
  box-shadow:0 4px 16px rgba(5,150,105,.28);
  transition:transform .25s var(--ease),box-shadow .25s,filter .25s;
}
.hm-btn-primary:hover { transform:translateY(-3px); box-shadow:0 10px 28px rgba(5,150,105,.38); filter:brightness(1.05); }
.hm-btn-primary:active { transform:translateY(-1px) scale(.97); transition-duration:.1s; }

.hm-btn-ghost {
  display:inline-flex; align-items:center; gap:9px;
  border:1.5px solid rgba(255,255,255,.25);
  color:rgba(255,255,255,.85);
  font-family:var(--fh); font-size:13.5px; font-weight:600;
  padding:12px 24px; border-radius:100px;
  transition:border-color .25s,color .25s,background .25s,transform .25s var(--ease);
  backdrop-filter:blur(8px);
}
.hm-btn-ghost:hover { border-color:rgba(255,255,255,.55); color:#fff; background:rgba(255,255,255,.08); transform:translateY(-2px); }

/* ── Hero noise overlay ── */
.hm-grain {
  position:absolute; inset:-40%; width:180%; height:180%;
  opacity:.038;
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

/* ── Service cards ── */
.hm-card {
  background:var(--cocoa2);
  border:1.5px solid rgba(255,255,255,.07);
  border-radius:22px; padding:36px 30px;
  cursor:pointer; position:relative; overflow:hidden;
  transition:border-color .3s,background .3s,transform .38s var(--ease),box-shadow .38s var(--ease);
}
.hm-card::before {
  content:''; position:absolute; inset:0;
  background:linear-gradient(135deg,rgba(5,150,105,.06) 0%,transparent 60%);
  opacity:0; transition:opacity .4s;
}
.hm-card::after {
  content:''; position:absolute;
  top:0; left:-100%; width:60%; height:100%;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent);
  transition:left .5s var(--ease);
}
.hm-card:hover { border-color:rgba(5,150,105,.45); background:var(--cocoa3); transform:translateY(-7px); box-shadow:0 30px 60px rgba(5,150,105,.14),0 0 0 1px rgba(5,150,105,.1); }
.hm-card:hover::before { opacity:1; }
.hm-card:hover::after { left:140%; }

.hm-card-icon-wrap {
  width:50px; height:50px; border-radius:14px;
  border:1.5px solid rgba(255,255,255,.1);
  background:rgba(255,255,255,.06);
  display:flex; align-items:center; justify-content:center;
  color:var(--green); margin-bottom:22px;
  transition:background .3s,border-color .3s,color .3s,transform .3s var(--ease);
}
.hm-card:hover .hm-card-icon-wrap {
  background:var(--green); color:#fff;
  border-color:var(--green-hi);
  transform:scale(1.08) rotate(-4deg);
}
.hm-card-title {
  font-family:var(--fh); font-size:17px; font-weight:700;
  color:#fff; margin-bottom:10px;
}
.hm-card-desc {
  font-family:var(--fb); font-size:13px; font-weight:400;
  color:rgba(255,255,255,.42); line-height:1.65;
}
.hm-card-arrow {
  position:absolute; bottom:22px; right:24px;
  color:rgba(255,255,255,.18);
  transition:color .3s,transform .3s var(--ease);
}
.hm-card:hover .hm-card-arrow { color:var(--green-hi); transform:translate(4px,-4px); }

/* ── About panel ── */
.hm-panel {
  background:var(--cocoa2);
  border:1.5px solid rgba(255,255,255,.07);
  border-radius:26px; padding:64px 60px;
  display:grid; grid-template-columns:1fr 220px;
  gap:56px; align-items:center;
}

/* ── Why list ── */
.hm-why {
  display:flex; align-items:center; gap:14px;
  padding:17px 22px; border-radius:14px;
  border:1.5px solid var(--line2);
  background:#fff;
  font-family:var(--fb); font-size:14px; font-weight:500;
  color:var(--ink);
  transition:border-color .28s,transform .32s var(--ease),box-shadow .32s;
}
.hm-why:hover { border-color:var(--green); transform:translateX(7px); box-shadow:0 4px 20px rgba(5,150,105,.1); }
.hm-why-dot {
  width:8px; height:8px; border-radius:50%;
  background:var(--green); flex-shrink:0;
  box-shadow:0 0 0 3px rgba(5,150,105,.15);
  transition:box-shadow .3s;
}
.hm-why:hover .hm-why-dot { box-shadow:0 0 0 5px rgba(5,150,105,.2); }

/* ── CTA panel ── */
.hm-cta-panel {
  background:var(--cocoa2);
  border:1.5px solid rgba(255,255,255,.07);
  border-radius:26px; padding:88px 60px;
  text-align:center; position:relative; overflow:hidden;
}
.hm-cta-panel::before {
  content:''; position:absolute;
  top:-120px; left:50%; transform:translateX(-50%);
  width:480px; height:480px; border-radius:50%;
  background:radial-gradient(circle,rgba(217,119,6,.12),transparent 70%);
  pointer-events:none;
}
.hm-cta-panel::after {
  content:''; position:absolute;
  bottom:-80px; right:-80px;
  width:300px; height:300px; border-radius:50%;
  background:radial-gradient(circle,rgba(5,150,105,.1),transparent 70%);
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
  color:var(--cocoa); white-space:nowrap;
}
.hm-marquee-item::after { content:'◆'; font-size:7px; opacity:.4; }

/* ── Divider ── */
.hm-divider { height:1px; background:var(--line); }

/* ── Stat number ── */
.hm-stat-num {
  font-family:var(--fh);
  font-size:clamp(30px,4vw,48px);
  font-weight:800; color:#fff;
  line-height:1; letter-spacing:-.04em;
}
.hm-stat-label {
  font-family:var(--fb); font-size:12px;
  color:rgba(255,255,255,.38); margin-top:5px;
  letter-spacing:.04em;
}

/* ── Modal ── */
.hm-overlay {
  position:fixed; inset:0; z-index:9999;
  background:rgba(18,12,6,.85);
  backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
  display:grid; place-items:center; padding:24px;
  animation:hm-fade .2s ease forwards;
}
.hm-modal {
  position:relative; width:100%; max-width:500px;
  background:var(--cream);
  border:1.5px solid var(--line2);
  border-radius:24px; padding:36px 32px;
  max-height:88vh; overflow-y:auto;
  animation:hm-pop .32s var(--ease) forwards;
  box-shadow:0 40px 80px rgba(0,0,0,.3);
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
  background:rgba(5,150,105,.08); color:var(--green);
  border:1px solid rgba(5,150,105,.2);
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
  color:var(--gold); margin-bottom:16px;
}
.hm-modal-steps { display:flex; flex-direction:column; gap:12px; margin-bottom:28px; }
.hm-modal-step {
  display:flex; gap:14px; align-items:flex-start;
  padding:14px 16px; border-radius:14px;
  background:rgba(28,18,8,.03);
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
  box-shadow:0 6px 18px rgba(5,150,105,.28);
  transition:transform .25s var(--ease),box-shadow .25s,filter .25s;
}
.hm-modal-cta:hover { transform:translateY(-2px); box-shadow:0 12px 32px rgba(5,150,105,.38); filter:brightness(1.04); }
.hm-modal-cta:active { transform:scale(.97); transition-duration:.1s; }

/* ── Responsive ── */
@media(max-width:768px){
  .hm-wrap { padding:0 22px; }
  .hm-section { padding:76px 0; }
  .hm-panel { grid-template-columns:1fr; gap:36px; padding:40px 30px; }
  .hm-cta-panel { padding:64px 30px; }
}
@media(max-width:560px){
  .hm-h1 { font-size:40px; }
  .hm-h2, .hm-h2-dark { font-size:28px; }
}
`;

function StyleTag() {
  useEffect(() => {
    if (document.getElementById("hm-css-v2")) return;
    const el = document.createElement("style");
    el.id = "hm-css-v2"; el.textContent = CSS;
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

// Service-specific workflows for the modal
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
  { step: "4", title: "Quality Inspection & Handover", desc: "We conduct a thorough walkthrough to ensure every zone meets our strict standards, leaving your space fresh, safe, and ready for immediate use." }
]
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
        <VideoCarousel videos={HOME_VIDEOS} duration={10000} transition="fade" showOnMobile={true} />

        {/* Colour orbs */}
        <div className="hm-orb" style={{ width:600, height:600, top:"10%", left:"60%", background:"radial-gradient(circle,rgba(5,150,105,.22),transparent 70%)", animationDuration:"16s" }} />
        <div className="hm-orb" style={{ width:400, height:400, top:"55%", left:"10%", background:"radial-gradient(circle,rgba(217,119,6,.18),transparent 70%)", animationDuration:"11s", animationDelay:"4s" }} />
        <div className="hm-grain" />

        {/* Full-cover dark overlay so text is always readable */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(18,12,6,.85) 0%, rgba(18,12,6,.5) 50%, rgba(18,12,6,.3) 100%)", zIndex:1, pointerEvents:"none" }} />

        <div style={{ position:"relative", zIndex:2, maxWidth:860, margin:"0 auto", width:"100%" }}>
          <p className="hm-eyebrow" style={hi(0)}>
            Est. 2016 · Kumasi, Ghana
          </p>

          <h1 className="hm-h1" style={{ marginBottom:24, ...hi(0.08) }}>
            Professional Cleaning&nbsp;&amp; Laundry Services You Can&nbsp;Trust
          </h1>

          <p style={{ fontFamily:"var(--fb)", fontSize:17, fontWeight:500, color:"rgba(255,255,255,.78)", lineHeight:1.8, maxWidth:520, marginBottom:40, ...hi(0.16) }}>
            Chapman Prestige Limited delivers high-quality cleaning, laundry, fumigation,
            and sanitation for homes, hospitals, offices, and institutions across Ghana.
          </p>

          <div style={{ display:"flex", gap:12, flexWrap:"wrap", ...hi(0.24) }}>
            <Link to="/contact" className="hm-btn-primary">Book a Service <ArrowRight size={15} /></Link>
            <Link to="/services" className="hm-btn-ghost">Explore Services</Link>
          </div>

          {/* Stats */}
          <div style={{ display:"flex", gap:48, marginTop:64, paddingTop:48, borderTop:"1px solid rgba(255,255,255,.12)", flexWrap:"wrap", ...hi(0.34) }}>
            {[
              { value:10,   suffix:"+", label:"Years in Business" },
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
      </section>

      {/* ── TRUST MARQUEE ── */}
      <div style={{ background:"var(--gold)", padding:"20px 0", overflow:"hidden", borderBottom:"1px solid var(--line)" }}>
        <div className="hm-marquee-wrap">
          <div className="hm-marquee-track">
            {[...TRUST, ...TRUST, ...TRUST, ...TRUST].map((t, i) => (
              <div key={i} className="hm-marquee-item">{t}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section className="hm-section" ref={svcRef} style={{ background:var_cocoa() }}>
        <div className="hm-wrap">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:52, flexWrap:"wrap", gap:20 }}>
            <div>
              <p className={`hm-eyebrow hm-rv ${svcShow ? "show" : ""}`}>What We Do</p>
              <h2 className={`hm-h2 hm-rv ${svcShow ? "show" : ""}`} style={{ animationDelay:".06s" }}>Our Core Services</h2>
            </div>
            <Link to="/services"
              className={`hm-rv ${svcShow ? "show" : ""}`}
              style={{ animationDelay:".12s", fontFamily:"var(--fh)", fontSize:13, fontWeight:700, color:"var(--green-hi)", display:"flex", alignItems:"center", gap:6 }}>
              View All <ChevronRight size={14} />
            </Link>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(245px,1fr))", gap:16 }}>
            {SERVICES.map((s, i) => (
              <div key={s.title} className={`hm-card hm-rv d${i+1} ${svcShow ? "show" : ""}`} onClick={() => setSelected(s)}>
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
      <section className="hm-section" ref={abtRef} style={{ background:var_cocoa() }}>
        <div className="hm-wrap">
          <div className={`hm-panel hm-rv ${abtShow ? "show" : ""}`}>
            <div>
              <p className="hm-eyebrow">Who We Are</p>
              <h2 className="hm-h2" style={{ marginBottom:20 }}>Built on Trust &amp; Quality</h2>
              <p style={{ fontFamily:"var(--fb)", fontSize:15.5, fontWeight:400, color:"rgba(255,255,255,.65)", lineHeight:1.82, marginBottom:36, maxWidth:520 }}>
                Chapman Prestige Limited is a professional cleaning and laundry company based in
                Kwadaso-Ohwimase, Kumasi. Since 2016, we've been committed to reliable, consistent,
                high-quality service using trained staff and professional-grade equipment.
              </p>
              <Link to="/about" style={{
                display:"inline-flex", alignItems:"center", gap:8,
                fontFamily:"var(--fh)", fontSize:13.5, fontWeight:700,
                color:"var(--green-hi)",
                borderBottom:"1.5px solid rgba(16,185,129,.35)", paddingBottom:4,
                transition:"border-color .2s,color .2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--green-hi)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(16,185,129,.35)"; }}
              >
                Learn more <ArrowRight size={14} />
              </Link>
            </div>

            {/* Mini stats */}
            <div style={{ borderLeft:"1px solid rgba(255,255,255,.1)", paddingLeft:48, display:"flex", flexDirection:"column", gap:0 }}>
              {[{ n:"10+", l:"Years Active" }, { n:"500+", l:"Happy Clients" }, { n:"4", l:"Core Services" }].map(({ n, l }, i) => (
                <div key={l} style={{ padding:"22px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,.08)" : "none" }}>
                  <div style={{ fontFamily:"var(--fh)", fontSize:34, fontWeight:800, color:"#fff", lineHeight:1, letterSpacing:"-.04em" }}>{n}</div>
                  <div style={{ fontFamily:"var(--fb)", fontSize:12, color:"rgba(255,255,255,.38)", marginTop:5 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="hm-section" ref={whyRef}>
        <div className="hm-wrap">
          <p className={`hm-eyebrow hm-rv ${whyShow ? "show" : ""}`} style={{ color:"var(--gold)" }}>Our Edge</p>
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
      <section style={{ padding:"0 44px 108px" }} ref={ctaRef}>
        <div className="hm-wrap">
          <div className={`hm-cta-panel hm-rv ${ctaShow ? "show" : ""}`}>
            <div style={{ position:"relative", zIndex:1 }}>
              <p className="hm-eyebrow" style={{ justifyContent:"center" }}>Get Started</p>
              <h2 className="hm-h2" style={{ marginBottom:16 }}>Need Cleaning Services Today?</h2>
              <p style={{ fontFamily:"var(--fb)", fontSize:16, fontWeight:400, color:"rgba(255,255,255,.6)", marginBottom:44, lineHeight:1.75, maxWidth:460, margin:"0 auto 44px" }}>
                Contact Chapman Prestige Limited now and get fast, professional service anywhere in Kumasi.
              </p>
              <Link to="/contact" className="hm-btn-primary" style={{ margin:"0 auto" }}>
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
            {/* Replace the old WORKFLOW.map block with this */}
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

// tiny helper so the dark-bg sections don't need inline style duplication
function var_cocoa() { return "var(--cocoa2)"; }