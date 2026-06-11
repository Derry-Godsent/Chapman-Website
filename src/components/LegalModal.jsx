import { useEffect } from "react";
import { X } from "lucide-react";

const CSS = `
@keyframes lm-fade { from{opacity:0} to{opacity:1} }
@keyframes lm-pop { from{opacity:0;transform:scale(.95) translateY(10px)} to{opacity:1;transform:scale(1) translateY(0)} }

.lm-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(17,24,39,.6);
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  display: grid; place-items: center; padding: 24px;
  animation: lm-fade .25s ease forwards;
}
.lm-modal {
  position: relative; width: 100%; max-width: 640px;
  background: #fff; border-radius: 24px; padding: 40px 36px;
  max-height: 85vh; overflow-y: auto;
  box-shadow: 0 30px 80px rgba(0,0,0,.2);
  animation: lm-pop .3s cubic-bezier(.16,1,.3,1) forwards;
  border: 1px solid #E5E7EB;
}
.lm-close {
  position: absolute; top: 20px; right: 20px;
  width: 36px; height: 36px; border-radius: 50%;
  background: #F3F4F6; border: none;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: #6B7280;
  transition: background .2s, color .2s;
}
.lm-close:hover { background: #E5E7EB; color: #111827; }

.lm-title {
  font-family: 'Outfit', system-ui, sans-serif;
  font-size: 28px; font-weight: 800; color: #111827;
  letter-spacing: -.03em; margin-bottom: 8px;
}
.lm-updated {
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 13px; color: #6B7280; margin-bottom: 32px;
}
.lm-content {
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 15px; color: #374151; line-height: 1.8;
}
.lm-content h3 {
  font-family: 'Outfit', system-ui, sans-serif;
  font-size: 18px; font-weight: 700; color: #111827;
  margin: 28px 0 12px; letter-spacing: -.01em;
}
.lm-content h3:first-child { margin-top: 0; }
.lm-content p { margin-bottom: 16px; }
.lm-content ul { padding-left: 20px; margin-bottom: 16px; }
.lm-content li { margin-bottom: 8px; }

/* Custom scrollbar for modal */
.lm-modal::-webkit-scrollbar { width: 6px; }
.lm-modal::-webkit-scrollbar-track { background: transparent; }
.lm-modal::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 6px; }
.lm-modal::-webkit-scrollbar-thumb:hover { background: #9CA3AF; }

@media(max-width: 600px) {
  .lm-modal { padding: 32px 24px; border-radius: 20px; }
  .lm-title { font-size: 24px; }
}
`;

function StyleTag() {
  useEffect(() => {
    if (document.getElementById("lm-css")) return;
    const el = document.createElement("style");
    el.id = "lm-css"; el.textContent = CSS;
    document.head.prepend(el);
    return () => el.remove();
  }, []);
  return null;
}

const PRIVACY_TEXT = `
  <h3>1. Information We Collect</h3>
  <p>When you use our website or request a service, we may collect personal information such as your name, phone number, email address, and physical location. This information is collected through our contact forms, WhatsApp interactions, and phone calls.</p>

  <h3>2. How We Use Your Information</h3>
  <p>We use your personal information strictly to:</p>
  <ul>
    <li>Process and fulfill your cleaning, laundry, or fumigation service requests.</li>
    <li>Communicate with you regarding quotes, scheduling, and service updates.</li>
    <li>Send you relevant updates about Chapman Prestige Limited (only if you opt-in).</li>
    <li>Improve our website and customer service experience.</li>
  </ul>

  <h3>3. Data Sharing & Third Parties</h3>
  <p>We do not sell, trade, or rent your personal information to third parties. We may share necessary details with our on-site staff or logistics partners solely to deliver your requested service.</p>

  <h3>4. Data Security</h3>
  <p>We implement reasonable security measures to protect your personal data from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure.</p>

  <h3>5. Your Rights</h3>
  <p>You have the right to request access to, correction of, or deletion of your personal data at any time. To exercise these rights, please contact us at <strong>chapmanprestigeltd1@gmail.com or kenchapsy@gmail.com</strong>.</p>

  <h3>6. Contact Us</h3>
  <p>If you have any questions about this Privacy Policy, please reach out to us via WhatsApp at <strong>+233 54 212 8342</strong> or email us at <strong>chapmanprestigeltd1@gmail.com / kenchapsy@gmail.com </strong>.</p>
`;

const TERMS_TEXT = `
  <h3>1. Acceptance of Terms</h3>
  <p>By accessing our website or using the services of Chapman Prestige Limited ("we", "us", "our"), you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>

  <h3>2. Services Provided</h3>
  <p>We provide professional cleaning, laundry, fumigation, and sanitation services. Specific service details, scope, and deliverables are agreed upon during the quoting and booking process.</p>

  <h3>3. Booking and Pricing</h3>
  <ul>
    <li><strong>Quotes:</strong> All service quotes are valid for 14 days from the date of issue unless otherwise stated.</li>
    <li><strong>Payment:</strong> Payment terms (e.g., upfront, upon completion, or monthly for corporate clients) will be clearly communicated before service commencement.</li>
    <li><strong>Cancellations:</strong> We request at least 24 hours' notice for cancellations. Late cancellations may incur a fee to cover logistical costs.</li>
  </ul>

  <h3>4. Client Responsibilities</h3>
  <p>To ensure the best results, clients are expected to provide safe access to the premises, secure pets, and clearly communicate any specific areas of concern or fragile items prior to the service.</p>

  <h3>5. Limitation of Liability</h3>
  <p>While we take extreme care with your property, Chapman Prestige Limited is not liable for pre-existing damages, wear and tear, or damages to items not disclosed as fragile prior to service. Our liability for any service-related damage is limited to the cost of the specific service rendered.</p>

  <h3>6. Intellectual Property</h3>
  <p>All content on this website, including text, graphics, logos, and images, is the property of Chapman Prestige Limited and is protected by Ghanaian and international copyright laws.</p>

  <h3>7. Changes to Terms</h3>
  <p>We reserve the right to update these Terms of Service at any time. Changes will be posted on this page with an updated revision date.</p>

  <h3>8. Contact Information</h3>
  <p>For any questions regarding these Terms, please contact us at:</p>
  <ul>
    <li><strong>Email:</strong> chapmanprestigeltd1@gmail.com or kenchapsy@gmail.com </li>
    <li><strong>Phone/WhatsApp:</strong> +233 54 212 8342 / +233 23 227 6648</li>
    <li><strong>Location:</strong> Kwadaso-Ohwimase, Kumasi, Ashanti Region, Ghana</li>
  </ul>
`;

export default function LegalModal({ type, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const isPrivacy = type === "privacy";
  const title = isPrivacy ? "Privacy Policy" : "Terms of Service";
  const content = isPrivacy ? PRIVACY_TEXT : TERMS_TEXT;

  return (
    <>
      <StyleTag />
      <div className="lm-overlay" onClick={onClose}>
        <div className="lm-modal" onClick={(e) => e.stopPropagation()}>
          <button className="lm-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
          
          <h2 className="lm-title">{title}</h2>
          <p className="lm-updated">Last updated: June 2026</p>
          
          <div 
            className="lm-content" 
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        </div>
      </div>
    </>
  );
}