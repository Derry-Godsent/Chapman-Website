import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Clock, CheckCircle, ChevronDown } from "lucide-react";
import { useScrollReveal, useDelayedMount } from "../utils/hooks";
import { BUSINESS } from "../config/business.jsx";
import { Helmet } from "react-helmet-async";
import React from "react";

/* ═══════════════════════════════════════════════════════════
   CONTACT — Chapman Prestige Limited
   Base: deep cocoa  ·  Cards: deep amber/gold
   Outfit display  ·  DM Sans body
   All text colours matched to their surface
═══════════════════════════════════════════════════════════ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

:root {
  /* ── Page surfaces (cocoa family) ── */
  --pg:       #18120C;   /* page background          */
  --pg2:      #201810;   /* slightly lifted surface  */
  --pg3:      #2A1E14;   /* border / divider level   */

  /* ── Card surfaces (amber/gold family) ── */
  --card:     #2C1F08;   /* deep amber card base     */
  --card2:    #3A2A0D;   /* card hover / raised      */
  --card-bdr: #5C3D10;   /* card border              */

  /* ── Accent colours ── */
  --gold:     #D97706;
  --gold-hi:  #F59E0B;
  --gold-lo:  #92400E;
  --gold-txt: #FDE68A;   /* text ON dark amber card  */
  --gold-sub: rgba(253,230,138,.55);  /* subdued text on card */

  --green:      #059669;
  --green-hi:   #10B981;
  --green-deep: #047857;

  /* ── Text on cocoa page ── */
  --on-pg:     #F5ECD8;          /* primary text        */
  --on-pg-70:  rgba(245,236,216,.68);
  --on-pg-45:  rgba(245,236,216,.45);
  --on-pg-25:  rgba(245,236,216,.24);
  --on-pg-10:  rgba(245,236,216,.10);
  --on-pg-06:  rgba(245,236,216,.06);

  /* ── Text on amber card ── */
  --on-card:     #FEF3C7;        /* primary — light gold */
  --on-card-70:  rgba(254,243,199,.70);
  --on-card-45:  rgba(254,243,199,.45);
  --on-card-20:  rgba(254,243,199,.20);
  --on-card-10:  rgba(254,243,199,.10);

  --fh: 'Outfit', system-ui, sans-serif;
  --fb: 'DM Sans', system-ui, sans-serif;
  --ease:  cubic-bezier(.16,1,.3,1);
  --ease2: cubic-bezier(.4,0,.2,1);
}

/* ── Reset / base ── */
.ct2 *, .ct2 *::before, .ct2 *::after { box-sizing:border-box; margin:0; padding:0; }
.ct2 {
  background: var(--pg);
  color: var(--on-pg-70);
  font-family: var(--fb);
  min-height:100vh;
  overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
}
.ct2 a { text-decoration:none; }

/* ── Grain ── */
.ct2-grain {
  position:fixed; inset:0; z-index:0; pointer-events:none; opacity:.03;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:200px;
}

/* ── Animations ── */
@keyframes ct2-up    { from{opacity:0;transform:translateY(44px)} to{opacity:1;transform:translateY(0)} }
@keyframes ct2-orb   { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-40px) scale(1.06)} 66%{transform:translate(-20px,20px) scale(.96)} }
@keyframes ct2-pulse { 0%{box-shadow:0 0 0 0 rgba(5,150,105,.55)} 70%{box-shadow:0 0 0 10px rgba(5,150,105,0)} 100%{box-shadow:0 0 0 0 rgba(5,150,105,0)} }
@keyframes ct2-shimmer { from{transform:translateX(-100%)} to{transform:translateX(100%)} }
@keyframes ct2-dot   { 0%,100%{opacity:1} 50%{opacity:.2} }

/* ── Scroll reveal ── */
.ct2-reveal { opacity:0; transform:translateY(38px); transition:opacity .72s var(--ease), transform .72s var(--ease); }
.ct2-visible { opacity:1 !important; transform:none !important; }

