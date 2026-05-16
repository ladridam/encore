import React, { useState } from 'react';
import { useNavigate } from 'react-router';

// ── Types ────────────────────────────────────────────────────────────────────

interface Initiative {
  id: string;
  title: string;
  org: string;
  note: string;
  status: 'Completed' | 'Ongoing' | 'Upcoming';
  statusColor: string;
  statusBg: string;
  gradient: string;
  icon: string;
}

interface Token {
  label: string;
  count: number;
  color: string;
  bg: string;
  border: string;
}

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  domain: string;
  via: string;
  viaGradient: string;
}

// ── Mock data ────────────────────────────────────────────────────────────────

const INITIATIVES: Initiative[] = [
  {
    id: '1',
    title: 'Guided a Robotics Team',
    org: 'Sunrise STEM School',
    note: 'Ran 3 hands-on sessions. Helped the team debug their first prototype and treat failure as data, not defeat.',
    status: 'Completed',
    statusColor: '#0E9A6E',
    statusBg: 'rgba(14,154,110,0.1)',
    gradient: 'linear-gradient(135deg, #2A4A54 0%, #3E7B8C 100%)',
    icon: '🎓',
  },
  {
    id: '2',
    title: 'Classical Music Circle',
    org: 'Encore Community',
    note: 'Hosting weekly listening sessions on structure, pattern, and the quiet intelligence behind classical composition.',
    status: 'Ongoing',
    statusColor: '#6C63FF',
    statusBg: 'rgba(108,99,255,0.09)',
    gradient: 'linear-gradient(135deg, #5B21B6 0%, #A78BFA 100%)',
    icon: '🎵',
  },
  {
    id: '3',
    title: 'Tech Talk: Build with Curiosity',
    org: 'Encore Community',
    note: 'Spoke to early-career engineers about treating constraints as design opportunities — not blockers.',
    status: 'Completed',
    statusColor: '#0E9A6E',
    statusBg: 'rgba(14,154,110,0.1)',
    gradient: 'linear-gradient(135deg, #C4834A 0%, #D4A373 100%)',
    icon: '🎤',
  },
];

const TOKENS: Token[] = [
  { label: 'Clarity',     count: 8,  color: '#324E58', bg: 'rgba(50,78,88,0.09)',     border: 'rgba(50,78,88,0.2)'     },
  { label: 'Patience',    count: 5,  color: '#6C63FF', bg: 'rgba(108,99,255,0.09)',   border: 'rgba(108,99,255,0.2)'   },
  { label: 'Perspective', count: 11, color: '#D4A373', bg: 'rgba(212,163,115,0.12)',  border: 'rgba(212,163,115,0.28)' },
  { label: 'Spark',       count: 4,  color: '#C4834A', bg: 'rgba(196,131,74,0.1)',    border: 'rgba(196,131,74,0.22)'  },
];

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: "Arun didn't give me answers — he gave me better questions. That shift changed how I approach every problem.",
    name: 'Priya',
    domain: 'Robotics',
    via: 'Guided a Robotics Team',
    viaGradient: 'linear-gradient(135deg, #2A4A54, #3E7B8C)',
  },
  {
    id: '2',
    quote: "I came in nervous about presenting my ideas. After one conversation, I understood that clarity is an act of care.",
    name: 'Rohan',
    domain: 'Engineering',
    via: 'Tech Talk: Build with Curiosity',
    viaGradient: 'linear-gradient(135deg, #C4834A, #D4A373)',
  },
  {
    id: '3',
    quote: "He listens before he speaks. That alone is rare — and it made every exchange feel genuinely worth having.",
    name: 'Ananya',
    domain: 'Music',
    via: 'Classical Music Circle',
    viaGradient: 'linear-gradient(135deg, #5B21B6, #A78BFA)',
  },
];

const TOKEN_OPTIONS = ['Clarity', 'Patience', 'Perspective', 'Spark'];

// ── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
      <div style={{ width: 3, height: 16, borderRadius: 2, background: color }} />
      <span style={{ fontSize: 11, fontWeight: 700, color: '#324E58', letterSpacing: '1.1px' }}>
        {label}
      </span>
    </div>
  );
}

