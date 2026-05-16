import React, { useState } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Suggestion {
  id: string;
  opportunity: string;
  org: string;
  neighbourhood: string;
  distance: string;
  travelTime: string;
  gradient: string;
  icon: string;
  matchSkill: string;
  matchNeed: string;
  aiReason: string;
  mapAccent: string;
  mapDot: string;
  homeX: number;
  homeY: number;
  destX: number;
  destY: number;
  confidence: number;
  status: string;
  statusColor: string;
  statusBg: string;
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const SUGGESTIONS: Suggestion[] = [
  {
    id: '1',
    opportunity: 'Guide a Robotics Team',
    org: 'Sunrise STEM School',
    neighbourhood: 'Siliguri',
    distance: '1.2 km',
    travelTime: '14 min walk',
    gradient: 'linear-gradient(135deg, #2A4A54 0%, #3E7B8C 100%)',
    icon: '🎓',
    matchSkill: 'Systems Design',
    matchNeed: 'Structural thinking',
    aiReason:
      "The Robotics team at Sunrise has been stuck at the same prototype stage for weeks — not from lack of effort, but because they can't yet see the whole system. Your decades in Systems Design bridge exactly that gap. I also noticed you tend to be near Aundh on weekday mornings, so the timing and location feel like a natural fit rather than an obligation.",
    mapAccent: '#3E7B8C',
    mapDot: '#D4A373',
    homeX: 22, homeY: 20,
    destX: 98, destY: 62,
    confidence: 94,
    status: 'New match',
    statusColor: '#6C63FF',
    statusBg: 'rgba(108,99,255,0.09)',
  },
  {
    id: '2',
    opportunity: 'Young Entrepreneurs Circle',
    org: 'YEC',
    neighbourhood: 'YEC Siliguri',
    distance: '3.4 km',
    travelTime: '8 min by auto',
    gradient: 'linear-gradient(135deg, #5B21B6 0%, #A78BFA 100%)',
    icon: '💡',
    matchSkill: 'Leadership & Ops',
    matchNeed: 'Team-building wisdom',
    aiReason:
      "This circle has six founders all under 30, each wrestling with their first real team challenge. Your leadership era — especially the operations work — maps directly onto where they are right now. They don't need theory. They need someone who has already made the mistakes, learned from them, and can talk about both with honesty.",
    mapAccent: '#8B7FFF',
    mapDot: '#6C63FF',
    homeX: 28, homeY: 16,
    destX: 105, destY: 58,
    confidence: 87,
    status: 'Strong match',
    statusColor: '#0E9A6E',
    statusBg: 'rgba(14,154,110,0.1)',
  },
  {
    id: '3',
    opportunity: 'Music Appreciation Sessions',
    org: 'Siliguri Community Hall',
    neighbourhood: 'Siliguri',
    distance: '2.1 km',
    travelTime: '22 min walk',
    gradient: 'linear-gradient(135deg, #C4834A 0%, #D4A373 100%)',
    icon: '🎵',
    matchSkill: 'Classical music love',
    matchNeed: 'Lived musical depth',
    aiReason:
      "The host isn't looking for a music teacher — they want someone who genuinely loves the structure and story behind classical music. You mentioned it on your profile, almost as an aside. I thought: this is a place where Arun might go to give, but probably also to receive something. That felt worth suggesting — not every match has to be about expertise.",
    mapAccent: '#D4A373',
    mapDot: '#C4834A',
    homeX: 18, homeY: 28,
    destX: 88, destY: 66,
    confidence: 79,
    status: 'Gentle match',
    statusColor: '#D4A373',
    statusBg: 'rgba(212,163,115,0.12)',
  },
];

// ── Mini map SVG ──────────────────────────────────────────────────────────────

function MiniMap({
  accent, dot, homeX, homeY, destX, destY,
}: {
  accent: string; dot: string;
  homeX: number; homeY: number;
  destX: number; destY: number;
}) {
  // Midpoint for route bend
  const midX = homeX + (destX - homeX) * 0.45;
  const midY = destY;

  return (
    <svg
      viewBox="0 0 130 84"
      width="130"
      height="84"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', borderRadius: 14, flexShrink: 0 }}
    >
      {/* Background */}
      <rect width="130" height="84" fill="#EDF3F4" />

      {/* Street grid – horizontal roads */}
      <rect x="0" y="27" width="130" height="5" fill="white" opacity="0.75" />
      <rect x="0" y="56" width="130" height="4" fill="white" opacity="0.7" />

      {/* Street grid – vertical roads */}
      <rect x="36" y="0" width="4" height="84" fill="white" opacity="0.7" />
      <rect x="86" y="0" width="5" height="84" fill="white" opacity="0.7" />

      {/* City blocks */}
      <rect x="2"  y="2"  width="32" height="23" rx="3" fill="white" opacity="0.55" />
      <rect x="42" y="2"  width="42" height="23" rx="3" fill="white" opacity="0.55" />
      <rect x="93" y="2"  width="35" height="23" rx="3" fill="white" opacity="0.55" />
      <rect x="2"  y="34" width="32" height="20" rx="3" fill="white" opacity="0.5" />
      <rect x="42" y="34" width="42" height="20" rx="3" fill={accent} opacity="0.07" />
      <rect x="93" y="34" width="35" height="20" rx="3" fill="white" opacity="0.5" />
      <rect x="2"  y="62" width="32" height="20" rx="3" fill="white" opacity="0.4" />
      <rect x="42" y="62" width="42" height="20" rx="3" fill="white" opacity="0.4" />
      <rect x="93" y="62" width="35" height="20" rx="3" fill="white" opacity="0.4" />

      {/* Route: L-shaped dashed path */}
      <polyline
        points={`${homeX},${homeY} ${midX},${homeY} ${midX},${midY} ${destX},${destY}`}
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
        strokeDasharray="3.5 2.5"
        opacity="0.55"
        strokeLinejoin="round"
      />

      {/* Home marker */}
      <circle cx={homeX} cy={homeY} r="5.5" fill="#324E58" />
      <circle cx={homeX} cy={homeY} r="2.5" fill="white" />

      {/* Destination pulse rings */}
      <circle cx={destX} cy={destY} r="11" fill={dot} opacity="0.12" />
      <circle cx={destX} cy={destY} r="7.5" fill={dot} opacity="0.2" />

      {/* Destination pin */}
      <circle cx={destX} cy={destY} r="5.5" fill={dot} />
      <circle cx={destX} cy={destY} r="2.2" fill="white" />
    </svg>
  );
}

// ── Confidence bar ────────────────────────────────────────────────────────────

function ConfidenceBar({ value, color }: { value: number; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div
        style={{
          flex: 1, height: 4, borderRadius: 2,
          background: 'rgba(85,95,113,0.1)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%', borderRadius: 2,
            width: `${value}%`,
            background: color,
            transition: 'width 0.6s ease',
          }}
        />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color, minWidth: 30, textAlign: 'right' }}>
        {value}%
      </span>
    </div>
  );
}

