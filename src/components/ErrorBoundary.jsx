import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          minHeight: "100vh", 
          background: "#09090b", 
          color: "#fff", 
          fontFamily: "'DM Sans',system-ui,sans-serif", 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center", 
          padding: "40px", 
          textAlign: "center" 
        }}>
          <h1 style={{ 
            fontFamily: "'Outfit',system-ui,sans-serif", 
            fontSize: "clamp(40px,6vw,72px)", 
            fontWeight: 900, 
            letterSpacing: "-0.04em", 
            marginBottom: 16 
          }}>Something went wrong.</h1>
          <p style={{ color: "rgba(255,255,255,.5)", marginBottom: 32, maxWidth: 400 }}>
            We're sorry for the inconvenience. Please refresh or return home.
          </p>
          <Link to="/" style={{ 
            display: "inline-flex", 
            padding: "14px 28px", 
            background: "#fff", 
            color: "#09090b", 
            borderRadius: 12, 
            fontWeight: 700, 
            fontFamily: "'Outfit',system-ui,sans-serif", 
            textDecoration: "none" 
          }}>Go Home</Link>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;