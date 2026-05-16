import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { opportunities } from '../data';

export function OpportunityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const opp = opportunities.find((o) => o.id === id) ?? opportunities[0];
  const [interested, setInterested] = useState(false);
  const [toast, setToast] = useState(false);

  const handleInterested = () => {
    setInterested(true);
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <div
      className="encore-slidein encore-scroll"
      style={{
        minHeight: '100%',
        background: '#F9F9F7',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      {/* Map placeholder with gradient */}
      <div
        style={{
          position: 'relative',
          height: 220,
          background: opp.cardGradient,
          flexShrink: 0,
        }}
      >
        {/* Subtle map grid overlay */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12 }}
          viewBox="0 0 400 220"
          preserveAspectRatio="xMidYMid slice"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 30} x2="400" y2={i * 30} stroke="white" strokeWidth="1" />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 30} y1="0" x2={i * 30} y2="220" stroke="white" strokeWidth="1" />
          ))}
          {/* Roads */}
          <line x1="0" y1="110" x2="400" y2="110" stroke="white" strokeWidth="3" opacity="0.4" />
          <line x1="200" y1="0" x2="200" y2="220" stroke="white" strokeWidth="3" opacity="0.4" />
          <line x1="0" y1="60" x2="400" y2="80" stroke="white" strokeWidth="2" opacity="0.3" />
        </svg>

        {/* Map pin */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -60%)',
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50% 50% 50% 0',
              background: 'white',
              transform: 'rotate(-45deg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
            }}
          >
            <div
              style={{
                transform: 'rotate(45deg)',
                color: opp.accentColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
          </div>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.2)',
              margin: '0 auto',
              marginTop: 2,
            }}
          />
        </div>

        {/* Back button */}
        <button
          onClick={() => navigate('/home')}
          style={{
            position: 'absolute',
            top: 52,
            left: 20,
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.3)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Type badge */}
        <div
          style={{
            position: 'absolute',
            bottom: 16,
            left: 20,
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: 50,
            background: 'rgba(255,255,255,0.22)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: 'white',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.5px',
          }}
        >
          {opp.type.toUpperCase()}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 24px 0', flex: 1 }}>
        {/* Title & org */}
        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: '#1A1C1B',
            marginBottom: 4,
            letterSpacing: '-0.3px',
            lineHeight: 1.25,
          }}
        >
          {opp.title}
        </h1>
        <div style={{ fontSize: 15, color: '#555F71', marginBottom: 20 }}>
          {opp.organization}
        </div>

        {/* Quick facts grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
            marginBottom: 22,
          }}
        >
          {[
            { label: 'Type', value: opp.type, icon: '🏷' },
            { label: 'Time', value: opp.timeCommitment, icon: '⏱' },
            { label: 'Location', value: opp.distance, icon: '📍' },
            { label: 'Participants', value: opp.participants, icon: '👥' },
          ].map((fact) => (
            <div
              key={fact.label}
              style={{
                padding: '12px 14px',
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(85,95,113,0.1)',
                borderRadius: 14,
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              }}
            >
              <div style={{ fontSize: 12, color: '#555F71', marginBottom: 3 }}>{fact.label}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1C1B' }}>
                {fact.icon} {fact.value}
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1C1B', marginBottom: 8 }}>
            What's needed
          </div>
          <p style={{ fontSize: 15, color: '#555F71', lineHeight: 1.65 }}>{opp.description}</p>
        </div>

        {/* Why This for You panel */}
        <div
          style={{
            background: 'rgba(108,99,255,0.06)',
            border: '1px solid rgba(108,99,255,0.2)',
            borderRadius: 20,
            padding: '18px 20px',
            marginBottom: 24,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6C63FF, #8B82FF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1C1B' }}>Why This for You</div>
              <div style={{ fontSize: 12, color: '#6C63FF' }}>AI reasoning — you're always in control</div>
            </div>
          </div>
          <p style={{ fontSize: 14, color: '#555F71', lineHeight: 1.65 }}>{opp.whyThis}</p>
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{ padding: '0 24px 40px' }}>
        <button
          onClick={handleInterested}
          disabled={interested}
          style={{
            width: '100%',
            padding: '17px 24px',
            borderRadius: 50,
            background: interested ? '#324E58' : '#324E58',
            color: 'white',
            fontSize: 17,
            fontWeight: 600,
            border: 'none',
            cursor: interested ? 'default' : 'pointer',
            marginBottom: 12,
            minHeight: 54,
            boxShadow: interested ? 'none' : '0 4px 16px rgba(50,78,88,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'all 0.2s ease',
          }}
        >
          {interested ? (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Request Sent ✓
            </>
          ) : (
            "I'm Interested"
          )}
        </button>
        <p
          style={{
            textAlign: 'center',
            fontSize: 13,
            color: '#555F71',
            lineHeight: 1.5,
          }}
        >
          No commitment yet.{' '}
          <span style={{ fontStyle: 'italic' }}>Just a respectful ping.</span>
        </p>
      </div>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: 88,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#1A1C1B',
            color: 'white',
            padding: '12px 20px',
            borderRadius: 50,
            fontSize: 14,
            fontWeight: 500,
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            zIndex: 100,
            whiteSpace: 'nowrap',
            animation: 'encore-fadein 0.3s ease',
          }}
        >
          ✓ Request sent to {opp.organization}
        </div>
      )}
    </div>
  );
}
