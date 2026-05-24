import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { useEffect, useState } from "react";
import { useScrollReveal, useDelayedMount } from "../utils/hooks";
import { BUSINESS } from "../config/business.jsx";
import { Helmet } from "react-helmet-async";

/* 
   TEAM — Warm Luxury Professional
   · Cream background with cocoa accent sections
   · Emerald green + golden amber accents
   · Editorial grid layout with card hover effects
   · High contrast text for visibility
*/
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

:root {
  /* Warm Luxury Palette */
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
}

.tm*, .tm*::before, .tm*::after { box-sizing:border-box; margin:0; padding:0; }
.tm { background:var(--cream); color:var(--ink-70); font-family:var(--fb); min-height:100vh; overflow-x:hidden; }
.tm a { text-decoration:none; }

/* Keyframes */
@keyframes tm-rise  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
@keyframes tm-line  { from{transform:scaleX(0)} to{transform:scaleX(1)} }
@keyframes tm-pop   { from{opacity:0;transform:scale(.94)} to{opacity:1;transform:scale(1)} }

/* Scroll reveals */
.tm-rv       { opacity:0; transform:translateY(32px); transition:opacity .7s var(--ease), transform .7s var(--ease); }
.tm-visible  { opacity:1 !important; transform:none !important; }

.tm-wrap { max-width:1140px; margin:0 auto; padding:0 44px; }

/* Eyebrow */
.tm-eye {
  display:inline-flex; align-items:center; gap:10px;
  font-family:var(--fb); font-size:10.5px; font-weight:600;
  letter-spacing:.22em; text-transform:uppercase;
  color:var(--gold); margin-bottom:18px;
}
.tm-eye::before {
  content:''; display:block; width:18px; height:1.5px;
  background:currentColor; border-radius:2px;
}

