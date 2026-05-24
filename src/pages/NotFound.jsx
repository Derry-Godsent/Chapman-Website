import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { Helmet } from "react-helmet-async";


function NotFound() {
  return (
    <PageWrapper>
      <Helmet>
  <title>Page Not Found | Chapman Prestige Limited</title>
  <meta name="description" content="Laundry, fumigation, car detailing, and deep cleaning services for homes, offices, and institutions in Kumasi." />
  <link rel="canonical" href="https://yourdomain.com/services" />
</Helmet>
      <div style={{ 
        minHeight: "calc(100vh - 72px)", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center", 
        padding: "40px", 
        textAlign: "center", 
        background: "#09090b", 
        color: "#fff", 
        fontFamily: "'DM Sans',system-ui,sans-serif" 
      }}>
        <div style={{ 
          fontFamily: "'Outfit',system-ui,sans-serif", 
          fontSize: "clamp(120px,20vw,240px)", 
          fontWeight: 900, 
          color: "rgba(255,255,255,.06)", 
          lineHeight: 1, 
          letterSpacing: "-0.05em" 
        }}>404</div>
        <h1 style={{ 
          fontFamily: "'Outfit',system-ui,sans-serif", 
          fontSize: "clamp(28px,4vw,48px)", 
          fontWeight: 800, 
          color: "rgba(255,255,255,.9)", 
          letterSpacing: "-0.02em", 
          marginTop: -40, 
          marginBottom: 16 
        }}>Page Not Found</h1>
        <p style={{ 
          color: "rgba(255,255,255,.5)", 
          maxWidth: 400, 
          lineHeight: 1.7, 
          marginBottom: 36 
        }}>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" style={{ 
          display: "inline-flex", 
          padding: "14px 32px", 
          background: "#fff", 
          color: "#09090b", 
          borderRadius: 14, 
          fontWeight: 700, 
          fontFamily: "'Outfit',system-ui,sans-serif", 
          textDecoration: "none", 
          transition: "transform .3s cubic-bezier(.16,1,.3,1)" 
        }}>Back to Home</Link>
      </div>
    </PageWrapper>
  );
}

export default NotFound;