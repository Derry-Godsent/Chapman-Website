import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { BUSINESS, NAV_LINKS } from "../config/business.jsx";
import QueryFloater from "./QueryFloater";
import LegalModal from "./LegalModal";

/* ════════════════════════════════════════════
   LAYOUT — Chapman Prestige Limited
   Syne display · Instrument Sans body
   Warm cream light / cocoa dark split
   Emerald primary · Golden amber accent
════════════════════════════════════════════ */

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

  --fh: 'Outfit', system-ui, sans-serif;
  --fb: 'DM Sans', system-ui, sans-serif;
  --ease: cubic-bezier(.16,1,.3,1);
  --ease2: cubic-bezier(.4,0,.2,1);
}

*, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

body {
  background:var(--cream); color:var(--ink-70);
  font-family:var(--fb); min-height:100vh;
  overflow-x:hidden; -webkit-font-smoothing:antialiased;
}
a { text-decoration:none; }

/* scrollbar */
::-webkit-scrollbar { width:5px; }
::-webkit-scrollbar-track { background:var(--cream); }
::-webkit-scrollbar-thumb { background:var(--green); border-radius:6px; }

/* ══ HEADER ══ */
.lyt-header {
  position:fixed; top:0; left:0; right:0; z-index:100;
  height:72px; display:flex; align-items:center;
  padding:0 44px;
  transition:background .4s var(--ease), border-color .4s, backdrop-filter .4s;
  border-bottom:1px solid transparent;
}
.lyt-header.scrolled {
  background:rgba(24,18,12,.94);
  border-color:rgba(255,255,255,.08);
  backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
}

/* Brand */
.lyt-brand { display:flex; align-items:center; gap:11px; }
.lyt-logo {
  width:40px; height:40px; border-radius:10px;
  background:#fff; display:flex; align-items:center; justify-content:center;
  box-shadow:0 2px 10px rgba(0,0,0,.1); overflow:hidden; flex-shrink:0;
}
.lyt-logo img { width:100%; height:100%; object-fit:contain; }
.lyt-brand-name {
  font-family:var(--fh); font-size:16px; font-weight:800;
  color:var(--ink); letter-spacing:-.02em; line-height:1.1;
  transition:color .3s;
}
.lyt-header.scrolled .lyt-brand-name { color:#F5F0E8; }
.lyt-brand-sub {
  font-family:var(--fb); font-size:9.5px; font-weight:600;
  color:var(--green); letter-spacing:.12em; text-transform:uppercase; margin-top:2px;
  transition:color .3s;
}
.lyt-header.scrolled .lyt-brand-sub { color:var(--gold-hi); }

/* Desktop Nav */
.lyt-nav { display:flex; gap:2px; margin:0 auto; }
.lyt-nav-link {
  position:relative;
  font-family:var(--fb); font-size:14px; font-weight:500;
  color:var(--ink-70);
  padding:8px 15px; border-radius:9px;
  transition:color .22s, background .22s;
}
.lyt-header.scrolled .lyt-nav-link { color:rgba(245,240,232,.65); }
.lyt-nav-link:hover {
  color:var(--green); background:rgba(5,150,105,.07);
}
.lyt-header.scrolled .lyt-nav-link:hover {
  color:var(--gold-hi); background:rgba(255,255,255,.07);
}
.lyt-nav-link.active { color:var(--green); font-weight:600; }
.lyt-header.scrolled .lyt-nav-link.active { color:var(--gold-hi); }
/* animated underline dot */
.lyt-nav-link::after {
  content:''; position:absolute;
  bottom:5px; left:50%; transform:translateX(-50%);
  width:4px; height:4px; border-radius:50%;
  background:var(--green);
  opacity:0; transform:translateX(-50%) scale(0);
  transition:opacity .25s, transform .25s var(--ease);
}
.lyt-nav-link.active::after { opacity:1; transform:translateX(-50%) scale(1); }
.lyt-header.scrolled .lyt-nav-link::after { background:var(--gold-hi); }

/* CTA */
.lyt-cta {
  font-family:var(--fh); font-size:13px; font-weight:700;
  color:#fff; background:linear-gradient(135deg,var(--green),var(--green-hi));
  padding:10px 20px; border-radius:100px; letter-spacing:.01em;
  box-shadow:0 4px 14px rgba(5,150,105,.28);
  transition:transform .25s var(--ease),box-shadow .25s,filter .25s;
}
.lyt-cta:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(5,150,105,.38); filter:brightness(1.05); }
.lyt-cta:active { transform:scale(.97); transition-duration:.1s; }

