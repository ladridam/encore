import React, { useState } from 'react';
import { useNavigate } from 'react-router';

// ── Data ────────────────────────────────────────────────────────────────────

const CAREER_ERAS = [
  {
    id: 'builder',
    title: 'The Builder Years',
    subtitle: 'Where it all began',
    reflection:
      'I learned that the best systems are built by curious people, not just smart ones. Every bug was a question in disguise.',
    skills: ['Systems Design', 'Engineering', 'Problem Solving'],
    color: '#324E58',
    accent: 'rgba(50,78,88,0.10)',
    border: 'rgba(50,78,88,0.22)',
    isCurrent: false,
  },
  {
    id: 'leader',
    title: 'The Leader Era',
    subtitle: 'People over processes',
    reflection:
      'Managing teams taught me more about myself than any technical challenge. The real architecture was trust.',
    skills: ['Leadership', 'Strategy', 'Operations'],
    color: '#6C63FF',
    accent: 'rgba(108,99,255,0.09)',
    border: 'rgba(108,99,255,0.2)',
    isCurrent: false,
  },
  {
    id: 'now',
    title: 'Now: Open & Offering',
    subtitle: 'The chapter I chose',
    reflection:
      "Every young builder deserves a sounding board. I'm here for that — no agenda, no hierarchy, just experience freely given.",
    skills: ['Mentoring', 'Coaching', 'Community'],
    color: '#D4A373',
    accent: 'rgba(212,163,115,0.12)',
    border: 'rgba(212,163,115,0.28)',
    isCurrent: true,
  },
];

const CONNECTIONS = [
  {
    id: '1',
    title: 'Guide a Robotics Team',
    org: 'Sunrise STEM School',
    status: 'Pending',
    statusColor: '#D4A373',
    statusBg: 'rgba(212,163,115,0.12)',
    gradient: 'linear-gradient(135deg, #2A4A54 0%, #3E7B8C 100%)',
    icon: '🎓',
  },
  {
    id: '2',
    title: 'Classical Music Circle',
    org: 'Community Circle',
    status: 'Joined',
    statusColor: '#0E9A6E',
    statusBg: 'rgba(14,154,110,0.1)',
    gradient: 'linear-gradient(135deg, #5B21B6 0%, #A78BFA 100%)',
    icon: '🎵',
  },
];

// ── Leaf watermark SVG ───────────────────────────────────────────────────────

