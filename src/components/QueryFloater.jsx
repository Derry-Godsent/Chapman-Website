import { useState } from "react";
import { MessageSquare, X, Send, MessageCircle, Mail, Phone } from "lucide-react";
import { BUSINESS } from "../config/business.jsx";

function QueryFloater() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSend = () => {
    if (!query.trim()) return;
    
    const payload = `🔍 Quick Query\n\n${query}\n\n🌐 From: ${window.location.href}\n⏰ ${new Date().toLocaleString()}`;
    
    // Safe access with fallbacks
    const emails = BUSINESS.emails || ["kenchapsy@gmail.com"];
    const whatsappNumbers = BUSINESS.whatsappNumbers || ["447459323742"];
    
    // ✅ Broadcast to BOTH WhatsApp numbers
    whatsappNumbers.forEach((num, idx) => {
      setTimeout(() => {
        window.open(`https://wa.me/${num}?text=${encodeURIComponent(payload)}`, '_blank');
      }, idx * 300);
    });
    
    // ✅ Send to BOTH emails
    window.open(`mailto:${emails.join(",")}?subject=Quick Query&body=${encodeURIComponent(payload)}`, '_blank');
    
    setQuery("");
    setOpen(false);
  };

  return (
    <>
      {/* Panel */}
      <div className={`query-panel ${open ? "query-panel-open" : ""}`}>
        <button className="query-panel-close" onClick={() => setOpen(false)} aria-label="Close query panel">
          <X size={16} />
        </button>
        <h3 className="query-panel-title">How can we help?</h3>
        <p className="query-panel-desc">
          Type your question below or choose a direct contact method. We respond within the hour.
        </p>
        
        <div className="query-input-wrap">
          <textarea
            className="query-input"
            placeholder="e.g. Do you offer same-day cleaning? What's the rate for a 3-bedroom apartment?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={3}
          />
          <button className="query-send-btn" onClick={handleSend} disabled={!query.trim()}>
            <Send size={14} /> Send
          </button>
        </div>

        <div className="query-divider" />
        <p className="query-quick-title">Or reach us directly:</p>
        <div className="query-quick-links">
          {/* ✅ WhatsApp - Safe access with fallback */}
          <a 
            href={`https://wa.me/${(BUSINESS.whatsappNumbers?.[0]) || "233542128342"}`} 
            target="_blank" 
            rel="noreferrer" 
            className="query-quick-link query-wa"
          >
            <MessageCircle size={15} /> WhatsApp
          </a>
          {/* ✅ Email - Safe access with fallback */}
          <a 
            href={`mailto:${(BUSINESS.emails?.[0]) || "chapmanprestigeltd1@gmail.com"}`} 
            className="query-quick-link query-email"
          >
            <Mail size={15} /> Email
          </a>
          {/* ✅ Call - Safe access with fallback */}
          <a 
            href={`tel:+${BUSINESS.phoneClean || "233232276648"}`} 
            className="query-quick-link query-call"
          >
            <Phone size={15} /> Call
          </a>
        </div>
      </div>

      {/* Trigger Button */}
      <button
        className={`query-fab ${open ? "query-fab-rotated" : ""}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Ask a question"
      >
        <MessageSquare size={20} />
      </button>
    </>
  );
}

export default QueryFloater;