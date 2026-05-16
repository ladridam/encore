import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import useEmblaCarousel from 'embla-carousel-react';
import { opportunities, circles } from '../data';

const CARD_ICONS: Record<string, React.ReactNode> = {
  '1': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  '2': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  '3': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  ),
};

export function Home() {
  const navigate = useNavigate();
  const [emblaRef] = useEmblaCarousel({ align: 'start', dragFree: true });
  const [whyOpen, setWhyOpen] = useState<string | null>(null);
  const [stripOpen, setStripOpen] = useState(false);
  const [sidekickOpen, setSidekickOpen] = useState(false);

  const toggleWhy = (id: string) => setWhyOpen((prev) => (prev === id ? null : id));

  return (
    <div
      className="encore-fadein encore-scroll"
      style={{
        minHeight: '100%',
        background: '#F9F9F7',
        paddingBottom: 20,
        position: 'relative',
      }}
    >
      {/* Header */}
      <div style={{ padding: '52px 24px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#1A1C1B', letterSpacing: '-0.3px' }}>
              Good morning, Arun
            </div>
            <div style={{ fontSize: 14, color: '#555F71', marginTop: 2 }}>
              Based on your week and nearby needs
            </div>
          </div>
          <button
            onClick={() => navigate('/profile')}
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #324E58, #4A7080)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 15,
              fontWeight: 700,
              color: 'white',
              flexShrink: 0,
            }}
          >
            AK
          </button>
        </div>
      </div>

      {/* AI Whisper Strip */}
      <div style={{ padding: '0 24px 20px' }}>
        <div
          style={{
            background: 'rgba(108,99,255,0.07)',
            border: '1px solid rgba(108,99,255,0.18)',
            borderRadius: 16,
            padding: '14px 16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, flex: 1 }}>
              <span style={{ fontSize: 16, lineHeight: 1, marginTop: 1 }}>✦</span>
              <div
                style={{
                  fontSize: 14,
                  color: '#1A1C1B',
                  lineHeight: 1.55,
                  fontWeight: 500,
                }}
              >
                3 matches for you today — a robotics team nearby needs your guidance.
              </div>
            </div>
            <button
              onClick={() => setStripOpen((v) => !v)}
              style={{
                background: 'none',
                border: 'none',
                color: '#6C63FF',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                padding: '4px 0',
                flexShrink: 0,
              }}
            >
              {stripOpen ? 'Close' : 'Why?'}
            </button>
          </div>

          {/* Expanded reasoning */}
          {stripOpen && (
            <div
              className="encore-expanddown"
              style={{
                marginTop: 12,
                padding: '12px 14px',
                background: 'rgba(108,99,255,0.06)',
                borderRadius: 12,
                borderLeft: '3px solid rgba(108,99,255,0.4)',
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: '#6C63FF', marginBottom: 8 }}>
                How we matched you today
              </div>
              {[
                { icon: '👤', text: 'Your profile: Engineering + Strategy + Mentoring' },
                { icon: '📍', text: 'Location: Indiranagar — 3 matches within 2.5 km' },
                { icon: '📅', text: 'Your typical free days: Tuesday & Thursday mornings' },
                { icon: '💡', text: 'Interests: Education, outdoor activities, community' },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 8,
                    marginBottom: i < 3 ? 6 : 0,
                  }}
                >
                  <span style={{ fontSize: 13, lineHeight: 1.5 }}>{item.icon}</span>
                  <span style={{ fontSize: 13, color: '#555F71', lineHeight: 1.5 }}>{item.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Opportunities Carousel */}
      <div style={{ paddingLeft: 24, marginBottom: 28 }}>
        <div style={{ fontSize: 17, fontWeight: 600, color: '#1A1C1B', marginBottom: 14, paddingRight: 24 }}>
          For you
        </div>
        <div ref={emblaRef} style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 14, paddingRight: 24 }}>
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                className="encore-card-hover"
                onClick={() => navigate(`/opportunity/${opp.id}`)}
                style={{
                  flexShrink: 0,
                  width: 240,
                  borderRadius: 20,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: 'rgba(255,255,255,0.75)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(85,95,113,0.1)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
                }}
              >
                {/* Card gradient header */}
                <div
                  style={{
                    background: opp.cardGradient,
                    padding: '20px 20px 16px',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      marginBottom: 12,
                    }}
                  >
                    {CARD_ICONS[opp.id]}
                  </div>
                  <div
                    style={{
                      display: 'inline-block',
                      padding: '3px 10px',
                      borderRadius: 50,
                      background: 'rgba(255,255,255,0.2)',
                      color: 'rgba(255,255,255,0.9)',
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: '0.3px',
                      marginBottom: 6,
                    }}
                  >
                    {opp.type.toUpperCase()}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'white', lineHeight: 1.3 }}>
                    {opp.title}
                  </div>
                </div>

                {/* Card body */}
                <div style={{ padding: '14px 20px 16px' }}>
                  <div style={{ fontSize: 13, color: '#555F71', marginBottom: 8 }}>{opp.organization}</div>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#555F71' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {opp.distance}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#555F71' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      {opp.timeCommitment}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWhy(opp.id);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#6C63FF',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    ✦ Why this?
                  </button>

                  {/* Inline why panel */}
                  {whyOpen === opp.id && (
                    <div
                      className="encore-expanddown"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        marginTop: 10,
                        padding: '10px 12px',
                        background: 'rgba(108,99,255,0.06)',
                        borderRadius: 10,
                        borderLeft: '3px solid rgba(108,99,255,0.35)',
                      }}
                    >
                      <div style={{ fontSize: 12, color: '#555F71', lineHeight: 1.55 }}>
                        {opp.whyThis.slice(0, 120)}…
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Circles */}
      <div style={{ padding: '0 24px' }}>
        <div style={{ fontSize: 17, fontWeight: 600, color: '#1A1C1B', marginBottom: 14 }}>
          Community circles near you
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {circles.map((circle) => (
            <div
              key={circle.id}
              className="encore-card-hover"
              onClick={() => navigate(`/circle/${circle.id}`)}
              style={{
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(85,95,113,0.1)',
                borderRadius: 18,
                boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
                padding: '16px 18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              {/* Emoji badge */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: circle.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  flexShrink: 0,
                }}
              >
                {circle.emoji}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1C1B', marginBottom: 3 }}>
                  {circle.name}
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 12, color: '#555F71' }}>
                    👥 {circle.members} members
                  </span>
                  <span style={{ fontSize: 12, color: '#555F71' }}>
                    📍 {circle.distance}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: '#324E58', fontWeight: 500, marginTop: 3 }}>
                  📅 Next: {circle.nextMeetup}
                </div>
              </div>

              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C0C8D0" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* AI Sidekick Floating Pill */}
      <button
        onClick={() => setSidekickOpen((v) => !v)}
        className="encore-pulse-btn"
        style={{
          position: 'fixed',
          bottom: 80,
          right: 16,
          width: 56,
          height: 56,
          borderRadius: 50,
          background: 'linear-gradient(135deg, #6C63FF 0%, #8B82FF 100%)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          color: 'white',
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </button>

      {/* Sidekick Panel */}
      {sidekickOpen && (
        <div
          className="encore-expanddown"
          style={{
            position: 'fixed',
            bottom: 148,
            right: 12,
            width: 260,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(16px)',
            borderRadius: 20,
            border: '1px solid rgba(108,99,255,0.2)',
            boxShadow: '0 8px 32px rgba(108,99,255,0.2)',
            padding: '18px 18px 14px',
            zIndex: 49,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6C63FF, #8B82FF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
              </svg>
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1C1B' }}>Encore AI</span>
          </div>
          <p style={{ fontSize: 13, color: '#555F71', lineHeight: 1.6, marginBottom: 10 }}>
            Your 3 matches today are based on your engineering background, Tuesday mornings, and what's within 2.5 km of you.
          </p>
          <div style={{ borderTop: '1px solid rgba(85,95,113,0.1)', paddingTop: 10 }}>
            <div style={{ fontSize: 12, color: '#6C63FF', fontWeight: 500 }}>
              The AI never decides — it only explains.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}