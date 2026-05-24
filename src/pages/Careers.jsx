import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { useEffect } from "react";
import { useScrollReveal, useDelayedMount } from "../utils/hooks";
import { BUSINESS } from "../config/business.jsx";
import { Mail, MessageCircle, Phone, Sparkles, CheckCircle2 } from "lucide-react";
import { Helmet } from "react-helmet-async";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

:root {
  --yellow:         #FFFBEB;
  --yellow-deep:    #FEF3C7;
  --cocoa:          #18120C;
  --cocoa2:         #231A12;
  
  --green:          #059669;
  --green-hi:       #10B981;
  --green-deep:     #047857;
  --gold:           #D97706;
  --gold-hi:        #F59E0B;
  
  --ink:            #1C1208;
  --ink-70:         #4B3E30;
  --ink-45:         #7A6A59;
  
  --line:           rgba(28,18,8,0.12);
  --line2:          rgba(28,18,8,0.20);
  --glow-g:         rgba(5,150,105,0.18);
  --glow-o:         rgba(217,119,6,0.15);
  
  --fh: 'Outfit', system-ui, sans-serif;
  --fb: 'DM Sans', system-ui, sans-serif;
  --ease: cubic-bezier(.16,1,.3,1);
}

.cr*, .cr*::before, .cr*::after { box-sizing:border-box; margin:0; padding:0; }
.cr { background:var(--yellow); color:var(--ink-70); font-family:var(--fb); min-height:100vh; overflow-x:hidden; }
.cr a { text-decoration:none; }

@keyframes cr-rise  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
@keyframes cr-line  { from{transform:scaleX(0)} to{transform:scaleX(1)} }

.cr-rv       { opacity:0; transform:translateY(32px); transition:opacity .7s var(--ease), transform .7s var(--ease); }
.cr-visible  { opacity:1 !important; transform:none !important; }

.cr-wrap { max-width:1140px; margin:0 auto; padding:0 44px; }

.cr-eye {
  display:inline-flex; align-items:center; gap:10px;
  font-family:var(--fb); font-size:10.5px; font-weight:600;
  letter-spacing:.22em; text-transform:uppercase;
  color:var(--gold); margin-bottom:18px;
}
.cr-eye::before {
  content:''; display:block; width:18px; height:1.5px;
  background:currentColor; border-radius:2px;
}

.cr-h1 {
  font-family:var(--fh);
  font-size:clamp(46px,6.5vw,84px);
  font-weight:800; line-height:.97;
  letter-spacing:-.04em;
  color:var(--ink);
}

/* Hero */
.cr-hero {
  min-height:60vh;
  display:flex; flex-direction:column; justify-content:flex-end;
  padding:140px 44px 80px;
  position:relative; overflow:hidden;
  background:var(--cocoa2);
  border-bottom:1px solid var(--line);
}
.cr-hero-rule {
  height:1px; background:rgba(255,255,255,.15); margin-bottom:40px;
  transform:scaleX(0); transform-origin:left;
  animation:cr-line .9s .2s var(--ease) forwards;
}

/* Role Card */
.cr-section { padding:96px 0; }
.cr-role-card {
  background:#fff;
  border:1.5px solid var(--line);
  border-radius:24px; padding:48px 40px;
  max-width:720px; margin:0 auto;
  box-shadow:0 8px 24px rgba(28,18,8,0.04);
}
.cr-role-header {
  display:flex; align-items:flex-start; gap:16px; margin-bottom:24px;
}
.cr-role-icon {
  width:56px; height:56px; border-radius:16px;
  background:rgba(5,150,105,0.08);
  border:1.5px solid rgba(5,150,105,0.2);
  display:flex; align-items:center; justify-content:center;
  color:var(--green); flex-shrink:0;
}
.cr-role-title {
  font-family:var(--fh); font-size:22px; font-weight:700;
  color:var(--ink); margin-bottom:4px;
}
.cr-role-subtitle {
  font-family:var(--fb); font-size:13px; font-weight:500;
  color:var(--green); letter-spacing:0.04em; text-transform:uppercase;
}
.cr-role-desc {
  font-family:var(--fb); font-size:15px; font-weight:400;
  color:var(--ink-70); line-height:1.75; margin-bottom:24px;
}