/* ── Wrapper ── */
.ct2-wrap { max-width:1120px; margin:0 auto; padding:0 48px; position:relative; z-index:1; }

/* ── Eye label — on page (cocoa) ── */
.ct2-eye {
  display:inline-flex; align-items:center; gap:9px;
  font-family:var(--fb); font-size:10.5px; font-weight:600;
  letter-spacing:.24em; text-transform:uppercase;
  color: var(--on-pg-45);
  margin-bottom:18px;
}
.ct2-eye::before {
  content:''; display:block; width:22px; height:1.5px;
  background:linear-gradient(90deg, var(--gold), var(--gold-hi));
}
/* eye label variant for amber card */
.ct2-eye-card {
  display:inline-flex; align-items:center; gap:9px;
  font-family:var(--fb); font-size:10.5px; font-weight:600;
  letter-spacing:.24em; text-transform:uppercase;
  color: var(--on-card-45);
  margin-bottom:18px;
}
.ct2-eye-card::before {
  content:''; display:block; width:22px; height:1.5px;
  background:linear-gradient(90deg, var(--gold), var(--gold-hi));
}

/* ══ HERO (cocoa base, orbs) ══ */
.ct2-hero {
  min-height:62vh; display:flex; align-items:flex-end;
  padding:160px 48px 88px; position:relative; overflow:hidden;
  border-bottom:1px solid var(--on-pg-10);
}
.ct2-orb { position:absolute; border-radius:50%; pointer-events:none; animation:ct2-orb 18s ease-in-out infinite; }
.ct2-orb1 { width:680px;height:680px; right:-160px;top:-220px; background:radial-gradient(circle,rgba(217,119,6,.12) 0%,transparent 65%); animation-delay:0s; }
.ct2-orb2 { width:480px;height:480px; left:-80px;bottom:-100px; background:radial-gradient(circle,rgba(5,150,105,.09) 0%,transparent 65%); animation-delay:-6s; }
.ct2-orb3 { width:340px;height:340px; right:28%;top:8%; background:radial-gradient(circle,rgba(245,158,11,.06) 0%,transparent 65%); animation-delay:-12s; }

