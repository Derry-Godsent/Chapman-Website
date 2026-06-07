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
   Full-color cards · Scrolling trust marquee
   Outfit display  ·  DM Sans body
═══════════════════════════════════════════════════════════ */

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
  --shadow-lg:    0 12px 40px rgba(0,0,0,.10), 0 4px 12px rgba(0,0,0,.05);

  --fh: 'Outfit', system-ui, sans-serif;
  --fb: 'DM Sans', system-ui, sans-serif;
  --ease:  cubic-bezier(.16,1,.3,1);
  --ease2: cubic-bezier(.4,0,.2,1);
}

/* ── Reset / base ── */
.ct2 *, .ct2 *::before, .ct2 *::after { box-sizing:border-box; margin:0; padding:0; }
.ct2 {
  background: var(--cream);
  color: var(--ink-70);
  font-family: var(--fb);
  min-height:100vh;
  overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
}
.ct2 a { text-decoration:none; }

/* ── Animations ── */
@keyframes ct2-up    { from{opacity:0;transform:translateY(44px)} to{opacity:1;transform:translateY(0)} }
@keyframes ct2-pulse { 0%{box-shadow:0 0 0 0 rgba(101,163,13,.55)} 70%{box-shadow:0 0 0 10px rgba(101,163,13,0)} 100%{box-shadow:0 0 0 0 rgba(101,163,13,0)} }
@keyframes ct2-dot   { 0%,100%{opacity:1} 50%{opacity:.2} }
@keyframes ct2-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

/* ── Scroll reveal ── */
.ct2-reveal { opacity:0; transform:translateY(38px); transition:opacity .72s var(--ease), transform .72s var(--ease); }
.ct2-visible { opacity:1 !important; transform:none !important; }

/* ── Wrapper ── */
.ct2-wrap { max-width:1120px; margin:0 auto; padding:0 48px; position:relative; z-index:1; }

/* ── Eye label ── */
.ct2-eye {
  display:inline-flex; align-items:center; gap:9px;
  font-family:var(--fb); font-size:10.5px; font-weight:600;
  letter-spacing:.24em; text-transform:uppercase;
  color: var(--orange);
  margin-bottom:18px;
}
.ct2-eye::before {
  content:''; display:block; width:22px; height:1.5px;
  background:linear-gradient(90deg, var(--green), var(--green-hi));
}
.ct2-eye-white {
  display:inline-flex; align-items:center; gap:9px;
  font-family:var(--fb); font-size:10.5px; font-weight:600;
  letter-spacing:.24em; text-transform:uppercase;
  color: rgba(255,255,255,.75);
  margin-bottom:18px;
}
.ct2-eye-white::before {
  content:''; display:block; width:22px; height:1.5px;
  background:rgba(255,255,255,.5);
}

/* ══ HERO (matching Home page) ══ */
.ct2-hero {
  min-height:62vh; display:flex; align-items:flex-end;
  padding:160px 48px 88px; position:relative; overflow:hidden;
  border-bottom:1px solid var(--line);
  background: linear-gradient(135deg,var(--green-deep) 0%,var(--green) 50%,var(--green-hi) 100%);
}
.ct2-hero::before {
  content:''; position:absolute; inset:0; pointer-events:none;
  background:
    radial-gradient(ellipse 55% 65% at 10% 55%, rgba(255,255,255,.12), transparent),
    radial-gradient(ellipse 50% 60% at 88% 18%, rgba(249,115,22,.14), transparent),
    radial-gradient(ellipse 40% 50% at 60% 92%, rgba(217,119,6,.10), transparent);
}