function InitiativeCard({ item }: { item: Initiative }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.78)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(85,95,113,0.1)',
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        {/* Gradient strip */}
        <div
          style={{
            width: 52, flexShrink: 0,
            background: item.gradient,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
          }}
        >
          {item.icon}
        </div>

        {/* Main content */}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            flex: 1, textAlign: 'left', cursor: 'pointer',
            background: 'transparent', border: 'none',
            padding: '14px 14px 14px 12px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1C1B', marginBottom: 3 }}>
              {item.title}
            </div>
            <div style={{ fontSize: 11, color: '#888FA0' }}>{item.org}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
            <span
              style={{
                padding: '3px 10px', borderRadius: 50,
                background: item.statusBg, color: item.statusColor,
                fontSize: 10, fontWeight: 700,
                border: `1px solid ${item.statusColor}28`,
                whiteSpace: 'nowrap',
              }}
            >
              {item.status}
            </span>
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="#888FA0" strokeWidth="2.5" strokeLinecap="round"
              style={{ transition: 'transform 0.22s ease', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </button>
      </div>

      {/* Expanded note */}
      {expanded && (
        <div
          style={{
            padding: '0 14px 14px 64px',
            borderTop: '1px solid rgba(85,95,113,0.07)',
          }}
        >
          <div style={{ height: 12 }} />
          <div
            style={{
              padding: '10px 14px',
              background: 'rgba(50,78,88,0.04)',
              borderLeft: '2.5px solid rgba(50,78,88,0.2)',
              borderRadius: '0 10px 10px 0',
            }}
          >
            <p style={{ margin: 0, fontSize: 13, color: '#555F71', lineHeight: 1.65, fontStyle: 'italic' }}>
              "{item.note}"
            </p>
            <div style={{ fontSize: 11, color: '#888FA0', marginTop: 6 }}>— Arun's note</div>
          </div>
        </div>
      )}
    </div>
  );
}

function TokenDots({ count }: { count: number }) {
  const MAX_DOTS = 5;
  const shown = Math.min(count, MAX_DOTS);
  const extra = count > MAX_DOTS ? count - MAX_DOTS : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      {Array.from({ length: shown }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 5, height: 5, borderRadius: '50%',
            background: 'currentColor',
            opacity: 0.4 + (i / shown) * 0.5,
          }}
        />
      ))}
      {extra > 0 && (
        <span style={{ fontSize: 9, fontWeight: 700, opacity: 0.6, marginLeft: 2 }}>
          +{extra}
        </span>
      )}
    </div>
  );
}

// ── Leave a note sheet ───────────────────────────────────────────────────────