// ── AI explanation sheet ──────────────────────────────────────────────────────

function AISheet({
  suggestion,
  onClose,
}: {
  suggestion: Suggestion | null;
  onClose: () => void;
}) {
  if (!suggestion) return null;

  return (
    <>
      {/* Backdrop — absolute within outer wrapper, not fixed */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.32)',
          zIndex: 50,
          backdropFilter: 'blur(4px)',
        }}
      />
      {/* Sheet — absolute, capped height, scrollable interior */}
      <div
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          background: '#F9F9F7',
          borderRadius: '24px 24px 0 0',
          zIndex: 51,
          maxHeight: '90%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.18)',
          animation: 'encore-slidein-up 0.28s cubic-bezier(0.34,1.56,0.64,1) both',
        }}
      >
        {/* Handle — fixed at top, never scrolls */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px', flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(85,95,113,0.2)' }} />
        </div>

        {/* Scrollable content area */}
        <div style={{ overflowY: 'auto', padding: '16px 22px 28px', flex: 1 }}>

          {/* AI avatar + title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <div
              style={{
                width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #6C63FF 0%, #9B8FFF 100%)',
                boxShadow: '0 0 0 4px rgba(108,99,255,0.14)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#6C63FF', letterSpacing: '-0.2px' }}>
                Encore AI
              </div>
              <div style={{ fontSize: 11, color: '#888FA0', marginTop: 1 }}>
                Here's why I suggested this pairing
              </div>
            </div>
          </div>

          {/* Opportunity context chip */}
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '6px 14px', borderRadius: 50,
              background: suggestion.statusBg,
              border: `1px solid ${suggestion.statusColor}28`,
              marginBottom: 16,
            }}
          >
            <span style={{ fontSize: 14 }}>{suggestion.icon}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: suggestion.statusColor }}>
              {suggestion.opportunity}
            </span>
          </div>

          {/* AI reasoning bubble */}
          <div
            style={{
              background: 'rgba(108,99,255,0.05)',
              border: '1px solid rgba(108,99,255,0.12)',
              borderRadius: 18,
              padding: '16px 18px',
              marginBottom: 16,
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute', top: -8, left: 20,
                width: 0, height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderBottom: '8px solid rgba(108,99,255,0.12)',
              }}
            />
            <p
              style={{
                margin: 0, fontSize: 14, color: '#444C58',
                lineHeight: 1.72, fontStyle: 'italic',
              }}
            >
              "{suggestion.aiReason}"
            </p>
          </div>

          {/* Pairing summary */}
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 14px',
              background: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(85,95,113,0.1)',
              borderRadius: 14,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                flex: 1, padding: '8px 12px', borderRadius: 10,
                background: 'rgba(50,78,88,0.07)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 10, fontWeight: 700, color: '#888FA0', letterSpacing: '0.7px', marginBottom: 3 }}>
                YOU BRING
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#324E58' }}>{suggestion.matchSkill}</div>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(108,99,255,0.5)" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <div
              style={{
                flex: 1, padding: '8px 12px', borderRadius: 10,
                background: 'rgba(108,99,255,0.07)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 10, fontWeight: 700, color: '#888FA0', letterSpacing: '0.7px', marginBottom: 3 }}>
                THEY NEED
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#6C63FF' }}>{suggestion.matchNeed}</div>
            </div>
          </div>

          {/* Confidence */}
          <div style={{ marginBottom: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#324E58', letterSpacing: '0.7px' }}>
                MATCH CONFIDENCE
              </span>
            </div>
            <ConfidenceBar value={suggestion.confidence} color={suggestion.statusColor} />
          </div>

          {/* CTA */}
          <button
            onClick={onClose}
            style={{
              width: '100%', padding: '14px', borderRadius: 50,
              background: '#324E58', border: 'none',
              color: 'white', fontSize: 15, fontWeight: 700,
              cursor: 'pointer', boxShadow: '0 4px 16px rgba(50,78,88,0.25)',
            }}
          >
            Got it, thanks
          </button>
        </div>
      </div>
    </>
  );
}

// ── Suggestion card ───────────────────────────────────────────────────────────

function SuggestionCard({
  suggestion,
  onAskAI,
}: {
  suggestion: Suggestion;
  onAskAI: (s: Suggestion) => void;
}) {
  const [accepted, setAccepted] = useState(false);

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.78)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(85,95,113,0.1)',
        borderRadius: 22,
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
      }}
    >
      {/* Card header: gradient strip + title */}
      <div
        style={{
          background: suggestion.gradient,
          padding: '16px 18px',
          display: 'flex', alignItems: 'center', gap: 12,
          position: 'relative',
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 44, height: 44, borderRadius: 14, flexShrink: 0,
            background: 'rgba(255,255,255,0.15)',
            border: '1.5px solid rgba(255,255,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
          }}
        >
          {suggestion.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: 'white', letterSpacing: '-0.2px', lineHeight: 1.2 }}>
            {suggestion.opportunity}
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 3 }}>
            {suggestion.org}
          </div>
        </div>
        {/* Status badge */}
        <div
          style={{
            padding: '4px 10px', borderRadius: 50, flexShrink: 0,
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.25)',
          }}
        >
          <span style={{ fontSize: 10, fontWeight: 700, color: 'white' }}>
            {suggestion.status}
          </span>
        </div>
      </div>

      {/* Pairing + Map row */}
      <div style={{ padding: '16px 16px 0', display: 'flex', gap: 12, alignItems: 'flex-start' }}>

        {/* Left: pairing */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* You bring */}
          <div
            style={{
              padding: '9px 12px',
              background: 'rgba(50,78,88,0.06)',
              border: '1px solid rgba(50,78,88,0.12)',
              borderRadius: 12, marginBottom: 6,
            }}
          >
            <div style={{ fontSize: 9, fontWeight: 700, color: '#888FA0', letterSpacing: '0.8px', marginBottom: 2 }}>
              YOU BRING
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#324E58' }}>
              {suggestion.matchSkill}
            </div>
          </div>

          {/* Arrow connector */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
            <div
              style={{
                width: 22, height: 22, borderRadius: '50%',
                background: 'rgba(108,99,255,0.1)',
                border: '1px solid rgba(108,99,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6C63FF" strokeWidth="3" strokeLinecap="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>

          {/* They need */}
          <div
            style={{
              padding: '9px 12px',
              background: 'rgba(108,99,255,0.06)',
              border: '1px solid rgba(108,99,255,0.14)',
              borderRadius: 12,
            }}
          >
            <div style={{ fontSize: 9, fontWeight: 700, color: '#888FA0', letterSpacing: '0.8px', marginBottom: 2 }}>
              THEY NEED
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#6C63FF' }}>
              {suggestion.matchNeed}
            </div>
          </div>

          {/* Confidence mini bar */}
          <div style={{ marginTop: 10 }}>
            <ConfidenceBar value={suggestion.confidence} color={suggestion.statusColor} />
          </div>
        </div>

        {/* Right: mini map */}
        <div style={{ flexShrink: 0 }}>
          <MiniMap
            accent={suggestion.mapAccent}
            dot={suggestion.mapDot}
            homeX={suggestion.homeX}
            homeY={suggestion.homeY}
            destX={suggestion.destX}
            destY={suggestion.destY}
          />
          {/* Location info */}
          <div style={{ marginTop: 8, textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '3px 10px', borderRadius: 50,
                background: 'rgba(50,78,88,0.07)',
                border: '1px solid rgba(50,78,88,0.12)',
              }}
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#324E58" strokeWidth="3" strokeLinecap="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#324E58' }}>
                {suggestion.neighbourhood}
              </span>
            </div>
            <div style={{ fontSize: 10, color: '#888FA0', marginTop: 4 }}>
              {suggestion.distance} · {suggestion.travelTime}
            </div>
          </div>
        </div>
      </div>

      {/* CTA row */}
      <div style={{ padding: '14px 16px 16px', display: 'flex', gap: 8 }}>
        <button
          onClick={() => setAccepted(!accepted)}
          style={{
            flex: 1, padding: '11px 0', borderRadius: 50,
            background: accepted ? '#0E9A6E' : '#324E58',
            border: 'none', color: 'white',
            fontSize: 13, fontWeight: 700, cursor: 'pointer',
            transition: 'background 0.2s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}
        >
          {accepted ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Accepted
            </>
          ) : 'Explore'}
        </button>
        <button
          onClick={() => onAskAI(suggestion)}
          style={{
            flex: 1, padding: '11px 0', borderRadius: 50,
            background: 'rgba(108,99,255,0.08)',
            border: '1.5px solid rgba(108,99,255,0.2)',
            color: '#6C63FF', fontSize: 13, fontWeight: 700,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          Why this?
        </button>
      </div>
    </div>
  );
}

// ── Encore AI floating bubble ─────────────────────────────────────────────────

function EncoreAIBubble({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        bottom: 16,
        right: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '9px 16px 9px 10px',
        background: 'linear-gradient(135deg, #6C63FF 0%, #9B8FFF 100%)',
        border: 'none',
        borderRadius: 50,
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(108,99,255,0.42), 0 0 0 5px rgba(108,99,255,0.1)',
        zIndex: 30,
        animation: 'encore-ai-pulse 3s ease-in-out infinite',
      }}
    >
      {/* Inner icon circle */}
      <div
        style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      </div>
      <span style={{ fontSize: 13, fontWeight: 700, color: 'white', letterSpacing: '-0.1px' }}>
        Encore AI
      </span>
    </button>
  );
}

// ── General AI intro sheet ─────────────────────────────────────────────────────

function AIIntroSheet({ onClose, onSelect }: {
  onClose: () => void;
  onSelect: (s: Suggestion) => void;
}) {
  return (
    <>
      {/* Backdrop — absolute within outer wrapper, not fixed */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.32)',
          zIndex: 50, backdropFilter: 'blur(4px)',
        }}
      />
      {/* Sheet — absolute, capped height, flex column for inner scroll */}
      <div
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          background: '#F9F9F7',
          borderRadius: '24px 24px 0 0',
          zIndex: 51,
          maxHeight: '90%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.18)',
          animation: 'encore-slidein-up 0.28s cubic-bezier(0.34,1.56,0.64,1) both',
        }}
      >
        {/* Handle — never scrolls */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px', flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(85,95,113,0.2)' }} />
        </div>

        {/* Scrollable content area */}
        <div style={{ overflowY: 'auto', padding: '16px 22px 28px', flex: 1 }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div
              style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'linear-gradient(135deg, #6C63FF 0%, #9B8FFF 100%)',
                boxShadow: '0 0 0 4px rgba(108,99,255,0.14)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#6C63FF' }}>Hey Arun, it's me.</div>
              <div style={{ fontSize: 12, color: '#888FA0', marginTop: 1 }}>Your Encore AI sidekick</div>
            </div>
          </div>

          {/* Intro message */}
          <div
            style={{
              background: 'rgba(108,99,255,0.05)',
              border: '1px solid rgba(108,99,255,0.12)',
              borderRadius: 18,
              padding: '16px 18px',
              marginBottom: 20,
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute', top: -8, left: 20,
                width: 0, height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderBottom: '8px solid rgba(108,99,255,0.12)',
              }}
            />
            <p style={{ margin: 0, fontSize: 14, color: '#444C58', lineHeight: 1.72, fontStyle: 'italic' }}>
              "I've been looking at your profile, your availability patterns, and what's happening in your neighbourhood. I found three pairings that feel right — not just convenient, but genuinely meaningful. Tap any card below to hear my thinking."
            </p>
          </div>

          {/* Quick-select buttons */}
          <div style={{ fontSize: 11, fontWeight: 700, color: '#324E58', letterSpacing: '0.8px', marginBottom: 10 }}>
            ASK ME ABOUT
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {SUGGESTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => { onClose(); onSelect(s); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '11px 14px', borderRadius: 14,
                  background: 'rgba(255,255,255,0.8)',
                  border: '1px solid rgba(85,95,113,0.12)',
                  cursor: 'pointer', textAlign: 'left',
                }}
              >
                <span style={{ fontSize: 18 }}>{s.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1C1B' }}>{s.opportunity}</div>
                  <div style={{ fontSize: 11, color: '#888FA0' }}>{s.neighbourhood} · {s.distance}</div>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888FA0" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────

export function MyEncore() {
  const [aiTarget, setAiTarget] = useState<Suggestion | null>(null);
  const [showIntro, setShowIntro] = useState(false);

  function handleBubbleClick() {
    setAiTarget(null);
    setShowIntro(true);
  }

  function handleAskAI(s: Suggestion) {
    setShowIntro(false);
    setAiTarget(s);
  }

  return (
    // Outer wrapper: fills parent, non-scrolling, positions the floating bubble
    <div
      style={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Inner scrollable content ──────────────────────────────────── */}
      <div
        className="encore-fadein encore-scroll"
        style={{
          height: '100%',
          overflowY: 'auto',
          background: '#F9F9F7',
          paddingBottom: 88,
        }}
      >
        {/* Header */}
        <div style={{ padding: '52px 20px 6px' }}>
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 12px', borderRadius: 50,
              background: 'rgba(108,99,255,0.09)',
              border: '1px solid rgba(108,99,255,0.18)',
              marginBottom: 12,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6C63FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#6C63FF', letterSpacing: '0.8px' }}>
              AI-CURATED FOR YOU
            </span>
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#1A1C1B', letterSpacing: '-0.5px', marginBottom: 5 }}>
            My Encore
          </div>
          <div style={{ fontSize: 14, color: '#888FA0', lineHeight: 1.5 }}>
            Hyper-local opportunities matched to your skills and availability.
          </div>
        </div>

        {/* AI Context strip */}
        <div style={{ padding: '16px 20px 24px' }}>
          <button
            onClick={handleBubbleClick}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 16px',
              background: 'linear-gradient(135deg, rgba(108,99,255,0.07) 0%, rgba(155,143,255,0.05) 100%)',
              border: '1px solid rgba(108,99,255,0.16)',
              borderRadius: 18,
              cursor: 'pointer', textAlign: 'left',
            }}
          >
            <div
              style={{
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #6C63FF, #9B8FFF)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 0 3px rgba(108,99,255,0.15)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#4A43B8', marginBottom: 2 }}>
                "I found 3 pairings that feel right for you, Arun."
              </div>
              <div style={{ fontSize: 11, color: '#888FA0' }}>
                Tap to hear my thinking →
              </div>
            </div>
          </button>
        </div>

        {/* Suggestion cards */}
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {SUGGESTIONS.map((s) => (
            <SuggestionCard key={s.id} suggestion={s} onAskAI={handleAskAI} />
          ))}
        </div>

        {/* Impact snapshot */}
        <div style={{ padding: '28px 20px 0' }}>
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(50,78,88,0.9) 0%, rgba(74,112,128,0.88) 100%)',
              borderRadius: 22, padding: '20px 22px',
              boxShadow: '0 8px 32px rgba(50,78,88,0.18)',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: -18, right: -18, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '1px', marginBottom: 14 }}>
                YOUR IMPACT SO FAR
              </div>
              <div style={{ display: 'flex', gap: 0 }}>
                {[
                  { value: '2', label: 'builders guided', icon: '🌱' },
                  { value: '1', label: 'circle joined', icon: '🎵' },
                  { value: '3', label: 'insights shared', icon: '💡' },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      borderRight: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                      padding: i < 2 ? '0 16px 0 0' : '0',
                      marginRight: i < 2 ? 16 : 0,
                    }}
                  >
                    <div style={{ fontSize: 18, marginBottom: 4 }}>{item.icon}</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: 'white', lineHeight: 1 }}>{item.value}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 3, lineHeight: 1.4 }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Floating Encore AI bubble — always visible, never scrolls ── */}
      <EncoreAIBubble onClick={handleBubbleClick} />

      {/* ── AI sheets (rendered in the outer wrapper so they can cover full height) ── */}
      {showIntro && (
        <AIIntroSheet
          onClose={() => setShowIntro(false)}
          onSelect={handleAskAI}
        />
      )}
      {aiTarget && (
        <AISheet
          suggestion={aiTarget}
          onClose={() => setAiTarget(null)}
        />
      )}
    </div>
  );
}