import { X } from "lucide-react";

export default function LegalModal({ type, onClose }) {
  const content = {
    privacy: `
      <h3>Privacy Policy</h3>
      <p><strong>Effective Date:</strong> ${new Date().toLocaleDateString()}</p>
      <p>Chapman Prestige Limited ("we", "our", "us") is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information when you use our website and services.</p>
      
      <h4>1. Information We Collect</h4>
      <p>We may collect personal information you provide directly, such as your name, phone number, email address, and service requirements when you contact us or request a quote.</p>
      
      <h4>2. How We Use Your Information</h4>
      <p>We use your information to: provide and improve our services; communicate with you about your requests; send service updates or promotional materials (with your consent); and comply with legal obligations.</p>
      
      <h4>3. Data Security</h4>
      <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, or disclosure.</p>
      
      <h4>4. Third-Party Sharing</h4>
      <p>We do not sell or rent your personal information. We may share data with trusted service providers who assist us in operating our business, subject to confidentiality agreements.</p>
      
      <h4>5. Your Rights</h4>
      <p>You have the right to access, correct, or delete your personal information. To exercise these rights, contact us at chapmanprestigelimited@gmail.com.</p>
      
      <h4>6. Contact Us</h4>
      <p>Questions about this policy? Reach us at:<br/>
      📧 chapmanprestigelimited@gmail.com<br/>
      📞 0232276648<br/>
      📍 Kwadaso-Ohwimase, Kumasi, Ghana</p>
    `,
    terms: `
      <h3>Terms of Service</h3>
      <p><strong>Effective Date:</strong> ${new Date().toLocaleDateString()}</p>
      
      <h4>1. Acceptance of Terms</h4>
      <p>By accessing or using Chapman Prestige Limited's website and services, you agree to be bound by these Terms of Service. If you disagree with any part, please discontinue use.</p>
      
      <h4>2. Services</h4>
      <p>We provide professional cleaning, laundry, fumigation, and sanitation services. Service details, pricing, and scheduling are confirmed upon booking. We reserve the right to modify service offerings at any time.</p>
      
      <h4>3. Booking & Cancellation</h4>
      <p>Bookings are confirmed upon receipt of your request and our written confirmation. Cancellations made less than 24 hours before scheduled service may incur a fee. We reserve the right to reschedule due to weather, staffing, or safety concerns.</p>
      
      <h4>4. Payment</h4>
      <p>Payment terms are specified at booking. We accept mobile money, bank transfer, and cash. Outstanding balances may affect future service eligibility.</p>
      
      <h4>5. Liability</h4>
      <p>While we take reasonable care with your property, Chapman Prestige Limited is not liable for pre-existing damage, items of extraordinary value not declared in advance, or circumstances beyond our reasonable control.</p>
      
      <h4>6. Governing Law</h4>
      <p>These terms are governed by the laws of Ghana. Any disputes shall be resolved in the courts of the Ashanti Region.</p>
      
      <h4>7. Contact</h4>
      <p>Questions about these terms? Contact us at:<br/>
      📧 chapmanprestigelimited@gmail.com<br/>
      📞 0232276648</p>
    `
  };

  return (
    <div className="legal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="legal-card" onClick={e => e.stopPropagation()}>
        <button className="legal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
        <div 
          className="legal-content"
          dangerouslySetInnerHTML={{ __html: content[type] || "<p>Loading...</p>" }} 
        />
      </div>
    </div>
  );
}