function LeafWatermark({ size = 120, opacity = 0.06 }: { size?: number; opacity?: number }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 40 40" fill="none"
      style={{ pointerEvents: 'none', display: 'block' }}
      aria-hidden="true"
    >
      <path
        d="M20 38C20 38 4 29 4 16C4 8.27 11.16 2 20 2C28.84 2 36 8.27 36 16C36 29 20 38 20 38Z"
        fill="white" fillOpacity={opacity / 0.06}
      />
      <path d="M20 38V2" stroke="white" strokeWidth="1" strokeDasharray="2 3" strokeOpacity={opacity / 0.06} />
      <path d="M20 16C15 11 8 10 5 7" stroke="white" strokeWidth="0.8" strokeLinecap="round" strokeOpacity={opacity / 0.06} />
      <path d="M20 22C25 17 32 16 35 13" stroke="white" strokeWidth="0.8" strokeLinecap="round" strokeOpacity={opacity / 0.06} />
    </svg>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export function Profile() {
  const navigate = useNavigate();
  const [expandedEra, setExpandedEra] = useState<string | null>('now');
  const [editingBio, setEditingBio] = useState(false);
  const [bio, setBio] = useState(
    'Four decades as an engineer taught me that the best systems are built by curious people, not just smart ones. I mentor because curiosity is contagious — and because every young builder deserves a sounding board.'
  );
  const [bioDraft, setBioDraft] = useState(bio);

  return (
    <div
      className="encore-fadein"
      style={{ minHeight: '100%', background: '#F9F9F7', paddingBottom: 48, overflowY: 'auto' }}
    >

      {/* ── Top navigation bar ─────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '52px 20px 16px',
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: 'rgba(50,78,88,0.08)', border: '1px solid rgba(50,78,88,0.12)',
            borderRadius: 50, padding: '7px 14px',
            color: '#324E58', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back
        </button>
        <button
          onClick={() => navigate('/setup')}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: 'rgba(50,78,88,0.08)', border: '1px solid rgba(50,78,88,0.16)',
            borderRadius: 50, padding: '7px 14px',
            color: '#324E58', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Edit
        </button>
      </div>

      {/* ── Living Book Cover ───────────────────────────────────────────── */}
      <div style={{ padding: '0 20px 28px' }}>
        <div
          style={{
            background: 'linear-gradient(162deg, #2b4450 0%, #324E58 45%, #3a6070 100%)',
            borderRadius: 24,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 16px 48px rgba(50,78,88,0.32), 0 2px 8px rgba(50,78,88,0.12)',
          }}
        >
          {/* Book spine accent bar */}
          <div
            style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: 6,
              background: 'linear-gradient(180deg, #D4A373 0%, rgba(212,163,115,0.35) 100%)',
              borderRadius: '24px 0 0 24px',
            }}
          />

          {/* Horizontal ruling lines */}
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute', left: 0, right: 0,
                top: 52 + i * 22, height: 1,
                background: 'rgba(255,255,255,0.03)',
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Botanical leaf watermarks */}
          <div style={{ position: 'absolute', bottom: -16, right: -12, opacity: 0.07 }}>
            <LeafWatermark size={150} opacity={0.07} />
          </div>
          <div style={{ position: 'absolute', top: -20, left: 40, opacity: 0.04, transform: 'rotate(-30deg)' }}>
            <LeafWatermark size={90} opacity={0.04} />
          </div>

          {/* Card content */}
          <div style={{ padding: '24px 22px 22px 28px', position: 'relative' }}>

            {/* Series label */}
            <div
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'rgba(212,163,115,0.16)', border: '1px solid rgba(212,163,115,0.28)',
                borderRadius: 50, padding: '4px 12px', marginBottom: 20,
              }}
            >
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#D4A373' }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: '#D4A373', letterSpacing: '1.3px' }}>
                LIVING LIBRARY
              </span>
            </div>

            {/* Monogram + Name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <div
                style={{
                  width: 58, height: 58, borderRadius: 16, flexShrink: 0,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.07) 100%)',
                  border: '1.5px solid rgba(255,255,255,0.22)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, fontWeight: 800, color: 'white', letterSpacing: '-0.5px',
                  position: 'relative',
                }}
              >
                AK
                <div
                  style={{
                    position: 'absolute', bottom: -3, right: -3,
                    width: 18, height: 18, borderRadius: '50%',
                    background: '#6C63FF', border: '2px solid #324E58',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 26, fontWeight: 800, color: 'white', letterSpacing: '-0.7px', lineHeight: 1.1 }}>
                  Arun Kumar
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>
                  Siliguri, India | Retired Engineer
                </div>
              </div>
            </div>

            {/* Tagline epigraph */}
            <div
              style={{
                marginBottom: 18,
                padding: '10px 14px',
                borderLeft: '2.5px solid rgba(212,163,115,0.55)',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '0 10px 10px 0',
              }}
            >
              <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.72)', fontStyle: 'italic', lineHeight: 1.55 }}>
                "Engineer turned mentor. Four decades of building things — one chapter of giving it all back."
              </p>
            </div>

            {/* Genre chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['Engineering', 'Leadership', 'Mentoring', 'Strategy'].map((genre) => (
                <span
                  key={genre}
                  style={{
                    padding: '4px 13px', borderRadius: 50,
                    background: 'rgba(255,255,255,0.09)',
                    border: '1px solid rgba(255,255,255,0.17)',
                    color: 'rgba(255,255,255,0.82)',
                    fontSize: 12, fontWeight: 500,
                  }}
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Career Timeline ─────────────────────────────────────────────── */}
      <div style={{ padding: '0 20px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
          <div
            style={{
              width: 3, height: 16, borderRadius: 2,
              background: 'linear-gradient(180deg, #324E58, #D4A373)',
            }}
          />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#324E58', letterSpacing: '1.1px' }}>
            MY CHAPTERS
          </span>
        </div>

        <div style={{ position: 'relative' }}>
          {/* Vertical spine */}
          <div
            style={{
              position: 'absolute', left: 19, top: 22, bottom: 22, width: 2,
              background: 'linear-gradient(180deg, #324E58 0%, #6C63FF 50%, #D4A373 100%)',
              opacity: 0.18, borderRadius: 2,
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {CAREER_ERAS.map((era) => {
              const isOpen = expandedEra === era.id;
              return (
                <div key={era.id} style={{ position: 'relative', paddingLeft: 46 }}>

                  {/* Dot */}
                  <div
                    style={{
                      position: 'absolute', left: 11, top: 22,
                      width: 16, height: 16, borderRadius: '50%',
                      background: era.color,
                      border: '3px solid #F9F9F7',
                      boxShadow: `0 0 0 2px ${era.color}`,
                      zIndex: 2,
                      transition: 'transform 0.22s ease',
                      transform: isOpen ? 'scale(1.25)' : 'scale(1)',
                    }}
                  />

                  {era.isCurrent && (
                    <div
                      style={{
                        position: 'absolute', left: 11, top: 22,
                        width: 16, height: 16, borderRadius: '50%',
                        background: era.color, opacity: 0.25,
                        zIndex: 1,
                        animation: 'encore-dot-pulse 2.2s ease-in-out infinite',
                      }}
                    />
                  )}

                  <button
                    onClick={() => setExpandedEra(isOpen ? null : era.id)}
                    style={{
                      width: '100%', textAlign: 'left', cursor: 'pointer',
                      background: isOpen ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.58)',
                      backdropFilter: 'blur(12px)',
                      border: `1px solid ${isOpen ? era.border : 'rgba(85,95,113,0.1)'}`,
                      borderRadius: 18,
                      padding: '15px 16px',
                      boxShadow: isOpen ? `0 6px 24px ${era.color}18` : '0 2px 8px rgba(0,0,0,0.03)',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                      <div style={{ flex: 1 }}>
                        {era.isCurrent && (
                          <div
                            style={{
                              display: 'inline-block',
                              fontSize: 9, fontWeight: 700, letterSpacing: '0.9px',
                              color: era.color, background: era.accent,
                              padding: '2px 8px', borderRadius: 50, marginBottom: 5,
                            }}
                          >
                            CURRENT
                          </div>
                        )}
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1C1B', lineHeight: 1.2 }}>
                          {era.title}
                        </div>
                        <div style={{ fontSize: 12, color: '#888FA0', marginTop: 2 }}>
                          {era.subtitle}
                        </div>
                      </div>

                      <div
                        style={{
                          width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                          background: era.accent, border: `1px solid ${era.border}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'transform 0.25s ease',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={era.color} strokeWidth="2.5" strokeLinecap="round">
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                    </div>

                    {isOpen && (
                      <div style={{ marginTop: 14 }}>
                        <div style={{ height: 1, background: era.border, marginBottom: 12, borderRadius: 1 }} />
                        <div
                          style={{
                            padding: '10px 12px',
                            background: era.accent,
                            borderRadius: 12,
                            borderLeft: `3px solid ${era.color}`,
                            marginBottom: 12,
                          }}
                        >
                          <p style={{ margin: 0, fontSize: 13, color: '#444C58', lineHeight: 1.65, fontStyle: 'italic' }}>
                            "{era.reflection}"
                          </p>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {era.skills.map((skill) => (
                            <span
                              key={skill}
                              style={{
                                padding: '4px 12px', borderRadius: 50,
                                background: 'rgba(255,255,255,0.9)',
                                border: `1.5px solid ${era.border}`,
                                color: era.color, fontSize: 12, fontWeight: 600,
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── My Story ────────────────────────────────────────────────────── */}
      <div style={{ padding: '0 20px 24px' }}>
        <div
          style={{
            background: 'rgba(255,255,255,0.72)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(85,95,113,0.10)',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          }}
        >
          <div
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 18px 12px',
              borderBottom: '1px solid rgba(85,95,113,0.08)',
              background: 'rgba(255,255,255,0.5)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4A373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#324E58', letterSpacing: '1px' }}>
                MY STORY
              </span>
            </div>
            <button
              onClick={() => {
                if (editingBio) { setBio(bioDraft); setEditingBio(false); }
                else { setBioDraft(bio); setEditingBio(true); }
              }}
              style={{
                padding: '4px 12px', borderRadius: 50, fontSize: 11, fontWeight: 700,
                background: editingBio ? '#324E58' : 'rgba(50,78,88,0.08)',
                color: editingBio ? 'white' : '#324E58',
                border: 'none', cursor: 'pointer', letterSpacing: '0.2px',
              }}
            >
              {editingBio ? 'Save' : 'Edit'}
            </button>
          </div>

          <div style={{ padding: '16px 18px 18px' }}>
            {editingBio ? (
              <textarea
                autoFocus
                value={bioDraft}
                onChange={(e) => setBioDraft(e.target.value)}
                rows={5}
                style={{
                  width: '100%', border: '1.5px solid #324E58',
                  borderRadius: 12, padding: '10px 12px',
                  fontSize: 14, color: '#1A1C1B', lineHeight: 1.65,
                  background: 'rgba(50,78,88,0.03)', outline: 'none',
                  resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
                }}
              />
            ) : (
              <p style={{ margin: 0, fontSize: 14, color: '#555F71', lineHeight: 1.75, fontStyle: 'italic' }}>
                "{bio}"
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Active Connections ───────────────────────────────────────────── */}
      <div style={{ padding: '0 20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 3, height: 16, borderRadius: 2, background: 'linear-gradient(180deg, #6C63FF, #9B8FFF)' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#324E58', letterSpacing: '1.1px' }}>
            ACTIVE CONNECTIONS
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {CONNECTIONS.map((conn) => (
            <div
              key={conn.id}
              style={{
                background: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(85,95,113,0.1)',
                borderRadius: 16, overflow: 'hidden',
                display: 'flex', alignItems: 'center',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              }}
            >
              <div
                style={{
                  width: 48, alignSelf: 'stretch', flexShrink: 0,
                  background: conn.gradient,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18,
                }}
              >
                {conn.icon}
              </div>
              <div style={{ flex: 1, padding: '11px 12px' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1C1B', marginBottom: 2 }}>
                  {conn.title}
                </div>
                <div style={{ fontSize: 11, color: '#888FA0' }}>{conn.org}</div>
              </div>
              <div
                style={{
                  padding: '3px 10px', marginRight: 10, borderRadius: 50,
                  background: conn.statusBg, color: conn.statusColor,
                  fontSize: 10, fontWeight: 700,
                  border: `1px solid ${conn.statusColor}25`,
                  whiteSpace: 'nowrap',
                }}
              >
                {conn.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── AI CTA ──────────────────────────────────────────────────────── */}
      <div style={{ padding: '0 20px' }}>
        <div
          style={{
            padding: '16px 18px',
            background: 'rgba(108,99,255,0.05)',
            border: '1px solid rgba(108,99,255,0.13)',
            borderRadius: 18,
            display: 'flex', alignItems: 'center', gap: 13,
          }}
        >
          <div
            style={{
              width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, #6C63FF, #9B8FFF)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#4A43B8', marginBottom: 2 }}>
              Share your Library
            </div>
            <div style={{ fontSize: 11, color: '#6C63FF', opacity: 0.8 }}>
              Let Encore AI match you with more opportunities
            </div>
          </div>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6C63FF" strokeWidth="2.5" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>

    </div>
  );
}