/* Requirements List */
.cr-requirements {
  background:rgba(5,150,105,0.04);
  border:1px solid rgba(5,150,105,0.15);
  border-radius:16px; padding:20px 24px; margin-bottom:32px;
}
.cr-requirements-title {
  font-family:var(--fh); font-size:14px; font-weight:600;
  color:var(--green-deep); margin-bottom:12px; display:flex; align-items:center; gap:8px;
}
.cr-requirements-list {
  list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px;
}
.cr-requirements-list li {
  font-family:var(--fb); font-size:13.5px; color:var(--ink-70);
  display:flex; align-items:flex-start; gap:8px;
}
.cr-requirements-list li::before {
  content:"✓"; color:var(--green); font-weight:700; flex-shrink:0; margin-top:2px;
}

/* No CV Badge */
.cr-no-cv-badge {
  display:inline-flex; align-items:center; gap:6px;
  background:rgba(217,119,6,0.1); color:var(--gold);
  border:1px solid rgba(217,119,6,0.25);
  font-family:var(--fb); font-size:12px; font-weight:600;
  padding:6px 14px; border-radius:100px; margin-bottom:24px;
}

/* Contact Channels */
.cr-contact-label {
  font-family:var(--fb); font-size:12px; font-weight:600;
  color:var(--ink-45); text-transform:uppercase; letter-spacing:0.1em;
  margin-bottom:16px;
}
.cr-contact-buttons {
  display:flex; gap:12px; justify-content:center; flex-wrap:wrap;
}
.cr-contact-btn {
  display:inline-flex; align-items:center; gap:8px;
  padding:12px 22px; border-radius:100px;
  font-family:var(--fh); font-size:13.5px; font-weight:600;
  text-decoration:none; transition:transform .25s var(--ease), box-shadow .25s, background .25s;
}
.cr-wa { background:rgba(37,211,102,0.1); color:#25d366; border:1.5px solid rgba(37,211,102,0.25); }
.cr-wa:hover { background:rgba(37,211,102,0.2); transform:translateY(-2px); box-shadow:0 6px 16px rgba(37,211,102,0.15); }
.cr-email { background:rgba(5,150,105,0.08); color:var(--green); border:1.5px solid rgba(5,150,105,0.2); }
.cr-email:hover { background:var(--green); color:#fff; transform:translateY(-2px); box-shadow:0 6px 16px rgba(5,150,105,0.2); }
.cr-phone { background:rgba(217,119,6,0.08); color:var(--gold); border:1.5px solid rgba(217,119,6,0.2); }
.cr-phone:hover { background:var(--gold); color:#fff; transform:translateY(-2px); box-shadow:0 6px 16px rgba(217,119,6,0.2); }

/* Responsive */
@media(max-width:768px){
  .cr-wrap { padding:0 22px; }
  .cr-hero { padding:120px 22px 64px; }
  .cr-section { padding:64px 0; }
  .cr-role-card { padding:36px 24px; }
  .cr-contact-buttons { flex-direction:column; }
  .cr-contact-btn { width:100%; justify-content:center; }
}
@media(max-width:560px){
  .cr-h1 { font-size:40px; }
}
`;

function StyleTag() {
  useEffect(() => {
    if (document.getElementById("cr-css-v2")) return;
    const el = document.createElement("style");
    el.id = "cr-css-v2"; el.textContent = CSS;
    document.head.prepend(el);
    return () => el.remove();
  }, []);
  return null;
}

export default function Careers() {
  const go = useDelayedMount(60);
  useScrollReveal(".cr-rv", "cr-visible");

  const hi = (delay) => ({
    opacity: go ? 1 : 0,
    animation: go ? `cr-rise .7s ${delay}s var(--ease) forwards` : "none",
  });

  return (
    <PageWrapper>
      <StyleTag />
      <Helmet>
        <title>Careers | Join Chapman Prestige Limited</title>
        <meta name="description" content="Join our team as a Generalist Trainee. No CV required. Qualified candidates contact us directly via WhatsApp, Email, or Phone." />
        <link rel="canonical" href="https://chapmanprestigelimited.com/careers" />
      </Helmet>

      <div className="cr">
        {/* HERO */}
        <section className="cr-hero">
          <div className="cr-wrap" style={{ position:"relative", zIndex:1 }}>
            <div className="cr-hero-rule" />
            <p className="cr-eye" style={{ marginBottom:28, ...hi(0) }}>Join our team</p>
            <h1 className="cr-h1" style={{ 
              marginBottom:24, 
              maxWidth:720, 
              color: "#FFFFFF",
              ...hi(0.12) 
            }}>
              Build Your Career With<br/>
              <span style={{ color:"var(--gold-hi)" }}>Chapman Prestige.</span>
            </h1>
            <p style={{
              fontFamily:"var(--fb)", fontSize:17, fontWeight:500,
              color:"rgba(255,255,255,.78)", lineHeight:1.8, maxWidth:520,
              ...hi(0.24),
            }}>
              We're always looking for dedicated professionals who share our commitment to excellence.
            </p>
          </div>
        </section>

        {/* SINGLE ROLE + CONTACT CHANNELS */}
        <section className="cr-section">
          <div className="cr-wrap">
            <div className="cr-role-card cr-rv">
              
              {/* Role Header */}
              <div className="cr-role-header">
                <div className="cr-role-icon">
                  <Sparkles size={28} />
                </div>
                <div>
                  <h3 className="cr-role-title">Generalist Trainee</h3>
                  <div className="cr-role-subtitle">Full-time · Kumasi-based</div>
                </div>
              </div>

              {/* Role Description */}
              <p className="cr-role-desc">
                We're seeking a versatile, eager-to-learn professional to train across all Chapman Prestige services: laundry, fumigation, deep cleaning, and sanitation. You'll work alongside our expert team to master every aspect of our operations, with growth opportunities as you excel.
              </p>

              {/* Requirements */}
              <div className="cr-requirements">
                <div className="cr-requirements-title">
                  <CheckCircle2 size={16} />
                  What We're Looking For
                </div>
                <ul className="cr-requirements-list">
                  <li>Reliable, punctual, and physically able to handle cleaning tasks</li>
                  <li>Willingness to learn multiple service areas (training provided)</li>
                  <li>Strong attention to detail and commitment to quality</li>
                  <li>Professional attitude and excellent communication skills</li>
                  <li>Based in or able to commute to Kumasi daily</li>
                </ul>
              </div>

              {/* No CV Badge */}
              <div className="cr-no-cv-badge">
                <Sparkles size={14} />
                No CV Required. Qualified Candidates Contact Directly
              </div>

              {/* Contact Channels */}
              <div className="cr-contact-section">
                <p className="cr-contact-label">Ready to apply? Reach out directly:</p>
                <div className="cr-contact-buttons">
                  <a href={BUSINESS.whatsappUrl} target="_blank" rel="noreferrer" className="cr-contact-btn cr-wa">
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                  <a href={`mailto:${BUSINESS.emails?.[0]}?subject=Generalist Trainee Application&body=Hello Chapman Prestige Team,%0D%0A%0D%0AI am interested in the Generalist Trainee role. Please find my details below:%0D%0A%0D%0AName:%0D%0APhone:%0D%0AAvailability:%0D%0A%0D%0AThank you.`} className="cr-contact-btn cr-email">
                    <Mail size={16} /> Email
                  </a>
                  <a href={BUSINESS.telUrl} className="cr-contact-btn cr-phone">
                    <Phone size={16} /> Call
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