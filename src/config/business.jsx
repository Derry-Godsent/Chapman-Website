// src/config/business.jsx
import { Building2, Home, Sparkles, ShieldCheck, Truck, Phone } from "lucide-react";

export const BUSINESS = {
  name: "Chapman Prestige Limited",
  shortName: "Chapman Prestige Limited",
  tagline: "Cleaning · Laundry · Sanitation",
  
  // Emails - BOTH receive messages (ARRAY)
  emails: ["chapmanprestigelimited@gmail.com", "kenchapsy@gmail.com"],
  
  // Phone - ONE number for calls
  phone: "233534134809",
  phoneClean: "233534134809", // For tel: links (no spaces)
  
  // WhatsApp - BOTH numbers receive messages (ARRAY)
  whatsappNumbers: ["447459323742", "233542128342"],
  
  location: "Kwadaso-Ohwimase, Kumasi, Ghana",
  
  // Helper getters for clean links
  get whatsappUrl() {
    return `https://wa.me/${this.whatsappNumbers?.[0] || "447459323742"}`;
  },
  get mailtoUrl() {
    return `mailto:${this.emails?.[0] || "kenchapsy@gmail.com"}`;
  },
  get telUrl() {
    return `tel:+${this.phoneClean}`;
  }
};

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/team", label: "Team" },
  { to: "/careers", label: "Careers" },
];

export const TIMELINE = [
  { year:"2016", text:"Founded in Kwadaso-Ohwimase, Kumasi, with a vision to bring professional laundry and cleaning services to households and small businesses across the region." },
  { year:"2017", text:"Expanded into corporate and healthcare sectors. Signed first institutional contracts with hospitals and financial institutions in the Ashanti Region." },
  { year:"2021", text:"Launched fumigation and pest control services. Team grew and service coverage expanded across Greater Kumasi." },
  { year:"2024+", text:"Now serving 500+ clients: Hospitals, Banks, Corporate offices, and Private homes, with a fully trained team dedicated to excellence." },
];

export const CLIENTS = ["St Martins Hospital", "Nuben Court", "Star Assurance"];

export const SERVICES_LIST = [
  { icon: <Building2 size={19}/>, title: "Office & Corporate Cleaning", desc: "Daily and scheduled deep-cleaning for offices, banks, and corporate environments, keeping your brand sharp and your team focused." },
  { icon: <Home size={19}/>, title: "Healthcare Cleaning", desc: "Specialised infection-control cleaning for hospitals and clinics, meeting strict sanitation protocols to protect patients and staff." },
  { icon: <Sparkles size={19}/>, title: "Laundry Services", desc: "Professional washing, ironing, and fabric care for uniforms, linens, and garments: returned crisp, on schedule, every time." },
  { icon: <ShieldCheck size={19}/>, title: "Fumigation & Pest Control", desc: "Safe, approved pest elimination for homes and businesses with lasting results and minimal disruption." },
  { icon: <Truck size={19}/>, title: "Post-Construction Cleaning", desc: "Comprehensive deep cleaning of newly built or renovated buildings, handed over spotless and ready for occupation." },
  { icon: <Phone size={19}/>, title: "Poly-Tank & Deep Cleaning", desc: "Water tank sanitation and full deep-cleaning services ensuring every surface meets health and safety standards." },
];