/* Headlines */
.tm-h1 {
  font-family:var(--fh);
  font-size:clamp(46px,6.5vw,84px);
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

/* Hero */
.tm-hero {
  min-height:60vh;
  display:flex; flex-direction:column; justify-content:flex-end;
  padding:140px 44px 80px;
  position:relative; overflow:hidden;
  background:var(--cocoa2);
  border-bottom:1px solid var(--line);
}
.tm-hero-rule {
  height:1px; background:rgba(255,255,255,.15); margin-bottom:40px;
  transform:scaleX(0); transform-origin:left;
  animation:tm-line .9s .2s var(--ease) forwards;
}

/* Team Card — Professional Grid */
.tm-card {
  background:#fff;
  border:1.5px solid var(--line);
  border-radius:20px; overflow:hidden;
  transition:border-color .35s, transform .4s var(--ease), box-shadow .4s;
  position:relative;
}
.tm-card:hover {
  border-color:var(--green);
  transform:translateY(-7px);
  box-shadow:0 30px 60px rgba(5,150,105,.12), 0 0 0 1px rgba(5,150,105,.08);
}
.tm-card-img {
  width:100%; aspect-ratio:4/3;
  background:linear-gradient(135deg, var(--green), var(--green-hi));
  display:flex; align-items:center; justify-content:center;
  color:#fff; font-family:var(--fh); font-size:14px; font-weight:600;
  letter-spacing:.04em; text-transform:uppercase;
  transition:transform .4s var(--ease);
}
.tm-card:hover .tm-card-img { transform:scale(1.04); }
.tm-card-body { padding:28px 24px; }
.tm-card-name {
  font-family:var(--fh); font-size:18px; font-weight:700;
  color:var(--ink); margin-bottom:4px; letter-spacing:-.01em;
}
.tm-card-role {
  font-family:var(--fb); font-size:12px; font-weight:600;
  color:var(--green); letter-spacing:.08em; text-transform:uppercase; margin-bottom:12px;
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
  color: var(--green-hi); transform: translateX(3px);
}

/* Section spacing */
.tm-section { padding:80px 0; }
.tm-section + .tm-section { border-top:1px solid var(--line); }

/* CTA Card */
.tm-cta-card {
  background:var(--cocoa2);
  border:1.5px solid rgba(255,255,255,.1);
  border-radius:24px; padding:64px 40px;
  text-align:center;
}

/* Button */
.tm-btn-primary {
  display:inline-flex; align-items:center; gap:9px;
  background:linear-gradient(135deg,var(--green),var(--green-hi));
  color:#fff; font-family:var(--fh);
  font-size:13.5px; font-weight:700; letter-spacing:.01em;
  padding:13px 26px; border-radius:100px;
  box-shadow:0 4px 16px rgba(5,150,105,.28);
  transition:transform .25s var(--ease), box-shadow .25s, filter .25s;
}
.tm-btn-primary:hover { transform:translateY(-3px); box-shadow:0 10px 28px rgba(5,150,105,.38); filter:brightness(1.05); }
.tm-btn-primary:active { transform:translateY(-1px) scale(.97); transition-duration:.1s; }

/* Responsive */
@media(max-width:768px){
  .tm-wrap { padding:0 22px; }
  .tm-hero { padding:120px 22px 64px; }
  .tm-section { padding:60px 0; }
  .tm-cta-card { padding:48px 24px; }
}
@media(max-width:560px){
  .tm-h1 { font-size:40px; }
  .tm-h2, .tm-h2-dark { font-size:28px; }
}
`;

function StyleTag() {
  useEffect(() => {
    if (document.getElementById("tm-css-v2")) return;
    const el = document.createElement("style");
    el.id = "tm-css-v2"; el.textContent = CSS;
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

  // Staggered animation helper
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
        {/* HERO */}
        <section className="tm-hero">
          <div className="tm-wrap" style={{ position:"relative", zIndex:1 }}>
            <div className="tm-hero-rule" />
            <p className="tm-eye" style={{ marginBottom:28, ...hi(0) }}>Our people</p>
            <h1 className="tm-h1" style={{ 
  marginBottom:24, 
  maxWidth:720, 
  color: "#FFFFFF", 
  ...hi(0.12) 
}}>
  Meet the Team Behind<br/>
  <span style={{ color:"var(--gold-hi)" }}>The Prestige.</span>
</h1>
            <p style={{
              fontFamily:"var(--fb)", fontSize:17, fontWeight:500,
              color:"rgba(255,255,255,.78)", lineHeight:1.8, maxWidth:520,
              ...hi(0.24),
            }}>
              Skilled professionals dedicated to delivering spotless results, every single day.
            </p>
          </div>
        </section>

        {/* LEADERSHIP */}
        <section className="tm-section">
          <div className="tm-wrap">
            <p className="tm-eye tm-rv" style={{ marginBottom:40 }}>Leadership & Management</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:24 }}>
              {TEAM.leadership.map((p, i) => (
  <div key={p.name} className={`tm-card tm-rv ${go ? "tm-visible" : ""}`} style={{ transitionDelay: (i * 0.08) + "s" }}>
    {/* Image replaces placeholder */}
    <img 
      src={p.image} 
      alt={`${p.name}, ${p.role}`} 
      className="tm-card-img"
      style={{ objectFit: "cover" }}
      onError={(e) => { e.target.src = "/team/placeholder.jpg"; }} // Fallback if image missing
    />
    <div className="tm-card-body">
      <h3 className="tm-card-name">{p.name}</h3>
      <div className="tm-card-role">{p.role}</div>
      <p className="tm-card-bio">{p.bio}</p>
      
      {/* Contact Info */}
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
                  <div className="tm-card-img">Photo</div>
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
        <section style={{ padding:"0 44px 100px" }}>
          <div className="tm-wrap">
            <div className={`tm-cta-card tm-rv ${go ? "tm-visible" : ""}`}>
              <p className="tm-eye" style={{ justifyContent:"center", marginBottom:16, color:"var(--gold)" }}>Join us</p>
              <h2 className="tm-h2-dark" style={{ marginBottom:16 }}>
                Want to Be Part of the Team?
              </h2>
              <p style={{
                fontFamily:"var(--fb)", fontSize:16, fontWeight:400,
                color:"rgba(255,255,255,.65)", marginBottom:32, lineHeight:1.75, maxWidth:480, margin:"0 auto 32px",
              }}>
                We're always looking for dedicated professionals. Check our open positions or send us your details.
              </p>
              <Link to="/careers" className="tm-btn-primary">
                View Open Roles
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}