/* Hamburger */
.lyt-burger {
  display:none; flex-direction:column; gap:5px;
  background:none; border:none; cursor:pointer;
  padding:9px; border-radius:9px; transition:background .2s;
  margin-left:auto; flex-shrink:0;
}
.lyt-burger span {
  display:block; width:21px; height:2px;
  border-radius:2px; background:var(--ink);
  transition:transform .35s var(--ease),opacity .25s,background .3s;
}
.lyt-header.scrolled .lyt-burger span { background:#F5F0E8; }
.lyt-burger:hover { background:var(--line); }
.lyt-burger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
.lyt-burger.open span:nth-child(2) { opacity:0; transform:scaleX(0); }
.lyt-burger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }

/* Mobile drawer — top-right card panel */
.lyt-drawer {
  position:fixed; top:80px; right:22px; z-index:99;
  width:260px;
  background:rgba(24,18,12,.97); backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px);
  border:1.5px solid rgba(255,255,255,.1);
  border-radius:18px;
  box-shadow:0 20px 48px rgba(0,0,0,.5), 0 0 0 1px rgba(5,150,105,.15);
  opacity:0; transform:translateY(-10px) scale(.96);
  pointer-events:none; visibility:hidden;
  transition:opacity .32s var(--ease), transform .32s var(--ease), visibility 0s .32s;
}
.lyt-drawer.open {
  opacity:1; transform:translateY(0) scale(1);
  pointer-events:auto; visibility:visible;
  transition:opacity .32s var(--ease), transform .32s var(--ease), visibility 0s 0s;
}
.lyt-drawer-inner { padding:20px 20px 24px; }
.lyt-drawer-link {
  display:block;
  font-family:var(--fh); font-size:15px; font-weight:600;
  color:rgba(245,240,232,.62); padding:11px 12px;
  border-radius:10px;
  transition:color .2s, background .2s, padding-left .25s var(--ease);
}
.lyt-drawer-link:hover, .lyt-drawer-link.active {
  color:var(--gold-hi); background:rgba(255,255,255,.06); padding-left:16px;
}
.lyt-drawer-book {
  display:block; text-align:center; margin-top:12px;
  padding:12px; border-radius:12px;
  background:linear-gradient(135deg,var(--green),var(--green-hi));
  color:#fff; font-family:var(--fh); font-size:14px; font-weight:700;
  box-shadow:0 4px 14px rgba(5,150,105,.3);
  transition:filter .2s,transform .2s;
}
.lyt-drawer-book:hover { filter:brightness(1.06); transform:translateY(-2px); }

/* Main */
.lyt-main { min-height:100vh; }

