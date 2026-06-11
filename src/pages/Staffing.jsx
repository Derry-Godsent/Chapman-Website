import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { useEffect, useState } from "react";
import { useDelayedMount } from "../utils/hooks";
import { Zap, Shield, Wrench, Droplets, Hammer, Paintbrush, X, ArrowRight, MessageCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

:root {
  --navy:         #0F172A;
  --navy-light:   #1E293B;
  --navy-dark:    #020617;
  --orange:       #F97316;
  --orange-hi:    #FB923C;
  --orange-deep:  #EA580C;
  --white:        #FFFFFF;
  --gray-light:   #F1F5F9;
  --gray-text:    #475569;
  
  --fh: 'Outfit', system-ui, sans-serif;
  --fb: 'DM Sans', system-ui, sans-serif;
  --ease: cubic-bezier(.16,1,.3,1);
}

.st*, .st*::before, .st*::after { box-sizing:border-box; margin:0; padding:0; }
.st { background:var(--gray-light); color:var(--navy); font-family:var(--fb); min-height:100vh; overflow-x:hidden; }
.st a { text-decoration:none; }

@keyframes st-fade-up { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
@keyframes st-fade-out { to{opacity:0;visibility:hidden;pointer-events:none} }
@keyframes st-pop-in { from{opacity:0;transform:scale(.9)} to{opacity:1;transform:scale(1)} }

/* ══════════════════════════════════════
   GLASSMORPHIC INTRO OVERLAY
══════════════════════════════════════ */
.st-intro {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  display: flex; align-items: center; justify-content: center;
  padding: 40px 20px;
  animation: st-pop-in .6s var(--ease) forwards;
}
.st-intro.closing { animation: st-fade-out .5s var(--ease) forwards; }

.st-intro-box {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border-radius: 32px;
  padding: 60px 40px;
  max-width: 800px; width: 100%;
  max-height: 90vh; overflow-y: auto;
  text-align: center;
  box-shadow: 0 40px 100px rgba(0,0,0,.5);
  border: 1px solid rgba(255,255,255,0.2);
  border-top: 8px solid var(--orange);
}

.st-thumbs { display: flex; justify-content: center; gap: 20px; margin-bottom: 40px; flex-wrap: wrap; }
.st-thumb {
  width: 90px; height: 90px; border-radius: 20px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; color: var(--white);
  box-shadow: 0 10px 20px rgba(0,0,0,.1);
  transition: transform .3s var(--ease);
}
.st-thumb:hover { transform: translateY(-8px) scale(1.05); }
.st-thumb svg { width: 32px; height: 32px; margin-bottom: 6px; }
.st-thumb.t1 { background: linear-gradient(135deg, #F97316, #FB923C); }
.st-thumb.t2 { background: linear-gradient(135deg, #0EA5E9, #38BDF8); }
.st-thumb.t3 { background: linear-gradient(135deg, #10B981, #34D399); }
.st-thumb.t4 { background: linear-gradient(135deg, #8B5CF6, #A78BFA); }

.st-intro-title { font-family: var(--fh); font-size: 36px; font-weight: 900; color: var(--navy); margin-bottom: 16px; letter-spacing: -.02em; }
.st-intro-title span { color: var(--orange); }
.st-intro-desc { font-family: var(--fb); font-size: 18px; color: var(--gray-text); line-height: 1.6; max-width: 600px; margin: 0 auto 40px; }

.st-steps { display: flex; justify-content: center; gap: 30px; margin-bottom: 40px; flex-wrap: wrap; }
.st-step { display: flex; align-items: center; gap: 10px; font-family: var(--fh); font-size: 14px; font-weight: 600; color: var(--navy); }
.st-step-num { width: 28px; height: 28px; border-radius: 50%; background: var(--orange); color: var(--white); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; }

.st-enter-btn {
  display: inline-flex; align-items: center; gap: 12px;
  background: var(--navy); color: var(--white);
  font-family: var(--fh); font-size: 18px; font-weight: 700;
  padding: 18px 48px; border-radius: 100px; border: none; cursor: pointer;
  box-shadow: 0 10px 30px rgba(15,23,42,.3);
  transition: transform .25s var(--ease), background .25s;
}
.st-enter-btn:hover { transform: translateY(-4px); background: var(--orange); }

/* ══════════════════════════════════════
   FILTER BAR (NEW!)
══════════════════════════════════════ */
.st-filter-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
  justify-content: center;
  flex-wrap: wrap;
}
.st-filter-pill {
  padding: 10px 24px;
  border-radius: 100px;
  background: var(--white);
  border: 2px solid var(--gray-light);
  color: var(--navy);
  font-family: var(--fh);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s var(--ease);
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0,0,0,.02);
}
.st-filter-pill:hover {
  border-color: var(--orange);
  color: var(--orange);
  transform: translateY(-2px);
}
.st-filter-pill.active {
  background: var(--orange);
  border-color: var(--orange);
  color: var(--white);
  box-shadow: 0 8px 20px rgba(249,115,22,.3);
}

/* ══════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════ */
.st-wrap { max-width: 1100px; margin: 0 auto; padding: 0 44px; }

.st-header { padding: 120px 0 40px; text-align: center; }
.st-header-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--fb); font-size: 12px; font-weight: 700;
  letter-spacing: .2em; text-transform: uppercase;
  color: var(--orange); margin-bottom: 20px;
  background: rgba(249,115,22,.1); padding: 8px 16px; border-radius: 100px;
}
.st-header-title { font-family: var(--fh); font-size: clamp(42px, 6vw, 72px); font-weight: 900; line-height: 1.05; letter-spacing: -.03em; color: var(--navy); margin-bottom: 20px; }
.st-header-title span { color: var(--orange); }
.st-header-sub { font-family: var(--fb); font-size: 18px; color: var(--gray-text); line-height: 1.7; max-width: 600px; margin: 0 auto; }

/* Worker Grid */
.st-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; margin-bottom: 100px; }
.st-card {
  background: var(--white); border-radius: 24px; padding: 32px 24px; text-align: center;
  border: 2px solid transparent; box-shadow: 0 4px 20px rgba(0,0,0,.04);
  cursor: pointer; transition: transform .4s var(--ease), border-color .3s, box-shadow .3s;
  position: relative; overflow: hidden;
}
.st-card:hover { transform: translateY(-8px); border-color: var(--orange); box-shadow: 0 20px 40px rgba(249,115,22,.15); }
.st-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px; background: var(--navy); transition: background .3s; }
.st-card:hover::before { background: var(--orange); }

.st-avatar {
  width: 100px; height: 100px; border-radius: 50%;
  background: linear-gradient(135deg, var(--navy-light), var(--navy));
  margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;
  color: var(--white); font-family: var(--fh); font-size: 32px; font-weight: 800;
  border: 4px solid var(--white); box-shadow: 0 8px 20px rgba(15,23,42,.2); position: relative;
}
.st-avatar-icon { position: absolute; bottom: -5px; right: -5px; width: 36px; height: 36px; border-radius: 50%; background: var(--orange); color: var(--white); display: flex; align-items: center; justify-content: center; border: 3px solid var(--white); }

.st-card-name { font-family: var(--fh); font-size: 20px; font-weight: 800; color: var(--navy); margin-bottom: 4px; }
.st-card-trade { font-family: var(--fb); font-size: 14px; font-weight: 600; color: var(--orange); margin-bottom: 12px; }
.st-card-exp { font-family: var(--fb); font-size: 12px; color: var(--gray-text); margin-bottom: 20px; }
.st-card-btn { display: inline-flex; align-items: center; gap: 8px; background: var(--gray-light); color: var(--navy); padding: 10px 24px; border-radius: 100px; font-family: var(--fh); font-size: 13px; font-weight: 700; transition: background .2s, color .2s; }
.st-card:hover .st-card-btn { background: var(--navy); color: var(--white); }

/* ══════════════════════════════════════
   PROFILE MODAL
══════════════════════════════════════ */
.st-modal-overlay { position: fixed; inset: 0; z-index: 10000; background: rgba(15,23,42,.8); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 20px; animation: st-fade-up .3s var(--ease) forwards; }
.st-modal { background: var(--white); border-radius: 32px; max-width: 500px; width: 100%; max-height: 90vh; overflow-y: auto; overflow-x: hidden; box-shadow: 0 40px 100px rgba(0,0,0,.5); animation: st-pop-in .4s var(--ease) forwards; }
.st-modal-header { background: linear-gradient(135deg, var(--navy), var(--navy-light)); padding: 40px 32px; text-align: center; position: relative; }
.st-modal-close { position: absolute; top: 20px; right: 20px; width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,.1); border: none; display: flex; align-items: center; justify-content: center; color: var(--white); cursor: pointer; transition: background .2s; }
.st-modal-close:hover { background: rgba(255,255,255,.2); }
.st-modal-avatar { width: 120px; height: 120px; border-radius: 50%; background: var(--orange); color: var(--white); margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-family: var(--fh); font-size: 40px; font-weight: 900; border: 6px solid var(--white); box-shadow: 0 10px 30px rgba(0,0,0,.3); }
.st-modal-name { font-family: var(--fh); font-size: 28px; font-weight: 900; color: var(--white); margin-bottom: 8px; }
.st-modal-trade { font-family: var(--fb); font-size: 16px; font-weight: 600; color: var(--orange-hi); }

.st-modal-body { padding: 32px; }
.st-modal-section-title { font-family: var(--fh); font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--gray-text); margin-bottom: 12px; }
.st-modal-desc { font-family: var(--fb); font-size: 15px; color: var(--navy); line-height: 1.7; margin-bottom: 24px; }
.st-modal-skills { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px; }
.st-skill-tag { background: var(--gray-light); color: var(--navy); padding: 6px 14px; border-radius: 100px; font-family: var(--fb); font-size: 12px; font-weight: 600; }
.st-modal-wa-btn { display: flex; align-items: center; justify-content: center; gap: 12px; width: 100%; padding: 18px; background: #25D366; color: var(--white); border-radius: 16px; border: none; cursor: pointer; font-family: var(--fh); font-size: 16px; font-weight: 700; box-shadow: 0 10px 30px rgba(37,211,102,.3); transition: transform .2s, box-shadow .2s; }
.st-modal-wa-btn:hover { transform: translateY(-3px); box-shadow: 0 15px 40px rgba(37,211,102,.4); }

/* Petition Section */
.st-petition { background: var(--navy); border-radius: 32px; padding: 60px 40px; text-align: center; color: var(--white); margin-bottom: 100px; position: relative; overflow: hidden; }
.st-petition::before { content: ''; position: absolute; top: -50%; right: -20%; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(249,115,22,.2), transparent 70%); }
.st-petition-title { font-family: var(--fh); font-size: 32px; font-weight: 900; margin-bottom: 16px; position: relative; }
.st-petition-desc { font-family: var(--fb); font-size: 16px; color: rgba(255,255,255,.8); max-width: 500px; margin: 0 auto 32px; line-height: 1.7; position: relative; }
.st-petition-btn { display: inline-flex; align-items: center; gap: 10px; background: var(--orange); color: var(--white); padding: 16px 32px; border-radius: 100px; font-family: var(--fh); font-size: 15px; font-weight: 700; box-shadow: 0 10px 30px rgba(249,115,22,.4); transition: transform .25s var(--ease); position: relative; }
.st-petition-btn:hover { transform: translateY(-3px); }

/* ══════════════════════════════════════
   MOBILE RESPONSIVE
══════════════════════════════════════ */
@media(max-width: 768px) {
  .st-wrap { padding: 0 22px; }
  .st-intro { padding: 20px 16px; }
  .st-intro-box { padding: 40px 24px; border-radius: 24px; }
  .st-intro-title { font-size: 28px; }
  .st-intro-desc { font-size: 16px; }
  .st-thumbs { gap: 12px; }
  .st-thumb { width: 70px; height: 70px; font-size: 10px; }
  .st-thumb svg { width: 24px; height: 24px; }
  .st-steps { gap: 16px; }
  .st-step { font-size: 12px; }
  .st-step-num { width: 24px; height: 24px; font-size: 10px; }
  .st-enter-btn { font-size: 16px; padding: 16px 36px; }
  
  .st-header { padding: 100px 0 30px; }
  .st-header-title { font-size: 36px; }
  .st-header-sub { font-size: 16px; }

  /* Mobile Filter Bar - Horizontal Scroll */
  .st-filter-bar { 
    gap: 8px; 
    justify-content: flex-start; 
    overflow-x: auto; 
    flex-wrap: nowrap; 
    padding-bottom: 12px; 
    margin-left: -22px; 
    margin-right: -22px; 
    padding-left: 22px; 
    padding-right: 22px; 
  }
  .st-filter-pill { padding: 8px 18px; font-size: 13px; }
  
  .st-grid { grid-template-columns: 1fr; gap: 16px; }
  .st-card { padding: 24px 20px; }
  .st-avatar { width: 80px; height: 80px; font-size: 28px; }
  .st-avatar-icon { width: 30px; height: 30px; }
  .st-card-name { font-size: 18px; }
  
  .st-petition { padding: 40px 24px; }
  .st-petition-title { font-size: 26px; }
  .st-petition-desc { font-size: 14px; }
  
  .st-modal { max-height: 95vh; border-radius: 24px; }
  .st-modal-header { padding: 32px 24px; }
  .st-modal-avatar { width: 100px; height: 100px; font-size: 32px; }
  .st-modal-name { font-size: 24px; }
  .st-modal-body { padding: 24px; }
}

@media(max-width: 480px) {
  .st-intro-box { padding: 32px 20px; }
  .st-intro-title { font-size: 24px; }
  .st-thumbs { gap: 10px; }
  .st-thumb { width: 60px; height: 60px; font-size: 9px; border-radius: 16px; }
  .st-thumb svg { width: 20px; height: 20px; margin-bottom: 4px; }
  .st-steps { flex-direction: column; gap: 12px; align-items: center; }
  .st-enter-btn { width: 100%; justify-content: center; }
  .st-header-title { font-size: 32px; }
  .st-card-name { font-size: 16px; }
  .st-card-trade { font-size: 13px; }
}
`;

function StyleTag() {
  useEffect(() => {
    if (document.getElementById("st-css-v3")) return;
    const el = document.createElement("style");
    el.id = "st-css-v3"; el.textContent = CSS;
    document.head.prepend(el);
    return () => el.remove();
  }, []);
  return null;
}

const STAFFING_WA = "233542128342"; 

// Notice the new 'category' field added to each worker
const WORKERS = [
  {
    id: 1, category: "Electrical", name: "Kwame Mensah", trade: "Master Electrician", exp: "12 Years Experience",
    initials: "KM", icon: <Zap size={18} />,
    desc: "Kwame handles all types of electrical work. From fixing a simple socket to wiring a whole building, he is safe, fast, and reliable.",
    skills: ["House Wiring", "Fault Finding", "Panel Upgrades", "Emergency Repairs"]
  },
  {
    id: 2, category: "Security", name: "Samuel Osei", trade: "CCTV & Security", exp: "8 Years Experience",
    initials: "SO", icon: <Shield size={18} />,
    desc: "Samuel will install and set up your security cameras and alarms. He makes sure you can watch your home or shop from your phone.",
    skills: ["CCTV Install", "Smart Locks", "Alarm Systems", "Remote Viewing"]
  },
  {
    id: 3, category: "Plumbing", name: "Emmanuel Asante", trade: "Senior Plumber", exp: "15 Years Experience",
    initials: "EA", icon: <Droplets size={18} />,
    desc: "Emmanuel fixes leaks, installs pipes, and sets up water tanks. He does clean work and leaves your place tidy.",
    skills: ["Pipe Fitting", "Leak Detection", "Tank Install", "Bathroom Fittings"]
  },
  {
    id: 4, category: "Maintenance", name: "Michael Tetteh", trade: "Handyman & Carpenter", exp: "9 Years Experience",
    initials: "MT", icon: <Hammer size={18} />,
    desc: "Michael is your go-to guy for fixing things around the house. He builds shelves, fixes doors, and handles general repairs.",
    skills: ["Furniture Assembly", "Door Repair", "Shelving", "General Fixes"]
  },
  {
    id: 5, category: "Maintenance", name: "Daniel Kofi", trade: "Painter & Decorator", exp: "7 Years Experience",
    initials: "DK", icon: <Paintbrush size={18} />,
    desc: "Daniel will paint your house inside and out. He is very neat and helps you pick the right colors to make your place look new.",
    skills: ["Interior Painting", "Exterior Painting", "Wall Finishing", "Color Advice"]
  },
  {
    id: 6, category: "Cleaning", name: "Comfort Anokye", trade: "Head of Cleaning Staff", exp: "10 Years Experience",
    initials: "CA", icon: <Shield size={18} />,
    desc: "Comfort manages our team of home cleaners. If you need a reliable cleaner for your house or office, she will find the perfect person for you.",
    skills: ["Home Cleaning", "Office Staff", "Nannies", "Staff Vetting"]
  }
];

const CATEGORIES = ["All", "Electrical", "Security", "Plumbing", "Maintenance", "Cleaning"];

export default function Staffing() {
  const [introOpen, setIntroOpen] = useState(true);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  // Filter the workers based on the active category
  const filteredWorkers = activeFilter === "All" 
    ? WORKERS 
    : WORKERS.filter(w => w.category === activeFilter);

  const closeIntro = () => {
    const overlay = document.querySelector('.st-intro');
    if (overlay) overlay.classList.add('closing');
    setTimeout(() => setIntroOpen(false), 400);
  };

  const getWaLink = (worker) => {
    const text = `Hello Chapman Prestige, I saw ${worker.name} (${worker.trade}) on your Expert Network page. I would like to hire them. Please tell me the next steps.`;
    return `https://wa.me/${STAFFING_WA}?text=${encodeURIComponent(text)}`;
  };

  const getGeneralWaLink = () => {
    const text = "Hello Chapman Prestige, I need a specialist for a job that is not on your website. Can you help me find someone?";
    return `https://wa.me/${STAFFING_WA}?text=${encodeURIComponent(text)}`;
  };

  return (
    <PageWrapper>
      <StyleTag />
      <Helmet>
        <title>Expert Network | Hire Skilled Professionals - Chapman Prestige</title>
        <meta name="description" content="Need a trusted electrician, plumber, or cleaner? Chapman Prestige connects you with vetted, skilled professionals for your home or business." />
      </Helmet>

      <div className="st">
        {/* Glassmorphic Full-Screen Intro */}
        {introOpen && (
          <div className="st-intro">
            <div className="st-intro-box">
              <div className="st-thumbs">
                <div className="st-thumb t1"><Zap size={32} />Power</div>
                <div className="st-thumb t2"><Shield size={32} />Security</div>
                <div className="st-thumb t3"><Droplets size={32} />Plumbing</div>
                <div className="st-thumb t4"><Hammer size={32} />Repairs</div>
              </div>
              <h2 className="st-intro-title">Need a <span>Trusted Expert?</span></h2>
              <p className="st-intro-desc">
                Looking for a reliable electrician, plumber, or cleaner? We have a network of skilled workers ready to help. Just pick a worker, read what they do, and chat with us to hire them.
              </p>
              <div className="st-steps">
                <div className="st-step"><div className="st-step-num">1</div> Pick a Worker</div>
                <div className="st-step"><div className="st-step-num">2</div> Read Profile</div>
                <div className="st-step"><div className="st-step-num">3</div> Chat & Hire</div>
              </div>
              <button className="st-enter-btn" onClick={closeIntro}>
                See Our Experts <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Main Page */}
        <div className="st-wrap">
          <header className="st-header">
            <div className="st-header-eyebrow">Vetted & Trusted</div>
            <h1 className="st-header-title">
              The <span>Expert Network</span>
            </h1>
            <p className="st-header-sub">
              Don't risk hiring strangers. We supply and manage skilled workers for your home or business. Click on a profile to see what they do.
            </p>
          </header>

          {/*  NEW FILTER BAR */}
          <div className="st-filter-bar">
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                className={`st-filter-pill ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Worker Grid (Now Filtered) */}
          <div className="st-grid">
            {filteredWorkers.map(worker => (
              <div key={worker.id} className="st-card" onClick={() => setSelectedWorker(worker)}>
                <div className="st-avatar">
                  {worker.initials}
                  <div className="st-avatar-icon">{worker.icon}</div>
                </div>
                <div className="st-card-name">{worker.name}</div>
                <div className="st-card-trade">{worker.trade}</div>
                <div className="st-card-exp">{worker.exp}</div>
                <div className="st-card-btn">View Profile</div>
              </div>
            ))}
          </div>

          {/* Petition Section */}
          <section className="st-petition">
            <h2 className="st-petition-title">Need Someone Not Listed?</h2>
            <p className="st-petition-desc">
              We know many more skilled people. If you need a specific job done, just tell us. We will find the right person for you.
            </p>
            <a href={getGeneralWaLink()} target="_blank" rel="noreferrer" className="st-petition-btn">
              <MessageCircle size={20} /> Request a Specialist
            </a>
          </section>
        </div>

        {/* Profile Modal */}
        {selectedWorker && (
          <div className="st-modal-overlay" onClick={() => setSelectedWorker(null)}>
            <div className="st-modal" onClick={(e) => e.stopPropagation()}>
              <div className="st-modal-header">
                <button className="st-modal-close" onClick={() => setSelectedWorker(null)}>
                  <X size={20} />
                </button>
                <div className="st-modal-avatar">{selectedWorker.initials}</div>
                <div className="st-modal-name">{selectedWorker.name}</div>
                <div className="st-modal-trade">{selectedWorker.trade}</div>
              </div>
              <div className="st-modal-body">
                <div className="st-modal-section-title">About {selectedWorker.name.split(' ')[0]}</div>
                <p className="st-modal-desc">{selectedWorker.desc}</p>
                <div className="st-modal-section-title">What They Do</div>
                <div className="st-modal-skills">
                  {selectedWorker.skills.map((skill, i) => (
                    <span key={i} className="st-skill-tag">{skill}</span>
                  ))}
                </div>
                <a href={getWaLink(selectedWorker)} target="_blank" rel="noreferrer" className="st-modal-wa-btn">
                  <MessageCircle size={22} /> Chat to Hire {selectedWorker.name.split(' ')[0]}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}