/* hero headline — on cocoa */
.ct2-hero-hl {
  font-family:var(--fh); font-size:clamp(52px,8vw,98px);
  font-weight:900; line-height:.93; letter-spacing:-.045em;
  color: var(--on-pg);
  margin-bottom:28px;
}
.ct2-hero-hl span {
  background:linear-gradient(135deg, var(--gold) 0%, var(--gold-hi) 55%, #FDE68A 100%);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
}
.ct2-hero-sub {
  font-family:var(--fb); font-size:17px; font-weight:300;
  color: var(--on-pg-45); line-height:1.8; max-width:460px;
}

/* ══ TRUST STRIP (pg2 surface, text on cocoa) ══ */
.ct2-trust { background:var(--pg2); border-bottom:1px solid var(--on-pg-10); }
.ct2-trust-inner { display:grid; grid-template-columns:repeat(3,1fr); }
.ct2-trust-item {
  display:flex; align-items:center; gap:16px;
  padding:32px 40px; border-right:1px solid var(--on-pg-10);
  transition:background .25s;
}
.ct2-trust-item:hover { background:var(--pg3); }
.ct2-trust-item:first-child { padding-left:0; }
.ct2-trust-item:last-child  { border-right:none; }
.ct2-trust-icon {
  width:46px;height:46px;border-radius:13px;flex-shrink:0;
  background:rgba(5,150,105,.12); border:1px solid rgba(5,150,105,.22);
  display:flex; align-items:center; justify-content:center; color:var(--green-hi);
}
/* text ON cocoa surface */
.ct2-trust-num { font-family:var(--fh); font-size:26px; font-weight:800; color:var(--on-pg); letter-spacing:-.025em; line-height:1; }
.ct2-trust-lbl { font-family:var(--fb); font-size:12px; color:var(--on-pg-45); margin-top:4px; line-height:1.4; }

/* ══ GRID ══ */
.ct2-section { padding:72px 0 120px; }
.ct2-grid { display:grid; grid-template-columns:1fr 400px; gap:24px; align-items:start; }

/* ══ FORM PANEL (amber card) ══ */
.ct2-panel {
  background: var(--card);
  border:1.5px solid var(--card-bdr);
  border-radius:28px; padding:56px 52px;
  box-shadow:0 8px 48px rgba(0,0,0,.35), 0 0 0 1px rgba(217,119,6,.08);
}
/* heading ON amber card */
.ct2-panel-head {
  font-family:var(--fh); font-size:clamp(26px,3vw,34px);
  font-weight:800; letter-spacing:-.03em;
  color: var(--on-card);
  margin-bottom:36px;
}

/* progress dots */
.ct2-progress { display:flex; gap:6px; margin-bottom:36px; }
.ct2-progress-dot { height:4px; border-radius:4px; flex:1; background:var(--on-card-10); transition:background .4s var(--ease); }
.ct2-progress-dot.filled { background:linear-gradient(90deg, var(--gold), var(--gold-hi)); }

/* ── Floating label ── */
.ct2-field-inner { position:relative; }
/* label ON amber card */
.ct2-label {
  position:absolute; left:18px; top:50%; transform:translateY(-50%);
  font-family:var(--fb); font-size:14.5px; font-weight:400;
  color: var(--on-card-45);
  pointer-events:none; transition:all .26s var(--ease); z-index:2;
}
.ct2-field-inner.has-value .ct2-label,
.ct2-field-inner.focused   .ct2-label {
  top:13px; transform:translateY(0);
  font-size:10px; font-weight:700; letter-spacing:.13em; text-transform:uppercase;
  color: var(--gold-hi);
}
.ct2-field-inner.is-textarea .ct2-label { top:18px; transform:none; }
.ct2-field-inner.is-textarea.has-value .ct2-label,
.ct2-field-inner.is-textarea.focused   .ct2-label {
  top:10px; transform:none;
  font-size:10px; font-weight:700; letter-spacing:.13em; text-transform:uppercase;
  color: var(--gold-hi);
}

/* input ON amber card */
.ct2-input {
  width:100%; padding:28px 18px 12px;
  background: rgba(0,0,0,.22);
  border:1.5px solid var(--on-card-20);
  border-radius:14px;
  color: var(--on-card);
  font-family:var(--fb); font-size:15px; font-weight:400;
  outline:none; appearance:none;
  transition:border-color .3s, box-shadow .3s, background .3s;
  resize:none; min-height:64px; display:block;
}
.ct2-input::placeholder { color:transparent; }
.ct2-input:focus {
  border-color: var(--gold);
  background: rgba(0,0,0,.30);
  box-shadow:0 0 0 4px rgba(217,119,6,.18);
}
.ct2-input.ct2-has-error { border-color:rgba(239,68,68,.55); box-shadow:0 0 0 4px rgba(239,68,68,.10); }
.ct2-input option { background:var(--card2); color:var(--on-card); }

/* select sizing */
.ct2-select-wrap { position:relative; }
.ct2-select-wrap select.ct2-input { padding-right:44px; cursor:pointer; height:64px; line-height:1; }
.ct2-chevron {
  position:absolute; right:16px; top:50%; transform:translateY(-50%);
  color:var(--on-card-45); pointer-events:none; z-index:3;
  transition:transform .3s var(--ease), color .3s;
}
.ct2-select-wrap:focus-within .ct2-chevron { transform:translateY(-50%) rotate(180deg); color:var(--gold-hi); }

/* error text — visible on amber */
.ct2-error-msg {
  display:flex; align-items:center; gap:6px;
  color:rgba(252,165,165,.9); font-size:12px;
  font-family:var(--fb); margin-top:7px; padding-left:4px;
}

/* submit button */
.ct2-submit {
  width:100%; position:relative; overflow:hidden; padding:18px 28px;
  background:linear-gradient(135deg, var(--green-deep), var(--green), var(--green-hi));
  color:#fff; font-family:var(--fh); font-size:15px; font-weight:800;
  border:none; border-radius:14px; cursor:pointer; letter-spacing:-.01em;
  box-shadow:0 8px 28px rgba(5,150,105,.32);
  transition:transform .35s var(--ease), box-shadow .35s, opacity .2s;
}
.ct2-submit::after {
  content:''; position:absolute; inset:0;
  background:linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent);
  transform:translateX(-100%); transition:transform .6s var(--ease);
}
.ct2-submit:hover { transform:translateY(-3px); box-shadow:0 14px 40px rgba(5,150,105,.42); }
.ct2-submit:hover::after { transform:translateX(100%); }
.ct2-submit:active { transform:scale(.96); transition-duration:.1s; }
.ct2-submit:disabled { opacity:.5; cursor:not-allowed; transform:none; box-shadow:none; }