function LeaveNoteSheet({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (note: string, name: string, domain: string, token: string) => void;
}) {
  const [note, setNote] = useState('');
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [selectedToken, setSelectedToken] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = note.trim().length > 10 && name.trim().length > 0;

  function handleSubmit() {
    if (!canSubmit) return;
    onSubmit(note.trim(), name.trim(), domain.trim() || 'Community', selectedToken || 'Clarity');
    setSubmitted(true);
    setTimeout(onClose, 1800);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)',
          zIndex: 50, backdropFilter: 'blur(4px)',
        }}
      />
      {/* Sheet */}
      <div
        style={{
          position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: 390,
          background: '#F9F9F7',
          borderRadius: '24px 24px 0 0',
          zIndex: 51,
          padding: '8px 22px 36px',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.18)',
          animation: 'encore-slidein 0.25s ease both',
        }}
      >
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 18px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(85,95,113,0.2)' }} />
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0 16px' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🌿</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#324E58', marginBottom: 6 }}>
              Thank you
            </div>
            <div style={{ fontSize: 13, color: '#888FA0', lineHeight: 1.6 }}>
              Your words have been left for Arun.
            </div>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1C1B', marginBottom: 4 }}>
              Leave a note for Arun
            </div>
            <div style={{ fontSize: 12, color: '#888FA0', marginBottom: 20 }}>
              Your words become part of his community page.
            </div>

            {/* Note textarea */}
            <textarea
              autoFocus
              placeholder="What did Arun help you see differently?"
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={3}
              style={{
                width: '100%', borderRadius: 14, border: '1.5px solid rgba(50,78,88,0.2)',
                padding: '12px 14px', fontSize: 14, color: '#1A1C1B', lineHeight: 1.6,
                background: 'rgba(255,255,255,0.8)', outline: 'none', resize: 'none',
                fontFamily: 'inherit', boxSizing: 'border-box', marginBottom: 12,
              }}
            />

            {/* Name + domain row */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
              <input
                placeholder="Your first name"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{
                  flex: 1, borderRadius: 12, border: '1.5px solid rgba(50,78,88,0.16)',
                  padding: '10px 14px', fontSize: 13, color: '#1A1C1B',
                  background: 'rgba(255,255,255,0.8)', outline: 'none',
                  fontFamily: 'inherit', boxSizing: 'border-box',
                }}
              />
              <input
                placeholder="Your domain"
                value={domain}
                onChange={e => setDomain(e.target.value)}
                style={{
                  flex: 1, borderRadius: 12, border: '1.5px solid rgba(50,78,88,0.16)',
                  padding: '10px 14px', fontSize: 13, color: '#1A1C1B',
                  background: 'rgba(255,255,255,0.8)', outline: 'none',
                  fontFamily: 'inherit', boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Token selection */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#324E58', letterSpacing: '0.8px', marginBottom: 10 }}>
                SEND A TOKEN (OPTIONAL)
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {TOKEN_OPTIONS.map(t => {
                  const tok = TOKENS.find(tk => tk.label === t)!;
                  const isSelected = selectedToken === t;
                  return (
                    <button
                      key={t}
                      onClick={() => setSelectedToken(isSelected ? '' : t)}
                      style={{
                        padding: '6px 14px', borderRadius: 50,
                        background: isSelected ? tok.color : tok.bg,
                        border: `1.5px solid ${isSelected ? tok.color : tok.border}`,
                        color: isSelected ? 'white' : tok.color,
                        fontSize: 13, fontWeight: 600, cursor: 'pointer',
                        transition: 'all 0.18s ease',
                      }}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              style={{
                width: '100%', padding: '15px', borderRadius: 50,
                background: canSubmit ? '#324E58' : 'rgba(50,78,88,0.15)',
                color: canSubmit ? 'white' : 'rgba(50,78,88,0.4)',
                border: 'none', fontSize: 15, fontWeight: 700,
                cursor: canSubmit ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
              }}
            >
              Leave this note
            </button>
          </>
        )}
      </div>
    </>
  );
}

// ── Main screen ──────────────────────────────────────────────────────────────

export function ForCommunity() {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [tokens, setTokens] = useState<Token[]>(TOKENS);
  const [showNoteSheet, setShowNoteSheet] = useState(false);

  const hasCompleted = INITIATIVES.some(i => i.status === 'Completed');

  function handleNoteSubmit(quote: string, name: string, domain: string, tokenLabel: string) {
    // Add testimonial
    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      quote,
      name,
      domain,
      via: 'Encore Community',
      viaGradient: 'linear-gradient(135deg, #324E58, #4A7080)',
    };
    setTestimonials(prev => [newTestimonial, ...prev]);

    // Increment token
    if (tokenLabel) {
      setTokens(prev =>
        prev.map(t => t.label === tokenLabel ? { ...t, count: t.count + 1 } : t)
      );
    }
  }

  return (
    <div
      className="encore-fadein"
      style={{ minHeight: '100%', background: '#F9F9F7', paddingBottom: 48, overflowY: 'auto' }}
    >

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '52px 20px 8px',
        }}
      >
        <button
          onClick={() => navigate('/profile')}
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
          Profile
        </button>

        {/* Leave a note CTA — top right */}
        <button
          onClick={() => setShowNoteSheet(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: '#324E58', border: 'none',
            borderRadius: 50, padding: '8px 16px',
            color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(50,78,88,0.28)',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
          Leave a note
        </button>
      </div>

      {/* ── Page title ───────────────────────────────────────────────────── */}
      <div style={{ padding: '20px 20px 24px' }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#1A1C1B', letterSpacing: '-0.5px', marginBottom: 6 }}>
          For Community
        </div>
        <div style={{ fontSize: 14, color: '#888FA0', lineHeight: 1.55 }}>
          Arun's initiatives, and what the community built around them.
        </div>
      </div>

      {/* ── Initiative Log ────────────────────────────────────────────────── */}
      <div style={{ padding: '0 20px 32px' }}>
        <SectionLabel
          color="linear-gradient(180deg, #324E58, #4A7080)"
          label="INITIATIVES"
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {INITIATIVES.map(item => (
            <InitiativeCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* ── Community Voice (conditional) ─────────────────────────────────── */}
      {hasCompleted ? (
        <>
          {/* ── Gratitude Tokens ──────────────────────────────────────────── */}
          <div style={{ padding: '0 20px 28px' }}>
            <SectionLabel
              color="linear-gradient(180deg, #D4A373, #C4834A)"
              label="WHAT THE COMMUNITY NOTICES"
            />
            <div
              style={{
                background: 'rgba(255,255,255,0.78)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(85,95,113,0.1)',
                borderRadius: 20,
                padding: '18px 18px 16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              }}
            >
              <p style={{ margin: '0 0 16px', fontSize: 12, color: '#888FA0', lineHeight: 1.55 }}>
                Tokens sent by people Arun has connected with — not ratings, but named qualities others have recognised.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {tokens.map(token => (
                  <div
                    key={token.label}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '11px 14px',
                      background: token.bg,
                      border: `1px solid ${token.border}`,
                      borderRadius: 14,
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 700, color: token.color }}>
                      {token.label}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: token.color }}>
                      <TokenDots count={token.count} />
                      <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.7 }}>
                        ×{token.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Words Left Behind ────────────────────────────────────────── */}
          <div style={{ padding: '0 20px 28px' }}>
            <SectionLabel
              color="linear-gradient(180deg, #6C63FF, #9B8FFF)"
              label="WORDS LEFT BEHIND"
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {testimonials.map((t, idx) => (
                <div
                  key={t.id}
                  style={{
                    background: 'rgba(255,255,255,0.78)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(85,95,113,0.1)',
                    borderRadius: 20,
                    padding: '18px 18px 14px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
                    animation: idx === 0 && testimonials.length > INITIAL_TESTIMONIALS.length
                      ? 'encore-fadein 0.4s ease both'
                      : undefined,
                  }}
                >
                  {/* Opening quote mark */}
                  <div style={{ fontSize: 32, lineHeight: 1, color: 'rgba(50,78,88,0.12)', marginBottom: 4, fontFamily: 'Georgia, serif' }}>
                    "
                  </div>
                  <p
                    style={{
                      margin: '0 0 14px', fontSize: 14, color: '#444C58',
                      lineHeight: 1.7, fontStyle: 'italic',
                    }}
                  >
                    {t.quote}
                  </p>

                  {/* Attribution row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {/* Monogram */}
                      <div
                        style={{
                          width: 28, height: 28, borderRadius: '50%',
                          background: t.viaGradient,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 11, fontWeight: 700, color: 'white',
                          flexShrink: 0,
                        }}
                      >
                        {t.name[0]}
                      </div>
                      <div>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1C1B' }}>
                          {t.name}
                        </span>
                        <span style={{ fontSize: 12, color: '#888FA0' }}> · {t.domain}</span>
                      </div>
                    </div>

                    {/* Via initiative chip */}
                    <div
                      style={{
                        display: 'flex', alignItems: 'center', gap: 5,
                        padding: '3px 10px', borderRadius: 50,
                        background: 'rgba(50,78,88,0.06)',
                        border: '1px solid rgba(50,78,88,0.12)',
                        maxWidth: 130, overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                          background: t.viaGradient,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 10, fontWeight: 600, color: '#555F71',
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        }}
                      >
                        {t.via}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Leave a note — bottom CTA */}
            <button
              onClick={() => setShowNoteSheet(true)}
              style={{
                width: '100%', marginTop: 14,
                padding: '14px', borderRadius: 50,
                background: 'transparent',
                border: '1.5px dashed rgba(50,78,88,0.28)',
                color: '#324E58', fontSize: 14, fontWeight: 600,
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 8,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add your words
            </button>
          </div>
        </>
      ) : (
        /* ── Locked state ─────────────────────────────────────────────── */
        <div style={{ padding: '0 20px 28px' }}>
          <div
            style={{
              background: 'rgba(255,255,255,0.5)',
              backdropFilter: 'blur(12px)',
              border: '1.5px dashed rgba(85,95,113,0.2)',
              borderRadius: 20,
              padding: '32px 24px',
              textAlign: 'center',
            }}
          >
            {/* Faint token preview */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 20, opacity: 0.25 }}>
              {TOKENS.map(t => (
                <div
                  key={t.label}
                  style={{
                    padding: '6px 14px', borderRadius: 50,
                    background: t.bg, border: `1px solid ${t.border}`,
                    color: t.color, fontSize: 12, fontWeight: 600,
                  }}
                >
                  {t.label}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 22, marginBottom: 10 }}>🌱</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#324E58', marginBottom: 8 }}>
              Community feedback is waiting
            </div>
            <p style={{ margin: 0, fontSize: 13, color: '#888FA0', lineHeight: 1.65 }}>
              This space unlocks once your first initiative is complete. Every chapter starts somewhere.
            </p>
          </div>
        </div>
      )}

      {/* ── Leave a note sheet ───────────────────────────────────────────── */}
      {showNoteSheet && (
        <LeaveNoteSheet
          onClose={() => setShowNoteSheet(false)}
          onSubmit={handleNoteSubmit}
        />
      )}
    </div>
  );
}