/* ══ WhatsApp FAB ══ */
@keyframes lyt-pulse {
  0%   { box-shadow:0 0 0 0 rgba(37,211,102,.45); }
  70%  { box-shadow:0 0 0 14px rgba(37,211,102,0); }
  100% { box-shadow:0 0 0 0 rgba(37,211,102,0); }
}
.lyt-fab {
  position:fixed; bottom:28px; right:28px; z-index:200;
  display:flex; align-items:center; gap:8px;
  background:linear-gradient(135deg,#25D366,#128C7E);
  color:#fff; font-family:var(--fh); font-size:13px; font-weight:700;
  padding:12px 20px; border-radius:100px;
  box-shadow:0 8px 28px rgba(37,211,102,.38);
  animation:lyt-pulse 2.6s ease-out infinite;
  transition:transform .32s var(--ease),box-shadow .32s,filter .25s;
}
.lyt-fab:hover { transform:translateY(-4px) scale(1.04); box-shadow:0 18px 40px rgba(37,211,102,.48); animation:none; filter:brightness(1.05); }
.lyt-fab:active { transform:scale(.96); }
.lyt-fab-icon { width:18px; height:18px; flex-shrink:0; }

/* ══ FOOTER ══ */
.lyt-footer {
  background:var(--cocoa); border-top:1px solid rgba(255,255,255,.07);
  padding:80px 48px 40px;
}
.lyt-footer-inner { max-width:1160px; margin:0 auto; }

.lyt-footer-top {
  display:grid;
  grid-template-columns:1.4fr 1fr 1fr 1fr;
  gap:56px; padding-bottom:56px;
  border-bottom:1px solid rgba(255,255,255,.08);
}

/* Brand col */
.lyt-footer-logo-row { display:flex; align-items:center; gap:11px; margin-bottom:14px; }
.lyt-footer-logo {
  width:38px; height:38px; border-radius:9px;
  background:#fff; overflow:hidden; flex-shrink:0;
  box-shadow:0 2px 8px rgba(0,0,0,.14);
}
.lyt-footer-logo img { width:100%; height:100%; object-fit:contain; }
.lyt-footer-brand-name { font-family:var(--fh); font-size:15px; font-weight:800; color:#F5F0E8; letter-spacing:-.01em; }
.lyt-footer-brand-sub  { font-family:var(--fb); font-size:10px; font-weight:600; color:var(--gold-hi); letter-spacing:.1em; text-transform:uppercase; margin-top:2px; }
.lyt-footer-about {
  font-family:var(--fb); font-size:13px;
  color:rgba(245,240,232,.42); line-height:1.75; max-width:260px;
}

/* Column */
.lyt-footer-col-head {
  font-family:var(--fb); font-size:10px; font-weight:600;
  letter-spacing:.18em; text-transform:uppercase;
  color:var(--gold); margin-bottom:18px;
}
.lyt-footer-links { display:flex; flex-direction:column; gap:10px; }
.lyt-footer-lnk {
  font-family:var(--fb); font-size:13.5px;
  color:rgba(245,240,232,.5);
  transition:color .2s, transform .2s var(--ease);
  display:inline-block; cursor:pointer;
}
.lyt-footer-lnk:hover { color:var(--green-hi); transform:translateX(4px); }

/* Contact col */
.lyt-footer-contact-group { margin-bottom:16px; }
.lyt-footer-contact-label {
  font-family:var(--fb); font-size:9.5px; font-weight:600;
  letter-spacing:.14em; text-transform:uppercase;
  color:var(--gold-hi); margin-bottom:6px;
}
.lyt-footer-contact-val {
  display:block; font-family:var(--fb); font-size:13px;
  color:rgba(245,240,232,.5); transition:color .2s;
  line-height:1.8;
}
.lyt-footer-contact-val:hover { color:var(--green-hi); }
a.lyt-footer-contact-val { cursor:pointer; }

/* Bottom bar */
.lyt-footer-bottom {
  display:flex; justify-content:space-between; align-items:center;
  padding-top:28px; flex-wrap:wrap; gap:14px;
  font-family:var(--fb); font-size:12px;
  color:rgba(245,240,232,.25);
}
.lyt-footer-btm-link {
  color:rgba(245,240,232,.25); cursor:pointer; transition:color .2s;
}
.lyt-footer-btm-link:hover { color:var(--gold-hi); }

/* ── Query floater ── */
.query-fab {
  position:fixed; bottom:28px; left:28px; z-index:200;
  width:50px; height:50px; border-radius:50%;
  background:var(--cocoa2); border:2px solid var(--green);
  color:var(--green); display:flex; align-items:center; justify-content:center;
  cursor:pointer; box-shadow:0 8px 28px rgba(5,150,105,.28);
  transition:transform .32s var(--ease),background .28s,border-color .28s,color .28s;
}
.query-fab:hover { transform:translateY(-4px) scale(1.06); background:var(--green); border-color:var(--green-hi); color:#fff; }
.query-fab:active { transform:scale(.94); }

.query-panel {
  position:fixed; bottom:92px; left:28px; z-index:199;
  width:340px; max-width:calc(100vw - 40px);
  background:rgba(24,18,12,.97);
  backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px);
  border:1.5px solid var(--green); border-radius:22px;
  padding:28px 24px;
  opacity:0; transform:translateY(14px) scale(.95);
  pointer-events:none; visibility:hidden;
  transition:opacity .34s var(--ease),transform .34s var(--ease),visibility 0s .34s;
  box-shadow:0 28px 60px rgba(5,150,105,.28);
}
.query-panel.query-panel-open {
  opacity:1; transform:translateY(0) scale(1);
  pointer-events:auto; visibility:visible;
  transition:opacity .34s var(--ease),transform .34s var(--ease),visibility 0s 0s;
}
.query-panel-close {
  position:absolute; top:16px; right:16px;
  width:28px; height:28px; border-radius:50%;
  background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.1);
  color:rgba(245,240,232,.5); display:flex; align-items:center; justify-content:center;
  cursor:pointer; transition:color .2s,background .2s;
}
.query-panel-close:hover { color:var(--gold-hi); background:rgba(255,255,255,.13); }
.query-panel-title { font-family:var(--fh); font-size:18px; font-weight:800; color:#F5F0E8; margin:0 0 8px; letter-spacing:-.02em; }
.query-panel-desc  { font-family:var(--fb); font-size:13px; color:rgba(245,240,232,.45); line-height:1.65; margin:0 0 20px; }
.query-input-wrap  { display:flex; gap:8px; margin-bottom:16px; }
.query-input {
  flex:1; padding:11px 13px;
  background:rgba(255,255,255,.07); border:1.5px solid rgba(255,255,255,.1);
  border-radius:11px; color:#F5F0E8;
  font-family:var(--fb); font-size:13px; resize:none; outline:none;
  transition:border-color .28s,box-shadow .28s;
}
.query-input:focus { border-color:var(--green); box-shadow:0 0 0 3px rgba(5,150,105,.18); }
.query-send-btn {
  display:flex; align-items:center; gap:6px;
  padding:0 15px;
  background:linear-gradient(135deg,var(--green),var(--green-hi));
  color:#fff; font-family:var(--fh); font-size:13px; font-weight:700;
  border:none; border-radius:11px; cursor:pointer;
  box-shadow:0 4px 12px rgba(5,150,105,.3);
  transition:transform .2s,box-shadow .2s,filter .2s;
}
.query-send-btn:hover { transform:translateY(-2px); box-shadow:0 6px 18px rgba(5,150,105,.4); filter:brightness(1.05); }
.query-send-btn:active { transform:scale(.95); }
.query-send-btn:disabled { opacity:.4; cursor:not-allowed; transform:none; }
.query-divider { height:1px; background:rgba(255,255,255,.08); margin:0 0 14px; }
.query-quick-title {
  font-family:var(--fb); font-size:10px; font-weight:600;
  letter-spacing:.14em; text-transform:uppercase;
  color:var(--gold); margin:0 0 10px;
}
.query-quick-links { display:flex; gap:8px; flex-wrap:wrap; }
.query-quick-link {
  display:flex; align-items:center; gap:7px;
  padding:9px 13px; border-radius:10px;
  font-family:var(--fh); font-size:13px; font-weight:600;
  transition:background .2s,transform .2s,box-shadow .2s;
}
.query-quick-link:hover { transform:translateY(-2px); }
.query-wa    { background:rgba(37,211,102,.16); color:#25d366; border:1px solid rgba(37,211,102,.28); }
.query-wa:hover { background:rgba(37,211,102,.26); box-shadow:0 4px 14px rgba(37,211,102,.28); }
.query-email,.query-call { background:rgba(255,255,255,.07); color:#F5F0E8; border:1px solid rgba(255,255,255,.1); }
.query-email:hover,.query-call:hover { background:rgba(255,255,255,.14); box-shadow:0 4px 12px rgba(255,255,255,.08); }

/* ─ RESPONSIVE ─ */
@media(max-width:960px){
  .lyt-nav, .lyt-cta { display:none; }
  .lyt-burger { display:flex; }
  .lyt-footer-top { grid-template-columns:1fr 1fr; gap:40px; }
}
@media(max-width:600px){
  .lyt-header { padding:0 22px; }
  .lyt-drawer { top:76px; right:22px; }
  .lyt-footer { padding:60px 22px 32px; }
  .lyt-footer-top {
    grid-template-columns:1fr 1fr;
    gap:32px 24px;
    text-align:center;
  }
  /* Brand column spans full width and centres */
  .lyt-footer-top > div:first-child {
    grid-column:1 / -1;
    display:flex; flex-direction:column; align-items:center;
  }
  .lyt-footer-logo-row { justify-content:center; }
  .lyt-footer-about { max-width:100%; text-align:center; }
  .lyt-footer-links { align-items:center; }
  .lyt-footer-contact-group { display:flex; flex-direction:column; align-items:center; }
  .lyt-footer-bottom { flex-direction:column; align-items:center; text-align:center; gap:10px; }
  .lyt-fab { padding:11px 16px; }
  .query-fab { width:46px; height:46px; bottom:24px; left:24px; }
  .query-panel { bottom:82px; left:24px; width:calc(100vw - 48px); }
}
`;

function WaIcon() {
  return (
    <svg className="lyt-fab-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.533 5.854L.057 23.486a.5.5 0 0 0 .612.612l5.748-1.498A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.508-5.23-1.396l-.375-.22-3.882 1.011 1.034-3.771-.243-.387A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  );
}

export default function Layout({ children }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [legalOpen, setLegalOpen] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  useEffect(() => {
    const fn = () => { if (window.innerWidth > 960) setOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => {
    if (!open) return;
    const fn = (e) => {
      if (!document.querySelector(".lyt-header")?.contains(e.target) &&
          !document.querySelector(".lyt-drawer")?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [open]);

  const isActive = (to) => to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <>
      <style>{CSS}</style>

      {/* HEADER */}
      <header className={`lyt-header${scrolled ? " scrolled" : ""}`}>
        <Link to="/" className="lyt-brand">
          <div className="lyt-logo">
            <img src="/logo.png" alt="Chapman Prestige Limited" />
          </div>
          <div>
            <div className="lyt-brand-name">{BUSINESS.shortName}</div>
            <div className="lyt-brand-sub">{BUSINESS.tagline}</div>
          </div>
        </Link>

        <nav className="lyt-nav">
          {NAV_LINKS.map(l => (
            <Link key={l.to} to={l.to}
              className={`lyt-nav-link${isActive(l.to) ? " active" : ""}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <Link to="/contact" className="lyt-cta">Book Service</Link>

        <button className={`lyt-burger${open ? " open" : ""}`}
          onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </header>

      {/* MOBILE DRAWER */}
      <div className={`lyt-drawer${open ? " open" : ""}`}>
        <div className="lyt-drawer-inner">
          {NAV_LINKS.map(l => (
            <Link key={l.to} to={l.to}
              className={`lyt-drawer-link${isActive(l.to) ? " active" : ""}`}
              onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link to="/contact" className="lyt-drawer-book" onClick={() => setOpen(false)}>
            Book Service
          </Link>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <main className="lyt-main" style={{ paddingTop: 72 }}>
        {children}
      </main>

      {/* WHATSAPP FAB */}
      <a href={BUSINESS.whatsappUrl} target="_blank" rel="noreferrer" className="lyt-fab">
        <WaIcon />
        <span>WhatsApp</span>
      </a>

      <QueryFloater />

      {/* FOOTER */}
      <footer className="lyt-footer">
        <div className="lyt-footer-inner">
          <div className="lyt-footer-top">

            {/* Brand */}
            <div>
              <div className="lyt-footer-logo-row">
                <div className="lyt-footer-logo">
                  <img src="/logo.png" alt="Chapman Prestige Limited" />
                </div>
                <div>
                  <div className="lyt-footer-brand-name">{BUSINESS.shortName}</div>
                  <div className="lyt-footer-brand-sub">{BUSINESS.tagline}</div>
                </div>
              </div>
              <p className="lyt-footer-about">
                Professional cleaning, laundry, and sanitation services across Kumasi
                and the Ashanti Region. Trusted by hospitals, banks, and 500+ clients since 2016.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <div className="lyt-footer-col-head">Quick Links</div>
              <div className="lyt-footer-links">
                {NAV_LINKS.slice(0, 5).map(l => (
                  <Link key={l.to} to={l.to} className="lyt-footer-lnk">{l.label}</Link>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div>
              <div className="lyt-footer-col-head">Legal</div>
              <div className="lyt-footer-links">
                <span className="lyt-footer-lnk" onClick={() => setLegalOpen("privacy")}>Privacy Policy</span>
                <span className="lyt-footer-lnk" onClick={() => setLegalOpen("terms")}>Terms of Service</span>
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="lyt-footer-col-head">Contact</div>

              <div className="lyt-footer-contact-group">
                <div className="lyt-footer-contact-label">Phone</div>
                <a href="tel:+233232276648" className="lyt-footer-contact-val">0232 276 648</a>
                <a href="tel:+233534134809" className="lyt-footer-contact-val">0534 134 809</a>
              </div>

              <div className="lyt-footer-contact-group">
                <div className="lyt-footer-contact-label">Email</div>
                {BUSINESS.emails?.map(e => (
                  <a key={e} href={`mailto:${e}`} className="lyt-footer-contact-val">{e}</a>
                ))}
              </div>

              <div className="lyt-footer-contact-group">
                <div className="lyt-footer-contact-label">Location</div>
                <span className="lyt-footer-contact-val">{BUSINESS.location}</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="lyt-footer-bottom">
            <span>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</span>
            <div style={{ display:"flex", gap:24 }}>
              <span className="lyt-footer-btm-link" onClick={() => setLegalOpen("privacy")}>Privacy</span>
              <span className="lyt-footer-btm-link" onClick={() => setLegalOpen("terms")}>Terms</span>
            </div>
          </div>
        </div>
      </footer>

      {legalOpen && <LegalModal type={legalOpen} onClose={() => setLegalOpen(null)} />}
    </>
  );
}