/* disclaimer text on amber card */
.ct2-disclaimer { font-family:var(--fb); font-size:12px; color:var(--on-card-45); text-align:center; line-height:1.6; }

/* success state on amber card */
.ct2-success {
  display:flex; align-items:flex-start; gap:16px;
  background:rgba(5,150,105,.15); border:1px solid rgba(16,185,129,.3);
  border-radius:16px; padding:24px 28px;
  animation:ct2-up .45s var(--ease) forwards;
}
.ct2-success-icon {
  width:40px;height:40px;border-radius:50%;flex-shrink:0;
  background:rgba(16,185,129,.2); border:1.5px solid rgba(16,185,129,.35);
  display:flex;align-items:center;justify-content:center;color:var(--green-hi);
}
.ct2-success-title { font-family:var(--fh); font-size:16px; font-weight:700; color:var(--green-hi); margin-bottom:5px; }
.ct2-success-body  { font-family:var(--fb); font-size:14px; color:var(--on-card-70); line-height:1.65; }

/* ══ SIDEBAR CARDS (amber) ══ */
.ct2-sidebar { display:flex; flex-direction:column; gap:16px; }

.ct2-info-card {
  background: var(--card);
  border:1.5px solid var(--card-bdr);
  border-radius:26px; padding:36px 36px;
  box-shadow:0 8px 40px rgba(0,0,0,.3);
}
.ct2-info-row {
  display:flex; align-items:flex-start; gap:16px;
  padding:20px 0; border-bottom:1px solid var(--on-card-10);
  transition:transform .28s var(--ease);
}
.ct2-info-row:last-child  { border-bottom:none; padding-bottom:0; }
.ct2-info-row:first-child { padding-top:0; }
.ct2-info-row:hover { transform:translateX(5px); }
.ct2-info-row:hover .ct2-info-icon { background:rgba(5,150,105,.18); border-color:rgba(5,150,105,.35); color:var(--green-hi); }

.ct2-info-icon {
  width:42px;height:42px;border-radius:12px;flex-shrink:0;
  background:rgba(217,119,6,.18); border:1px solid rgba(217,119,6,.3);
  display:flex;align-items:center;justify-content:center; color:var(--gold-hi);
  transition:background .28s, border-color .28s, color .28s;
}
/* label ON amber card */
.ct2-info-lbl {
  font-family:var(--fb); font-size:10px; font-weight:600;
  letter-spacing:.14em; text-transform:uppercase;
  color: var(--on-card-45);
  margin-bottom:5px;
}
/* value ON amber card */
.ct2-info-val {
  display:block; font-family:var(--fh); font-size:14.5px; font-weight:600;
  color: var(--on-card);
  letter-spacing:-.01em; line-height:1.65; transition:color .22s;
}
a.ct2-info-val:hover { color:var(--gold-hi); }

