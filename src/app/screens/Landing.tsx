import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import { EncoreLogo } from '../components/EncoreLogo';

/* ── Orbital geometric illustration ───────────────────────── */
function OrbitalIllustration() {
  return (
    <svg width="270" height="270" viewBox="0 0 280 280" fill="none" aria-hidden="true">
      {/* Concentric rings */}
      <circle cx="140" cy="140" r="130" stroke="#324E58" strokeOpacity="0.06" strokeWidth="1" />
      <circle cx="140" cy="140" r="100" stroke="#324E58" strokeOpacity="0.08" strokeWidth="1" />
      <circle cx="140" cy="140" r="70"  stroke="#324E58" strokeOpacity="0.10" strokeWidth="1" />
      <circle cx="140" cy="140" r="40"  stroke="#324E58" strokeOpacity="0.13" strokeWidth="1" />
      {/* Dashed accent orbit */}
      <circle cx="140" cy="140" r="116" stroke="#6C63FF" strokeOpacity="0.11" strokeWidth="1" strokeDasharray="5 4" />
      {/* Radial grid lines */}
      <line x1="140" y1="10"  x2="140" y2="270" stroke="#324E58" strokeOpacity="0.045" strokeWidth="1" />
      <line x1="10"  y1="140" x2="270" y2="140" stroke="#324E58" strokeOpacity="0.045" strokeWidth="1" />
      <line x1="48"  y1="48"  x2="232" y2="232" stroke="#324E58" strokeOpacity="0.045" strokeWidth="1" />
      <line x1="232" y1="48"  x2="48"  y2="232" stroke="#324E58" strokeOpacity="0.045" strokeWidth="1" />
      {/* Cardinal dots */}
      <circle cx="140" cy="10"  r="3.5" fill="#D4A373" fillOpacity="0.75" />
      <circle cx="270" cy="140" r="3.5" fill="#6C63FF" fillOpacity="0.65" />
      <circle cx="140" cy="270" r="3.5" fill="#324E58" fillOpacity="0.50" />
      <circle cx="10"  cy="140" r="3.5" fill="#D4A373" fillOpacity="0.55" />
      {/* Diagonal accent dots */}
      <circle cx="222" cy="58"  r="2.5" fill="#6C63FF"  fillOpacity="0.40" />
      <circle cx="222" cy="222" r="2.5" fill="#324E58"  fillOpacity="0.32" />
      <circle cx="58"  cy="222" r="2.5" fill="#D4A373"  fillOpacity="0.40" />
      <circle cx="58"  cy="58"  r="2.5" fill="#6C63FF"  fillOpacity="0.35" />
      {/* Inner ring accent dots */}
      <circle cx="140" cy="70"  r="4" fill="#324E58" fillOpacity="0.22" />
      <circle cx="210" cy="140" r="4" fill="#6C63FF"  fillOpacity="0.20" />
      {/* Center mark */}
      <circle cx="140" cy="140" r="6" fill="#324E58" fillOpacity="0.12" />
      <circle cx="140" cy="140" r="3" fill="#324E58" fillOpacity="0.28" />
    </svg>
  );
}

/* ── Feature card ──────────────────────────────────────────── */
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  body: string;
  isQuote?: boolean;
}