.ct2-hero-hl {
  font-family:var(--fh); font-size:clamp(52px,8vw,98px);
  font-weight:900; line-height:.93; letter-spacing:-.045em;
  color: #fff;
  margin-bottom:28px;
}
.ct2-hero-hl span {
  background:linear-gradient(135deg, #fff 0%, var(--orange-hi) 55%, #FDE68A 100%);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
}
.ct2-hero-sub {
  font-family:var(--fb); font-size:17px; font-weight:300;
  color: rgba(255,255,255,.85); line-height:1.8; max-width:460px;
}

/* ══ TRUST MARQUEE (scrolling like Home page) ══ */
.ct2-marquee {
  background:linear-gradient(135deg,var(--green-deep),var(--green));
  padding:20px 0; overflow:hidden;
  border-bottom:1px solid var(--line);
}
.ct2-marquee-wrap { overflow:hidden; }
.ct2-marquee-track {
  display:flex; width:max-content;
  animation:ct2-marquee 24s linear infinite;
}
.ct2-marquee-track:hover { animation-play-state:paused; }
.ct2-marquee-item {
  display:flex; align-items:center; gap:16px;
  padding:0 32px;
  font-family:var(--fh); font-size:14px; font-weight:700;
  letter-spacing:.05em;
  color:#fff; white-space:nowrap;
}
.ct2-marquee-item::after { content:'◆'; font-size:8px; opacity:.6; margin-left:16px; }
.ct2-marquee-num {
  font-family:var(--fh); font-size:26px; font-weight:900;
  color:#fff; letter-spacing:-.02em;
}
.ct2-marquee-lbl {
  font-family:var(--fb); font-size:12px; font-weight:400;
  color:rgba(255,255,255,.75); margin-top:2px;
}

/* ══ GRID ══ */
.ct2-section { padding:72px 0 120px; background:var(--bg-soft); }
.ct2-grid { display:grid; grid-template-columns:1fr 400px; gap:24px; align-items:start; }

/* ══ FORM PANEL — Full Orange ══ */
.ct2-panel {
  background: linear-gradient(135deg, var(--orange-deep) 0%, var(--orange) 50%, var(--orange-hi) 100%);
  border:none;
  border-radius:22px; padding:56px 52px;
  box-shadow:0 20px 60px rgba(249,115,22,.30);
  position:relative; overflow:hidden;
}
.ct2-panel::before {
  content:''; position:absolute; inset:0; pointer-events:none;
  background:
    radial-gradient(ellipse 55% 65% at 10% 55%, rgba(255,255,255,.12), transparent),
    radial-gradient(ellipse 40% 50% at 90% 90%, rgba(255,255,255,.08), transparent);
}

.ct2-panel-head {
  font-family:var(--fh); font-size:clamp(26px,3vw,34px);
  font-weight:800; letter-spacing:-.03em;
  color: #fff;
  margin-bottom:36px;
  position:relative;
}

/* progress dots */
.ct2-progress { display:flex; gap:6px; margin-bottom:36px; position:relative; }
.ct2-progress-dot { height:4px; border-radius:4px; flex:1; background:rgba(255,255,255,.2); transition:background .4s var(--ease); }
.ct2-progress-dot.filled { background:#fff; }

/* ── Floating label ── */
.ct2-field-inner { position:relative; }
.ct2-label {
  position:absolute; left:18px; top:50%; transform:translateY(-50%);
  font-family:var(--fb); font-size:14.5px; font-weight:400;
  color: rgba(255,255,255,.7);
  pointer-events:none; transition:all .26s var(--ease); z-index:2;
}
.ct2-field-inner.has-value .ct2-label,
.ct2-field-inner.focused   .ct2-label {
  top:13px; transform:translateY(0);
  font-size:10px; font-weight:700; letter-spacing:.13em; text-transform:uppercase;
  color: #fff;
}
.ct2-field-inner.is-textarea .ct2-label { top:18px; transform:none; }
.ct2-field-inner.is-textarea.has-value .ct2-label,
.ct2-field-inner.is-textarea.focused   .ct2-label {
  top:10px; transform:none;
  font-size:10px; font-weight:700; letter-spacing:.13em; text-transform:uppercase;
  color: #fff;
}

/* input on orange */
.ct2-input {
  width:100%; padding:28px 18px 12px;
  background: rgba(255,255,255,.15);
  border:1.5px solid rgba(255,255,255,.3);
  border-radius:14px;
  color: #fff;
  font-family:var(--fb); font-size:15px; font-weight:400;
  outline:none; appearance:none;
  transition:border-color .3s, box-shadow .3s, background .3s;
  resize:none; min-height:64px; display:block;
  position:relative;
}
.ct2-input::placeholder { color:transparent; }
.ct2-input:focus {
  border-color: #fff;
  background: rgba(255,255,255,.25);
  box-shadow:0 0 0 4px rgba(255,255,255,.2);
}
.ct2-input.ct2-has-error { border-color:rgba(252,165,165,.8); box-shadow:0 0 0 4px rgba(252,165,165,.2); }
.ct2-input option { background:var(--orange); color:#fff; }

/* select sizing */
.ct2-select-wrap { position:relative; }
.ct2-select-wrap select.ct2-input { padding-right:44px; cursor:pointer; height:64px; line-height:1; }
.ct2-chevron {
  position:absolute; right:16px; top:50%; transform:translateY(-50%);
  color:rgba(255,255,255,.7); pointer-events:none; z-index:3;
  transition:transform .3s var(--ease), color .3s;
}
.ct2-select-wrap:focus-within .ct2-chevron { transform:translateY(-50%) rotate(180deg); color:#fff; }

/* error text */
.ct2-error-msg {
  display:flex; align-items:center; gap:6px;
  color:rgba(252,165,165,.95); font-size:12px;
  font-family:var(--fb); margin-top:7px; padding-left:4px;
}

/* submit button */
.ct2-submit {
  width:100%; position:relative; overflow:hidden; padding:18px 28px;
  background:#fff;
  color:var(--orange-deep); font-family:var(--fh); font-size:15px; font-weight:800;
  border:none; border-radius:14px; cursor:pointer; letter-spacing:-.01em;
  box-shadow:0 8px 28px rgba(0,0,0,.15);
  transition:transform .35s var(--ease), box-shadow .35s, opacity .2s;
}
.ct2-submit::after {
  content:''; position:absolute; inset:0;
  background:linear-gradient(90deg, transparent, rgba(249,115,22,.18), transparent);
  transform:translateX(-100%); transition:transform .6s var(--ease);
}
.ct2-submit:hover { transform:translateY(-3px); box-shadow:0 14px 40px rgba(0,0,0,.20); }
.ct2-submit:hover::after { transform:translateX(100%); }
.ct2-submit:active { transform:scale(.96); transition-duration:.1s; }
.ct2-submit:disabled { opacity:.5; cursor:not-allowed; transform:none; box-shadow:none; }

/* disclaimer text */
.ct2-disclaimer { font-family:var(--fb); font-size:12px; color:rgba(255,255,255,.7); text-align:center; line-height:1.6; }

/* success state */
.ct2-success {
  display:flex; align-items:flex-start; gap:16px;
  background:rgba(255,255,255,.2); border:1px solid rgba(255,255,255,.3);
  border-radius:16px; padding:24px 28px;
  animation:ct2-up .45s var(--ease) forwards;
  backdrop-filter:blur(8px);
}
.ct2-success-icon {
  width:40px;height:40px;border-radius:50%;flex-shrink:0;
  background:rgba(255,255,255,.25); border:1.5px solid rgba(255,255,255,.4);
  display:flex;align-items:center;justify-content:center;color:#fff;
}
.ct2-success-title { font-family:var(--fh); font-size:16px; font-weight:700; color:#fff; margin-bottom:5px; }
.ct2-success-body  { font-family:var(--fb); font-size:14px; color:rgba(255,255,255,.9); line-height:1.65; }

/* ══ SIDEBAR CARDS ══ */
.ct2-sidebar { display:flex; flex-direction:column; gap:16px; }

/* Info card — Full Sky Blue */
/* Info card — Dark Charcoal (Matching Footer) */
.ct2-info-card {
  background: linear-gradient(135deg, #111827 0%, #1F2937 100%);
  border: 1px solid rgba(255,255,255,.08);
  border-radius:22px; padding:36px 36px;
  box-shadow:0 20px 60px rgba(0,0,0,.25);
  position:relative; overflow:hidden;
}
.ct2-info-card::before {
  content:''; position:absolute; inset:0; pointer-events:none;
  background:
    radial-gradient(ellipse 55% 65% at 10% 55%, rgba(255,255,255,.12), transparent),
    radial-gradient(ellipse 40% 50% at 90% 90%, rgba(255,255,255,.08), transparent);
}

.ct2-info-row {
  display:flex; align-items:flex-start; gap:16px;
  padding:20px 0; border-bottom:1px solid rgba(255,255,255,.2);
  transition:transform .28s var(--ease);
  position:relative;
}
.ct2-info-row:last-child  { border-bottom:none; padding-bottom:0; }
.ct2-info-row:first-child { padding-top:0; }
.ct2-info-row:hover { transform:translateX(5px); }
.ct2-info-row:hover .ct2-info-icon { background:rgba(255,255,255,.25); border-color:rgba(255,255,255,.4); }

.ct2-info-icon {
  width:42px;height:42px;border-radius:12px;flex-shrink:0;
  background:rgba(255,255,255,.2); border:1px solid rgba(255,255,255,.3);
  display:flex;align-items:center;justify-content:center; color:#fff;
  transition:background .28s, border-color .28s;
}
.ct2-info-lbl {
  font-family:var(--fb); font-size:10px; font-weight:600;
  letter-spacing:.14em; text-transform:uppercase;
  color: rgba(255,255,255,.7);
  margin-bottom:5px;
}
.ct2-info-val {
  display:block; font-family:var(--fh); font-size:14.5px; font-weight:600;
  color: #fff;
  letter-spacing:-.01em; line-height:1.65; transition:color .22s;
}
a.ct2-info-val:hover { color:rgba(255,255,255,.85); }

/* WhatsApp card — Green gradient (like CTA panel) */
.ct2-wa-card {
  background: linear-gradient(135deg,var(--green-deep) 0%,var(--green) 50%,var(--green-hi) 100%);
  border:none;
  border-radius:22px; padding:32px 36px;
  position:relative; overflow:hidden;
  box-shadow:0 20px 60px rgba(101,163,13,.30);
}
.ct2-wa-card::before {
  content:''; position:absolute; inset:0; pointer-events:none;
  background:radial-gradient(ellipse at 100% 100%, rgba(255,255,255,.12) 0%, transparent 55%);
}
.ct2-wa-dot {
  width:8px;height:8px;border-radius:50%;background:#fff;
  display:inline-block; margin-right:8px; vertical-align:middle;
  animation:ct2-dot 2.4s ease-in-out infinite;
}
.ct2-wa-online { font-family:var(--fb); font-size:11px; font-weight:600; letter-spacing:.12em; text-transform:uppercase; color:#fff; margin-bottom:10px; }
.ct2-wa-title  { font-family:var(--fh); font-size:17px; font-weight:800; color:#fff; letter-spacing:-.02em; margin-bottom:8px; }
.ct2-wa-desc   { font-family:var(--fb); font-size:13px; font-weight:300; color:rgba(255,255,255,.85); line-height:1.7; margin-bottom:22px; }

.ct2-btn-wa {
  display:flex; align-items:center; justify-content:center; gap:9px;
  width:100%; padding:14px 24px;
  background:#fff;
  color:var(--green-deep); font-family:var(--fh); font-size:14px; font-weight:700;
  border:none; border-radius:12px; cursor:pointer; text-decoration:none;
  box-shadow:0 6px 24px rgba(0,0,0,.15);
  animation:ct2-pulse 2.8s ease-out infinite;
  margin-bottom:10px;
  transition:transform .3s var(--ease), box-shadow .3s, filter .25s;
}
.ct2-btn-wa:hover { transform:translateY(-3px); box-shadow:0 12px 36px rgba(0,0,0,.20); animation:none; filter:brightness(1.02); }
.ct2-btn-wa:active { transform:scale(.95); }

.ct2-btn-call {
  display:flex; align-items:center; justify-content:center; gap:9px;
  width:100%; padding:13px 24px;
  background:rgba(255,255,255,.15); color:#fff;
  border:1px solid rgba(255,255,255,.3);
  font-family:var(--fh); font-size:14px; font-weight:600;
  border-radius:12px; cursor:pointer; text-decoration:none;
  transition:background .25s, color .25s, transform .25s var(--ease);
}
.ct2-btn-call:hover { background:rgba(255,255,255,.25); color:#fff; transform:translateY(-2px); }

/* ── Responsive ── */
@media(max-width:960px){
  .ct2-grid { grid-template-columns:1fr; }
  .ct2-hero { padding:150px 24px 72px; }
  .ct2-wrap { padding:0 24px; }
  .ct2-panel { padding:40px 32px; }
  .ct2-info-card, .ct2-wa-card { padding:32px 28px; }
}
@media(max-width:600px){
  .ct2-hero { padding:130px 20px 60px; }
  .ct2-wrap { padding:0 20px; }
  .ct2-panel { padding:32px 22px; }
  .ct2-info-card,.ct2-wa-card { padding:28px 20px; }
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

  const TRUST_ITEMS = [
    { num: "< 1hr", lbl: "Average response time" },
    { num: "Kumasi", lbl: "& entire Ashanti Region" },
    { num: "500+", lbl: "Happy clients since 2016" },
  ];

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

        {/* HERO */}
        <section className="ct2-hero">
          <div className="ct2-wrap">
            <p className="ct2-eye-white" style={{ ...hi(0) }}>Book a service</p>
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

        {/* TRUST MARQUEE */}
        <div className="ct2-marquee">
          <div className="ct2-marquee-wrap">
            <div className="ct2-marquee-track">
              {[...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
                <div key={i} className="ct2-marquee-item">
                  <div>
                    <div className="ct2-marquee-num">{item.num}</div>
                    <div className="ct2-marquee-lbl">{item.lbl}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FORM + SIDEBAR */}
        <section className="ct2-section">
          <div className="ct2-wrap">
            <div className="ct2-grid">

              {/* FORM — Full Orange card */}
              <div className="ct2-panel ct2-reveal">
                <p className="ct2-eye-white">Service request</p>
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
                {/* Info card — Full Sky Blue */}
                <div className="ct2-info-card ct2-reveal" style={{ transitionDelay:".1s" }}>
                  <p className="ct2-eye-white" style={{ marginBottom:6 }}>Contact info</p>
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
                      <span className="ct2-info-val" style={{ color:"rgba(255,255,255,.75)", fontWeight:400, fontSize:13 }}>Sun: By appointment</span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp card — Green gradient */}
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