/* WhatsApp card (cocoa — dark contrast against amber neighbours) */
.ct2-wa-card {
  background: var(--pg2);
  border:1.5px solid var(--on-pg-10);
  border-radius:26px; padding:32px 36px;
  position:relative; overflow:hidden;
  box-shadow:0 8px 40px rgba(0,0,0,.28);
}
.ct2-wa-card::before {
  content:''; position:absolute; inset:0; pointer-events:none;
  background:radial-gradient(ellipse at 100% 100%, rgba(5,150,105,.12) 0%, transparent 55%);
}
.ct2-wa-dot {
  width:8px;height:8px;border-radius:50%;background:var(--green-hi);
  display:inline-block; margin-right:8px; vertical-align:middle;
  animation:ct2-dot 2.4s ease-in-out infinite;
}
/* text ON cocoa wa card */
.ct2-wa-online { font-family:var(--fb); font-size:11px; font-weight:600; letter-spacing:.12em; text-transform:uppercase; color:var(--green-hi); margin-bottom:10px; }
.ct2-wa-title  { font-family:var(--fh); font-size:17px; font-weight:800; color:var(--on-pg); letter-spacing:-.02em; margin-bottom:8px; }
.ct2-wa-desc   { font-family:var(--fb); font-size:13px; font-weight:300; color:var(--on-pg-45); line-height:1.7; margin-bottom:22px; }