function FeatureCard({ icon, title, body, isQuote = false }: FeatureCardProps) {
  return (
    <div
      style={{
        padding: '22px 20px',
        borderRadius: 20,
        background: 'rgba(255,255,255,0.74)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(85,95,113,0.09)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 13,
          background: 'rgba(50,78,88,0.07)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 14,
        }}
      >
        {icon}
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1C1B', marginBottom: 8, letterSpacing: '-0.1px' }}>
        {title}
      </div>
      <p
        style={{
          fontSize: 14,
          color: isQuote ? '#324E58' : '#555F71',
          lineHeight: 1.68,
          fontStyle: isQuote ? 'italic' : 'normal',
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  );
}

/* ── Main component ────────────────────────────────────────── */
export function Landing() {
  const navigate = useNavigate();
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ background: '#F9F9F7', minHeight: '100%' }}>

      {/* ── NAV ────────────────────────────────────────────────── */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '13px 20px',
          background: 'rgba(249,249,247,0.9)',
          backdropFilter: 'blur(18px)',
          borderBottom: '1px solid rgba(50,78,88,0.07)',
        }}
      >
        <EncoreLogo iconSize={30} compact showWordmark wordmarkSize={16} wordmarkColor="#1A1C1B" />
        <button
          onClick={() => navigate('/onboarding')}
          style={{
            padding: '8px 22px',
            borderRadius: 50,
            background: '#324E58',
            color: 'white',
            fontSize: 14,
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(50,78,88,0.25)',
          }}
        >
          Join
        </button>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section style={{ padding: '48px 24px 32px' }}>
        {/* Eyebrow pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            padding: '5px 13px',
            borderRadius: 50,
            background: 'rgba(108,99,255,0.07)',
            border: '1px solid rgba(108,99,255,0.18)',
            marginBottom: 24,
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6C63FF', flexShrink: 0 }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#6C63FF', letterSpacing: '0.09em', textTransform: 'uppercase' as const }}>
            A Bridge for Wisdom
          </span>
        </div>

        <h1
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: '#1A1C1B',
            lineHeight: 1.15,
            letterSpacing: '-0.9px',
            marginBottom: 20,
          }}
        >
          Retirement should not feel like disappearance.
        </h1>

        <p style={{ fontSize: 16, color: '#555F71', lineHeight: 1.72, marginBottom: 36 }}>
          A lifetime of experience is a civic asset. Connect, guide, and remain essential in a sanctuary built on the profound dignity of your experience.
        </p>

        {/* Primary CTA */}
        <button
          onClick={() => navigate('/onboarding')}
          style={{
            width: '100%',
            padding: '17px 24px',
            borderRadius: 50,
            background: '#324E58',
            color: 'white',
            fontSize: 16,
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 12,
            minHeight: 54,
            boxShadow: '0 6px 20px rgba(50,78,88,0.30)',
          }}
        >
          Begin Your Continuity
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>

        {/* Secondary CTA */}
        <button
          onClick={scrollToFeatures}
          style={{
            width: '100%',
            padding: '16px 24px',
            borderRadius: 50,
            background: 'transparent',
            color: '#324E58',
            fontSize: 15,
            fontWeight: 500,
            border: '1.5px solid rgba(50,78,88,0.22)',
            cursor: 'pointer',
            minHeight: 54,
          }}
        >
          Seek Quiet Intelligence
        </button>
      </section>

      {/* ── ORBITAL ILLUSTRATION ───────────────────────────────── */}
      <section style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 32px' }}>
        <OrbitalIllustration />
      </section>

      {/* ── LIVING LIBRARY ─────────────────────────────────────── */}
      <section style={{ padding: '8px 24px 52px' }}>
        {/* Section label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 22,
            paddingBottom: 18,
            borderBottom: '1px solid rgba(85,95,113,0.1)',
          }}
        >
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#555F71' }}>
            The Living Library
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(85,95,113,0.1)' }} />
        </div>

        <h2
          style={{
            fontSize: 31,
            fontWeight: 800,
            color: '#1A1C1B',
            lineHeight: 1.18,
            letterSpacing: '-0.6px',
            marginBottom: 16,
          }}
        >
          Expertise as a<br />Civic Asset.
        </h2>

        <p style={{ fontSize: 15, color: '#555F71', lineHeight: 1.72, marginBottom: 32 }}>
          We are not a gig platform. We are a curated sanctuary where decades of nuance, resilience, and tacit knowledge are recognised as essential resources for the next generation.
        </p>

        {/* Feature cards — rendered inline so no module-level JSX */}
        <div ref={featuresRef} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <FeatureCard
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#324E58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6" />
                <path d="M2.5 22v-6h6" />
                <path d="M22 13a10 10 0 0 1-18.7 4" />
                <path d="M2 11a10 10 0 0 1 18.7-4" />
              </svg>
            }
            title="Meaningful Continuity"
            body="Engage in profound, high-leverage conversations tailored to your pace. Share insights without the noise of traditional networking."
          />
          <FeatureCard
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#324E58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            }
            title="Wisdom does not retire"
            body="It simply seeks a new vessel. Connect with those actively seeking the perspective only experience provides."
          />
          <FeatureCard
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#324E58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            }
            title="Seeking Perspective"
            body='"Navigating a complex pivot. Looking for a steady hand who has weathered organisational shifts before…"'
            isQuote
          />
        </div>
      </section>

      {/* ── BOTTOM CTA BAND ────────────────────────────────────── */}
      <section
        style={{
          padding: '52px 24px 56px',
          background: 'linear-gradient(180deg, rgba(50,78,88,0.04) 0%, rgba(50,78,88,0.09) 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -30, left: -30, width: 130, height: 130, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,163,115,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <h2
          style={{
            fontSize: 33,
            fontWeight: 800,
            color: '#1A1C1B',
            lineHeight: 1.18,
            letterSpacing: '-0.7px',
            marginBottom: 16,
          }}
        >
          Your next chapter is vital.
        </h2>

        <p style={{ fontSize: 16, color: '#555F71', lineHeight: 1.7, marginBottom: 34 }}>
          Join a community that understands the profound value of what you have built. Step into the light.
        </p>

        <button
          onClick={() => navigate('/onboarding')}
          style={{
            width: '100%',
            padding: '17px 24px',
            borderRadius: 50,
            background: '#324E58',
            color: 'white',
            fontSize: 17,
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            minHeight: 54,
            boxShadow: '0 6px 22px rgba(50,78,88,0.32)',
          }}
        >
          Begin Your Encore
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer
        style={{
          padding: '32px 24px 44px',
          borderTop: '1px solid rgba(85,95,113,0.1)',
          background: '#F9F9F7',
        }}
      >
        <div style={{ marginBottom: 6 }}>
          <EncoreLogo iconSize={34} compact showWordmark wordmarkSize={15} wordmarkColor="#1A1C1B" />
        </div>
        <p style={{ fontSize: 12, color: '#555F71', letterSpacing: '0.04em', marginBottom: 28 }}>
          Dignity. Continuity. Belonging.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {['Our Philosophy', 'Sanctuary Guidelines', 'Privacy'].map((link) => (
            <a
              key={link}
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                fontSize: 14,
                color: '#555F71',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(85,95,113,0.1)',
                padding: '14px 0',
                display: 'block',
              }}
            >
              {link}
            </a>
          ))}
        </div>

        <p style={{ fontSize: 11, color: 'rgba(85,95,113,0.45)', lineHeight: 1.5, marginTop: 28 }}>
          © Encore. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
