import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useScrollReveal, useDelayedMount } from "../utils/hooks";
import { SERVICES_LIST, BUSINESS } from "../config/business.jsx";
import VideoCarousel from "../components/VideoCarousel";
import { Helmet } from "react-helmet-async";

const SERVICE_VIDEOS = [
  { src: "/videos/car-2.mp4",        type: "video/mp4" },
  { src: "/videos/home-3.mp4",       type: "video/mp4" },
  { src: "/videos/fumigation-1.mp4", type: "video/mp4" },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

:root {
  --cream:      #FAF6EE;
  --cocoa:      #18120C;
  --cocoa2:     #231A12;
  --cocoa3:     #2E2218;

  --green:      #059669;
  --green-hi:   #10B981;
  --green-deep: #047857;
  --gold:       #D97706;
  --gold-hi:    #F59E0B;
  --gold-low:   #92400E;

  --ink:        #1C1208;
  --ink-70:     #4B3E30;
  --ink-45:     #7A6A59;
  --ink-25:     #A89B8C;

  --line:       rgba(28,18,8,0.10);
  --line2:      rgba(28,18,8,0.18);

  --fh: 'Outfit', system-ui, sans-serif;
  --fb: 'DM Sans', system-ui, sans-serif;
  --ease:  cubic-bezier(.16,1,.3,1);
  --ease2: cubic-bezier(.4,0,.2,1);
}

.sv *, .sv *::before, .sv *::after { box-sizing:border-box; margin:0; padding:0; }
.sv { background:var(--cream); color:var(--ink-70); font-family:var(--fb); min-height:100vh; overflow-x:hidden; }
.sv a { text-decoration:none; }

/* ── Keyframes ── */
@keyframes sv-rise    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
@keyframes sv-left    { from{opacity:0;transform:translateX(-32px)} to{opacity:1;transform:translateX(0)} }
@keyframes sv-right   { from{opacity:0;transform:translateX(32px)} to{opacity:1;transform:translateX(0)} }
@keyframes sv-line    { from{transform:scaleX(0)} to{transform:scaleX(1)} }
@keyframes sv-orb     { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(24px,-18px) scale(1.07)} 66%{transform:translate(-18px,14px) scale(.95)} }
@keyframes sv-grain   { 0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)} 30%{transform:translate(-1%,4%)} 60%{transform:translate(2%,-4%)} 90%{transform:translate(-2%,4%)} }
@keyframes sv-shimmer { from{transform:translateX(-100%)} to{transform:translateX(180%)} }
@keyframes sv-counter { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

/* ── Scroll reveals ── */
.sv-from-left  { opacity:0; transform:translateX(-32px); transition:opacity .7s var(--ease), transform .7s var(--ease); }
.sv-from-right { opacity:0; transform:translateX(32px);  transition:opacity .7s var(--ease), transform .7s var(--ease); }
.sv-from-below { opacity:0; transform:translateY(28px);  transition:opacity .7s var(--ease), transform .7s var(--ease); }
.sv-visible    { opacity:1 !important; transform:none !important; }

/* ── Wrap ── */
.sv-wrap { max-width:1140px; margin:0 auto; padding:0 44px; }

/* ── Eyebrow ── */
.sv-eye {
  display:inline-flex; align-items:center; gap:10px;
  font-family:var(--fb); font-size:10.5px; font-weight:600;
  letter-spacing:.22em; text-transform:uppercase;
  color:var(--gold); margin-bottom:18px;
}
.sv-eye::before {
  content:''; display:block; width:18px; height:1.5px;
  background:currentColor; border-radius:2px;
}

/* ── Headlines ── */
.sv-h1 {
  font-family:var(--fh);
  font-size:clamp(46px,6.5vw,84px);
  font-weight:800; line-height:.97;
  letter-spacing:-.04em;
  background:linear-gradient(140deg,#fff 30%,var(--gold-hi) 100%);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
  background-clip:text;
}
.sv-h2 {
  font-family:var(--fh);
  font-size:clamp(28px,4vw,52px);
  font-weight:800; line-height:1.04;
  letter-spacing:-.035em;
  color:var(--ink);
}
.sv-h2-dark {
  font-family:var(--fh);
  font-size:clamp(28px,4vw,52px);
  font-weight:800; line-height:1.04;
  letter-spacing:-.035em;
  color:#fff;
}

/* ── Buttons ── */
.sv-btn-primary {
  display:inline-flex; align-items:center; gap:9px;
  background:linear-gradient(135deg,var(--green),var(--green-hi));
  color:#fff; font-family:var(--fh);
  font-size:13.5px; font-weight:700; letter-spacing:.01em;
  padding:13px 28px; border-radius:100px;
  box-shadow:0 4px 16px rgba(5,150,105,.28);
  transition:transform .25s var(--ease), box-shadow .25s, filter .25s;
}
.sv-btn-primary:hover { transform:translateY(-3px); box-shadow:0 10px 28px rgba(5,150,105,.4); filter:brightness(1.06); }
.sv-btn-primary:active { transform:scale(.97); transition-duration:.1s; }

.sv-btn-ghost {
  display:inline-flex; align-items:center; gap:9px;
  border:1.5px solid rgba(255,255,255,.3);
  color:rgba(255,255,255,.85);
  font-family:var(--fh); font-size:13.5px; font-weight:600;
  padding:12px 24px; border-radius:100px;
  backdrop-filter:blur(8px);
  transition:border-color .25s, color .25s, background .25s, transform .25s var(--ease);
}
.sv-btn-ghost:hover { border-color:rgba(255,255,255,.6); color:#fff; background:rgba(255,255,255,.1); transform:translateY(-2px); }

/* ── Hero ── */
.sv-hero {
  min-height:80vh;
  display:flex; flex-direction:column; justify-content:center;
  padding:140px 44px 90px;
  position:relative; overflow:hidden;
  border-bottom:1px solid rgba(255,255,255,.08);
}

/* grain overlay */
.sv-grain {
  position:absolute; inset:-40%; width:180%; height:180%;
  opacity:.035;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:160px;
  animation:sv-grain 8s steps(1) infinite;
  pointer-events:none; z-index:2;
}

/* colour orbs */
.sv-orb {
  position:absolute; border-radius:50%;
  filter:blur(72px); pointer-events:none;
  animation:sv-orb 14s ease-in-out infinite;
}

/* animated rule */
.sv-hero-rule {
  height:1px; background:rgba(255,255,255,.15); margin-bottom:52px;
  transform:scaleX(0); transform-origin:left;
  animation:sv-line .9s .2s var(--ease) forwards;
}

/* ── Service cards ── */
.sv-cards-section { padding:96px 0; }

.sv-card {
  display:grid;
  grid-template-columns:80px 1fr;
  align-items:start; gap:0;
  padding:40px 0;
  border-bottom:1px solid var(--line);
  position:relative; cursor:pointer; overflow:hidden;
  transition:padding-left .4s var(--ease), background .3s;
}
/* left accent bar */
.sv-card::before {
  content:''; position:absolute; left:0; top:0; bottom:0; width:3px;
  background:linear-gradient(to bottom, var(--green-hi), var(--green-deep));
  transform:scaleY(0); transform-origin:bottom;
  border-radius:0 2px 2px 0;
  transition:transform .45s var(--ease);
}
/* shimmer sweep */
.sv-card::after {
  content:''; position:absolute;
  top:0; left:0; width:40%; height:100%;
  background:linear-gradient(90deg,transparent,rgba(5,150,105,.035),transparent);
  transform:translateX(-100%);
  transition:transform 0s;
}
.sv-card:hover { padding-left:18px; background:rgba(5,150,105,.025); }
.sv-card:hover::before { transform:scaleY(1); }
.sv-card:hover::after  { transform:translateX(300%); transition:transform .6s var(--ease); }

/* number */
.sv-num {
  font-family:var(--fh); font-size:48px; font-weight:900;
  line-height:1; letter-spacing:-.05em;
  background:linear-gradient(135deg,var(--green),var(--gold-hi));
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
  background-clip:text;
  transition:transform .4s var(--ease), filter .4s;
  padding-top:6px;
}
.sv-card:hover .sv-num { transform:translateX(6px) scale(1.06); filter:brightness(1.2); }

/* body */
.sv-card-body { padding:4px 32px 4px 0; }

.sv-card-icon {
  width:46px; height:46px; border-radius:13px;
  background:rgba(5,150,105,.07);
  border:1.5px solid rgba(5,150,105,.3);
  display:flex; align-items:center; justify-content:center;
  color:var(--green); margin-bottom:16px;
  transition:background .3s, color .3s, border-color .3s, transform .4s var(--ease), box-shadow .4s;
}
.sv-card:hover .sv-card-icon {
  background:var(--green); color:#fff; border-color:var(--green-hi);
  transform:rotate(-5deg) scale(1.1);
  box-shadow:0 8px 20px rgba(5,150,105,.3);
}

.sv-card-title {
  font-family:var(--fh); font-size:21px; font-weight:700;
  color:var(--ink); letter-spacing:-.022em; margin-bottom:10px;
  transition:color .25s;
}
.sv-card:hover .sv-card-title { color:var(--green-deep); }

.sv-card-desc {
  font-family:var(--fb); font-size:14.5px;
  color:var(--ink-70); line-height:1.78; max-width:500px; margin-bottom:18px;
}

/* feature tags */
.sv-tags { display:flex; flex-wrap:wrap; gap:8px; }
.sv-tag {
  display:inline-flex; align-items:center; gap:5px;
  font-family:var(--fb); font-size:11.5px; font-weight:500;
  color:var(--green-deep);
  background:rgba(5,150,105,.07);
  border:1px solid rgba(5,150,105,.18);
  padding:4px 10px; border-radius:100px;
  transition:background .25s, border-color .25s, color .25s;
}
.sv-card:hover .sv-tag { background:rgba(5,150,105,.12); border-color:rgba(5,150,105,.3); }

/* ── Process strip ── */
.sv-process {
  background:var(--cocoa2);
  border-top:1px solid rgba(255,255,255,.07);
  border-bottom:1px solid rgba(255,255,255,.07);
  padding:80px 0;
}
.sv-process-grid {
  display:grid; grid-template-columns:repeat(4,1fr); gap:0;
}
.sv-step {
  padding:32px 36px; position:relative;
  border-right:1px solid rgba(255,255,255,.07);
  transition:background .3s;
}
.sv-step:last-child { border-right:none; }
.sv-step:hover { background:rgba(255,255,255,.03); }

.sv-step-dot {
  width:40px; height:40px; border-radius:12px;
  background:rgba(5,150,105,.15);
  border:1.5px solid rgba(5,150,105,.35);
  display:flex; align-items:center; justify-content:center;
  font-family:var(--fh); font-size:14px; font-weight:800;
  color:var(--green-hi); margin-bottom:20px;
  transition:background .3s, border-color .3s, transform .3s var(--ease);
}
.sv-step:hover .sv-step-dot {
  background:var(--green); border-color:var(--green-hi);
  color:#fff; transform:scale(1.1);
}
/* connector arrow */
.sv-step:not(:last-child)::after {
  content:'→';
  position:absolute; top:32px; right:-14px; z-index:1;
  font-size:16px; color:rgba(255,255,255,.15);
  line-height:40px;
  transition:color .3s;
}
.sv-step:hover::after { color:var(--green-hi); }

.sv-step-title {
  font-family:var(--fh); font-size:15px; font-weight:700;
  color:#fff; margin-bottom:8px; letter-spacing:-.01em;
}
.sv-step-desc {
  font-family:var(--fb); font-size:13px; font-weight:300;
  color:rgba(255,255,255,.45); line-height:1.7;
}

/* ── Stats bar ── */
.sv-stats {
  background:var(--cocoa3);
  border-bottom:1px solid rgba(255,255,255,.06);
  padding:48px 0;
}
.sv-stats-grid {
  display:flex; justify-content:space-around; align-items:center;
  flex-wrap:wrap; gap:24px;
}
.sv-stat { text-align:center; }
.sv-stat-num {
  font-family:var(--fh); font-size:40px; font-weight:900;
  letter-spacing:-.04em; line-height:1;
  background:linear-gradient(135deg,#fff,var(--gold-hi));
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
  background-clip:text;
}
.sv-stat-label {
  font-family:var(--fb); font-size:12px; font-weight:400;
  color:rgba(255,255,255,.38); margin-top:6px; letter-spacing:.04em;
}

/* ── CTA strip ── */
.sv-cta-strip {
  background:var(--cocoa2);
  border-top:1px solid rgba(255,255,255,.07);
  padding:96px 44px;
  text-align:center;
  position:relative; overflow:hidden;
}
.sv-cta-strip::before {
  content:''; position:absolute;
  top:-100px; left:50%; transform:translateX(-50%);
  width:500px; height:500px; border-radius:50%;
  background:radial-gradient(circle,rgba(217,119,6,.12),transparent 70%);
  pointer-events:none;
}
.sv-cta-strip::after {
  content:''; position:absolute;
  bottom:-80px; right:10%;
  width:320px; height:320px; border-radius:50%;
  background:radial-gradient(circle,rgba(5,150,105,.1),transparent 70%);
  pointer-events:none;
}
.sv-cta-inner { position:relative; z-index:1; max-width:560px; margin:0 auto; }

/* ── Responsive ── */
@media(max-width:900px){
  .sv-process-grid { grid-template-columns:repeat(2,1fr); }
  .sv-step { border-bottom:1px solid rgba(255,255,255,.07); }
  .sv-step:nth-child(2) { border-right:none; }
  .sv-step:nth-child(3) { border-bottom:none; }
  .sv-step:nth-child(2)::after,
  .sv-step:nth-child(4)::after { display:none; }
}
@media(max-width:768px){
  .sv-wrap { padding:0 22px; }
  .sv-hero { padding:120px 22px 70px; }
  .sv-cards-section { padding:64px 0; }
  .sv-card { grid-template-columns:60px 1fr; }
  .sv-num { font-size:36px; }
  .sv-card-body { padding-right:16px; }
  .sv-process { padding:60px 0; }
  .sv-process-grid { grid-template-columns:1fr; }
  .sv-step { border-right:none; border-bottom:1px solid rgba(255,255,255,.07); }
  .sv-step:last-child { border-bottom:none; }
  .sv-step::after { display:none !important; }
  .sv-cta-strip { padding:72px 22px; }
  .sv-stats-grid { gap:36px; }
}
@media(max-width:560px){
  .sv-h1 { font-size:38px; }
  .sv-h2,.sv-h2-dark { font-size:26px; }
  .sv-card { grid-template-columns:52px 1fr; }
}
`;

// Per-service feature tags
const SERVICE_TAGS = {
  "Office & Corporate Cleaning": ["Daily Service", "Flexible Scheduling", "Eco-Friendly", "Trained Staff"],
  "Healthcare Cleaning": ["Infection Control", "Hospital-Grade", "Certified Protocols", "24/7 Available"],
  "Laundry Services": ["Wash & Fold", "Dry Cleaning", "Ironing", "Pickup & Delivery"],
  "Fumigation & Pest Control": ["EPA-Approved", "Family-Safe", "Residential", "Commercial"],
  "Post-Construction Cleaning": ["Debris Removal", "Deep Sanitize", "Final Touch-Up", "Move-In Ready"],
  "Poly-Tank & Deep Cleaning": ["Water Tank Safe", "Full Surface Care", "Health Standards", "Scheduled Service"],
};

const PROCESS_STEPS = [
  { n:"01", title:"Assessment",  desc:"We inspect your space and scope your exact requirements before anything begins." },
  { n:"02", title:"Fixed Quote", desc:"Transparent pricing with no hidden fees. You approve before we start." },
  { n:"03", title:"Execution",   desc:"Our trained team deploys with professional-grade equipment and supplies." },
  { n:"04", title:"Handover",    desc:"Quality check, clean exit, and your satisfaction confirmed before we leave." },
];

const STATS = [
  { n:"10+",   l:"Years Active" },
  { n:"500+", l:"Clients Served" },
  { n:"4",    l:"Core Services" },
  { n:"100%", l:"Satisfaction Rate" },
];

function StyleTag() {
  useEffect(() => {
    if (document.getElementById("sv-css-v3")) return;
    const el = document.createElement("style");
    el.id = "sv-css-v3"; el.textContent = CSS;
    document.head.prepend(el);
    return () => el.remove();
  }, []);
  return null;
}

export default function Services() {
  const go = useDelayedMount(60);
  useScrollReveal(".sv-from-left,.sv-from-right,.sv-from-below", "sv-visible");

  const hi = (delay) => ({
    opacity: go ? 1 : 0,
    animation: go ? `sv-rise .7s ${delay}s var(--ease) forwards` : "none",
  });

  return (
    <PageWrapper>
      <StyleTag />
      <Helmet>
        <title>Our Services | Chapman Prestige Limited</title>
        <meta name="description" content="Laundry, fumigation, car detailing, and deep cleaning services for homes, offices, and institutions in Kumasi." />
        <link rel="canonical" href="https://chapmanprestigelimited.com/services" />
      </Helmet>

      <div className="sv">

        {/* ── HERO ── */}
        <section className="sv-hero">
          <VideoCarousel videos={SERVICE_VIDEOS} duration={8000} transition="slide" showOnMobile={true} />

          {/* orbs */}
          <div className="sv-orb" style={{ width:560, height:560, top:"5%",  left:"58%", background:"radial-gradient(circle,rgba(5,150,105,.2),transparent 70%)", animationDuration:"16s" }} />
          <div className="sv-orb" style={{ width:360, height:360, top:"50%", left:"5%",  background:"radial-gradient(circle,rgba(217,119,6,.16),transparent 70%)", animationDuration:"11s", animationDelay:"5s" }} />
          <div className="sv-grain" />

          {/* full overlay */}
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(18,12,6,.88) 0%, rgba(18,12,6,.55) 45%, rgba(18,12,6,.32) 100%)", zIndex:1, pointerEvents:"none" }} />

          <div className="sv-wrap" style={{ position:"relative", zIndex:2 }}>
            <div className="sv-hero-rule" />

            <p className="sv-eye" style={hi(0)}>
              Our Services · {BUSINESS.shortName}
            </p>

            <h1 className="sv-h1" style={{ marginBottom:28, maxWidth:760, ...hi(0.08) }}>
              Every Space,<br />
              <span style={{ WebkitTextFillColor:"var(--gold-hi)", color:"var(--gold-hi)" }}>Immaculate.</span>
            </h1>

            <p style={{
              fontFamily:"var(--fb)", fontSize:17, fontWeight:500,
              color:"rgba(255,255,255,.75)", lineHeight:1.82, maxWidth:500, marginBottom:48,
              ...hi(0.16),
            }}>
              Professional cleaning and sanitation for homes, hospitals, offices,
              and institutions across Kumasi, delivered with precision.
            </p>

            <div style={{ display:"flex", gap:12, flexWrap:"wrap", ...hi(0.24) }}>
              <Link to="/contact" className="sv-btn-primary">Book a Service <ArrowRight size={15} /></Link>
              <Link to="/about"   className="sv-btn-ghost">Who We Are</Link>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <div className="sv-stats">
          <div className="sv-wrap">
            <div className="sv-stats-grid">
              {STATS.map((s, i) => (
                <div key={s.l} className={`sv-stat sv-from-below`} style={{ transitionDelay:`${i * 0.07}s` }}>
                  <div className="sv-stat-num">{s.n}</div>
                  <div className="sv-stat-label">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SERVICE CARDS ── */}
        <section className="sv-cards-section">
          <div className="sv-wrap">
            <p className="sv-eye sv-from-below" style={{ marginBottom:8 }}>
              What we offer
            </p>
            <h2 className="sv-h2 sv-from-below" style={{ marginBottom:56, transitionDelay:".06s" }}>
              Six Core Services
            </h2>

            {SERVICES_LIST.map((s, i) => {
              const tags = SERVICE_TAGS[s.title] || [];
              return (
                <div
                  key={s.title}
                  className={`sv-card ${i % 2 === 0 ? "sv-from-left" : "sv-from-right"}`}
                  style={{ transitionDelay:`${i * 0.07}s` }}
                >
                  <div className="sv-num">{String(i + 1).padStart(2, "0")}</div>
                  <div className="sv-card-body">
                    <div className="sv-card-icon">{s.icon}</div>
                    <h3 className="sv-card-title">{s.title}</h3>
                    <p className="sv-card-desc">{s.desc}</p>
                    {tags.length > 0 && (
                      <div className="sv-tags">
                        {tags.map(t => (
                          <span key={t} className="sv-tag">
                            <CheckCircle2 size={10} />
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── PROCESS STRIP ── */}
        <section className="sv-process">
          <div className="sv-wrap" style={{ marginBottom:48 }}>
            <p className="sv-eye sv-from-below" style={{ color:"var(--gold)" }}>How It Works</p>
            <h2 className="sv-h2-dark sv-from-below" style={{ transitionDelay:".06s" }}>
              Our 4-Step Process
            </h2>
          </div>
          <div className="sv-wrap">
            <div className="sv-process-grid">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.n} className={`sv-step sv-from-below`} style={{ transitionDelay:`${i * 0.08}s` }}>
                  <div className="sv-step-dot">{step.n}</div>
                  <div className="sv-step-title">{step.title}</div>
                  <div className="sv-step-desc">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="sv-cta-strip sv-from-below">
          <div className="sv-cta-inner">
            <p className="sv-eye" style={{ justifyContent:"center" }}>Ready to Begin</p>
            <h2 className="sv-h2-dark" style={{ marginBottom:16 }}>
              Need a Cleaning Service Today?
            </h2>
            <p style={{
              fontFamily:"var(--fb)", fontSize:16, fontWeight:400,
              color:"rgba(255,255,255,.58)", marginBottom:44, lineHeight:1.78,
            }}>
              Fast delivery across Kumasi. Contact Chapman Prestige Limited for professional, same-day service.
            </p>
            <Link to="/contact" className="sv-btn-primary">
              Contact Us <ArrowRight size={15} />
            </Link>
          </div>
        </section>

      </div>
    </PageWrapper>
  );
}