.ct2-btn-wa {
  display:flex; align-items:center; justify-content:center; gap:9px;
  width:100%; padding:14px 24px;
  background:linear-gradient(135deg,#22c55e,#16a34a);
  color:#fff; font-family:var(--fh); font-size:14px; font-weight:700;
  border:none; border-radius:12px; cursor:pointer; text-decoration:none;
  box-shadow:0 6px 24px rgba(34,197,94,.28);
  animation:ct2-pulse 2.8s ease-out infinite;
  margin-bottom:10px;
  transition:transform .3s var(--ease), box-shadow .3s, filter .25s;
}
.ct2-btn-wa:hover { transform:translateY(-3px); box-shadow:0 12px 36px rgba(34,197,94,.44); animation:none; filter:brightness(1.06); }
.ct2-btn-wa:active { transform:scale(.95); }

.ct2-btn-call {
  display:flex; align-items:center; justify-content:center; gap:9px;
  width:100%; padding:13px 24px;
  background:var(--on-pg-06); color:var(--on-pg-70);
  border:1px solid var(--on-pg-10);
  font-family:var(--fh); font-size:14px; font-weight:600;
  border-radius:12px; cursor:pointer; text-decoration:none;
  transition:background .25s, color .25s, transform .25s var(--ease);
}
.ct2-btn-call:hover { background:var(--on-pg-10); color:var(--on-pg); transform:translateY(-2px); }

/* ── Responsive ── */
@media(max-width:960px){
  .ct2-grid { grid-template-columns:1fr; }
  .ct2-hero { padding:150px 24px 72px; }
  .ct2-wrap { padding:0 24px; }
  .ct2-panel { padding:40px 32px; }
  .ct2-info-card, .ct2-wa-card { padding:32px 28px; }
  .ct2-trust-inner { grid-template-columns:1fr 1fr; }
  .ct2-trust-item:nth-child(3) { grid-column:1/-1; border-right:none; border-top:1px solid var(--on-pg-10); }
}
@media(max-width:600px){
  .ct2-hero { padding:130px 20px 60px; }
  .ct2-wrap { padding:0 20px; }
  .ct2-panel { padding:32px 22px; }
  .ct2-info-card,.ct2-wa-card { padding:28px 20px; }
  .ct2-trust-inner { grid-template-columns:1fr; }
  .ct2-trust-item { border-right:none; border-bottom:1px solid var(--on-pg-10); padding:24px 0; }
  .ct2-trust-item:last-child { border-bottom:none; }
  .ct2-trust-item:nth-child(3) { grid-column:auto; border-top:none; }
  .ct2-trust-item:first-child  { padding-left:0; }
}
`;

function Styles() {
  useEffect(() => {
    if (document.getElementById("ct2-css")) return;
    const t = document.createElement("style");
    t.id = "ct2-css"; t.textContent = CSS;
    document.head.prepend(t);
    return () => t.remove();
  }, []);
  return null;
}

function Field({ label, error, textarea, select, children, value }) {
  const [focused, setFocused] = useState(false);
  const hasValue = String(value || "").length > 0;

  const inner = select
    ? React.cloneElement(children, {
        onFocus: (e) => { setFocused(true);  children.props.onFocus?.(e); },
        onBlur:  (e) => { setFocused(false); children.props.onBlur?.(e); },
      })
    : React.cloneElement(children, {
        onFocus: (e) => { setFocused(true);  children.props.onFocus?.(e); },
        onBlur:  (e) => { setFocused(false); children.props.onBlur?.(e); },
        className: `ct2-input${error ? " ct2-has-error" : ""}`,
      });

  return (
    <div className="ct2-field" style={{ position:"relative" }}>
      <div
        className={[
          "ct2-field-inner",
          focused   ? "focused"   : "",
          hasValue  ? "has-value" : "",
          textarea  ? "is-textarea" : "",
          select    ? "has-value"   : "",
        ].join(" ").trim()}
        onFocus={select ? () => setFocused(true)  : undefined}
        onBlur ={select ? () => setFocused(false) : undefined}
      >
        <label className="ct2-label">{label}</label>
        {inner}
      </div>
      {error && (
        <p className="ct2-error-msg">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

function Contact() {
  const go = useDelayedMount(60);
  useScrollReveal(".ct2-reveal", "ct2-visible");

  const [form, setForm]           = useState({ name:"", phone:"", service:"", details:"" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [errors, setErrors]       = useState({});

  const hi = (d) => ({
    opacity: go ? 1 : 0,
    animation: go ? `ct2-up .72s ${d}s cubic-bezier(.16,1,.3,1) forwards` : "none",
  });

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const filled = [form.name, form.phone, form.service, form.details].filter(Boolean).length;

  const submit = async () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    else if (form.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";
    const cleanPhone = form.phone.replace(/[\s\-]/g, "");
    if (!cleanPhone) newErrors.phone = "Phone number is required";
    else if (!/^(0|\+233)\d{9}$/.test(cleanPhone)) newErrors.phone = "Enter a valid Ghana phone number";
    if (!form.service) newErrors.service = "Please select a service";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});
    setLoading(true);

    const payload = {
      name: form.name, phone: form.phone, service: form.service, message: form.details,
      timestamp: new Date().toLocaleString("en-GB", { timeZone:"Africa/Accra" }),
      from_page: window.location.href,
    };
    const emailBody = `🔔 NEW SERVICE REQUEST\n\n👤 Name: ${payload.name}\n📞 Phone: ${payload.phone}\n🧹 Service: ${payload.service}\n💬 Message:\n${payload.message}\n\n⏰ Received: ${payload.timestamp}\n🌐 From: ${payload.from_page}`;
    const waBody    = `🔔 New Booking Request\n\n👤 ${payload.name}\n📞 ${payload.phone}\n🧹 ${payload.service}\n💬 ${payload.message}\n⏰ ${payload.timestamp}`;

    try {
      const res = await fetch("https://formspree.io/f/xojbljol", {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Formspree failed");
      BUSINESS.whatsappNumbers.forEach((num, idx) => {
        setTimeout(() => window.open(`https://wa.me/${num}?text=${encodeURIComponent(waBody)}`, "_blank"), idx * 400);
      });
      window.open(`mailto:${BUSINESS.emails.join(",")}?subject=🔔 New Booking: ${payload.service}&body=${encodeURIComponent(emailBody)}`, "_blank");
      setSubmitted(true);
      setForm({ name:"", phone:"", service:"", details:"" });
      setTimeout(() => setSubmitted(false), 8000);
    } catch (err) {
      console.error(err);
      window.open(`https://wa.me/${BUSINESS.whatsappNumbers[0]}?text=${encodeURIComponent(waBody)}`, "_blank");
      window.open(`mailto:${BUSINESS.emails.join(",")}?subject=🔔 New Booking&body=${encodeURIComponent(emailBody)}`, "_blank");
      alert("We're having trouble sending. Please WhatsApp us directly at +233 54 212 8342.");
    } finally { setLoading(false); }
  };

  return (
    <PageWrapper>
      <Helmet>
        <title>Contact Us | Chapman Prestige Limited</title>
        <meta name="description" content="Get in touch for a free quote. Chapman Prestige serves Kumasi and the Ashanti Region with professional cleaning solutions." />
        <link rel="canonical" href="https://chapmanprestigelimited.com/contact" />
      </Helmet>
      <div className="ct2">
        <Styles />
        <div className="ct2-grain" aria-hidden="true" />

        {/* HERO */}
        <section className="ct2-hero">
          <div className="ct2-orb ct2-orb1" aria-hidden="true" />
          <div className="ct2-orb ct2-orb2" aria-hidden="true" />
          <div className="ct2-orb ct2-orb3" aria-hidden="true" />
          <div className="ct2-wrap">
            <p className="ct2-eye" style={hi(0)}>Book a service</p>
            <h1 className="ct2-hero-hl" style={hi(.1)}>
              Let's Get Your<br/>
              <span>Space Clean.</span>
            </h1>
            <p className="ct2-hero-sub" style={hi(.22)}>
              Fill in the form and we'll respond within the hour.
              Fast, professional service anywhere in Kumasi.
            </p>
          </div>
        </section>

        {/* TRUST STRIP */}
        <div className="ct2-trust">
          <div className="ct2-wrap">
            <div className="ct2-trust-inner ct2-reveal">
              <div className="ct2-trust-item">
                <div className="ct2-trust-icon"><Clock size={20}/></div>
                <div><div className="ct2-trust-num">&lt; 1hr</div><div className="ct2-trust-lbl">Average response time</div></div>
              </div>
              <div className="ct2-trust-item">
                <div className="ct2-trust-icon"><MapPin size={20}/></div>
                <div><div className="ct2-trust-num">Kumasi</div><div className="ct2-trust-lbl">&amp; entire Ashanti Region</div></div>
              </div>
              <div className="ct2-trust-item">
                <div className="ct2-trust-icon"><CheckCircle size={20}/></div>
                <div><div className="ct2-trust-num">500+</div><div className="ct2-trust-lbl">Happy clients since 2016</div></div>
              </div>
            </div>
          </div>
        </div>

        {/* FORM + SIDEBAR */}
        <section className="ct2-section">
          <div className="ct2-wrap">
            <div className="ct2-grid">

              {/* FORM — amber card */}
              <div className="ct2-panel ct2-reveal">
                <p className="ct2-eye-card">Service request</p>
                <h2 className="ct2-panel-head">Book a Service</h2>

                <div className="ct2-progress" aria-hidden="true">
                  {[0,1,2,3].map(i => (
                    <div key={i} className={`ct2-progress-dot${filled > i ? " filled" : ""}`} />
                  ))}
                </div>

                {submitted ? (
                  <div className="ct2-success">
                    <div className="ct2-success-icon"><CheckCircle size={20}/></div>
                    <div>
                      <div className="ct2-success-title">Request received!</div>
                      <div className="ct2-success-body">
                        We'll contact you at the number provided shortly — usually within the hour.
                        Check WhatsApp for a confirmation message.
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                    <Field label="Full Name" error={errors.name} value={form.name}>
                      <input name="name" value={form.name} onChange={handle} type="text" />
                    </Field>
                    <Field label="Phone Number" error={errors.phone} value={form.phone}>
                      <input name="phone" value={form.phone} onChange={handle} type="tel" />
                    </Field>
                    <Field label="Service Required" error={errors.service} value={form.service} select>
                      <div className="ct2-select-wrap">
                        <select name="service" value={form.service} onChange={handle}
                          className={`ct2-input${errors.service ? " ct2-has-error" : ""}`}>
                          <option value=""> </option>
                          <option>Laundry Services</option>
                          <option>Fumigation &amp; Pest Control</option>
                          <option>Office &amp; Corporate Cleaning</option>
                          <option>Healthcare Cleaning</option>
                          <option>Post-Construction Cleaning</option>
                          <option>Poly-Tank &amp; Deep Cleaning</option>
                        </select>
                        <span className="ct2-chevron"><ChevronDown size={16}/></span>
                      </div>
                    </Field>
                    <Field label="Additional Details (optional)" value={form.details} textarea>
                      <textarea name="details" value={form.details} onChange={handle} rows={5} style={{ resize:"vertical" }} />
                    </Field>
                    <button type="button" className="ct2-submit" onClick={submit} disabled={loading}>
                      {loading ? "Sending request…" : "Submit Request →"}
                    </button>
                    <p className="ct2-disclaimer">
                      By submitting you agree to be contacted via phone or WhatsApp regarding your request.
                    </p>
                  </div>
                )}
              </div>

              {/* SIDEBAR */}
              <div className="ct2-sidebar">
                {/* Info card — amber */}
                <div className="ct2-info-card ct2-reveal" style={{ transitionDelay:".1s" }}>
                  <p className="ct2-eye-card" style={{ marginBottom:6 }}>Contact info</p>
                  <div className="ct2-info-row">
                    <div className="ct2-info-icon"><Phone size={17}/></div>
                    <div>
                      <div className="ct2-info-lbl">Phone</div>
                      <a href="tel:+233232276648" className="ct2-info-val">0232 276 648</a>
                      <a href="tel:+233534134809" className="ct2-info-val">0534 134 809</a>
                    </div>
                  </div>
                  <div className="ct2-info-row">
                    <div className="ct2-info-icon"><Mail size={17}/></div>
                    <div>
                      <div className="ct2-info-lbl">Email</div>
                      {(BUSINESS.emails || ["kenchapsy@gmail.com","chapmanprestigelimited@gmail.com"]).map(e => (
                        <a key={e} href={`mailto:${e}`} className="ct2-info-val">{e}</a>
                      ))}
                    </div>
                  </div>
                  <div className="ct2-info-row">
                    <div className="ct2-info-icon"><MapPin size={17}/></div>
                    <div>
                      <div className="ct2-info-lbl">Location</div>
                      <span className="ct2-info-val">{BUSINESS.location}</span>
                    </div>
                  </div>
                  <div className="ct2-info-row">
                    <div className="ct2-info-icon"><Clock size={17}/></div>
                    <div>
                      <div className="ct2-info-lbl">Hours</div>
                      <span className="ct2-info-val">Mon – Sat: 7 AM – 6 PM</span>
                      <span className="ct2-info-val" style={{ color:"var(--on-card-45)", fontWeight:400, fontSize:13 }}>Sun: By appointment</span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp card — cocoa */}
                <div className="ct2-wa-card ct2-reveal" style={{ transitionDelay:".22s" }}>
                  <div className="ct2-wa-online"><span className="ct2-wa-dot"/>Available on WhatsApp</div>
                  <div className="ct2-wa-title">Prefer to message directly?</div>
                  <p className="ct2-wa-desc">Chat with us instantly. We typically reply within minutes during business hours.</p>
                  <a href={BUSINESS.whatsappUrl} target="_blank" rel="noreferrer" className="ct2-btn-wa">
                    <MessageCircle size={17}/> Chat on WhatsApp
                  </a>
                  <a href="tel:+233232276648" className="ct2-btn-call">
                    <Phone size={15}/> Call Us Now
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}

export default Contact;