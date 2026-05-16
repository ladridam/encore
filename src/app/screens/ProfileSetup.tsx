import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { EncoreLogo } from '../components/EncoreLogo';

const WAS_CHIPS = [
  'Teacher', 'Engineer', 'Administrator', 'Doctor',
  'Manager', 'Athlete', 'Nurse', 'Dramatist', 'Other',
];

const GUIDE_CHIPS = [
  'Mentoring', 'Strategy', 'Operations', 'Teaching',
  'Creative', 'Finance', 'Leadership', 'Healthcare',
  'Research', 'Communication',
];

export function ProfileSetup() {
  const navigate = useNavigate();
  const [wasSelected, setWasSelected] = useState<string[]>(['Engineer']);
  const [wasOtherText, setWasOtherText] = useState('');

  const [guideSelected, setGuideSelected] = useState<string[]>(['Mentoring', 'Strategy']);
  const [customGuideChips, setCustomGuideChips] = useState<string[]>([]);
  const [showAddGuide, setShowAddGuide] = useState(false);
  const [addGuideText, setAddGuideText] = useState('');
  const addGuideInputRef = useRef<HTMLInputElement>(null);

  const toggleWas = (chip: string) => {
    setWasSelected((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  const toggleGuide = (chip: string) => {
    setGuideSelected((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  const handleAddGuide = () => {
    const val = addGuideText.trim();
    if (val && !customGuideChips.includes(val) && !GUIDE_CHIPS.includes(val)) {
      setCustomGuideChips((prev) => [...prev, val]);
      setGuideSelected((prev) => [...prev, val]);
    }
    setAddGuideText('');
    setShowAddGuide(false);
  };

  const removeCustomGuide = (chip: string) => {
    setCustomGuideChips((prev) => prev.filter((c) => c !== chip));
    setGuideSelected((prev) => prev.filter((c) => c !== chip));
  };

  return (
    <div
      className="encore-fadein encore-scroll"
      style={{
        minHeight: '100%',
        background: '#F9F9F7',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '52px 28px 20px',
          borderBottom: '1px solid rgba(85,95,113,0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <button
            onClick={() => navigate('/onboarding')}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'rgba(50,78,88,0.08)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#324E58',
            }}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" stroke="#324E58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {/* Compact logo mark (icon only) */}
          <EncoreLogo iconSize={32} showWordmark={false} />
          <div style={{ flex: 1 }}>
            {/* Progress bar */}
            <div style={{ height: 4, background: 'rgba(50,78,88,0.1)', borderRadius: 4 }}>
              <div
                style={{
                  height: '100%',
                  width: '66%',
                  background: '#324E58',
                  borderRadius: 4,
                  transition: 'width 0.4s ease',
                }}
              />
            </div>
          </div>
          <span style={{ fontSize: 13, color: '#555F71' }}>Step 2 of 3</span>
        </div>

        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1A1C1B', marginBottom: 6, letterSpacing: '-0.3px' }}>
          Your Living Library
        </h1>
        <p style={{ fontSize: 15, color: '#555F71', lineHeight: 1.55 }}>
          Tell us a little about you — this helps us make introductions that actually matter.
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 28px', flex: 1 }}>
        {/* Avatar + pre-filled info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 28,
            padding: '16px 20px',
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(85,95,113,0.1)',
            borderRadius: 20,
            boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #324E58 0%, #4A7080 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              fontWeight: 700,
              color: 'white',
              flexShrink: 0,
            }}
          >
            AK
          </div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 600, color: '#1A1C1B', marginBottom: 2 }}>Arun Kumar</div>
            <div style={{ fontSize: 14, color: '#555F71' }}>arun.kumar@gmail.com</div>
            <div style={{ fontSize: 12, color: '#6C63FF', marginTop: 2 }}>✓ Verified via Google</div>
          </div>
        </div>

        {/* I was a... */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1C1B', marginBottom: 12 }}>
            I was a…
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {WAS_CHIPS.map((chip) => {
              const active = wasSelected.includes(chip);
              return (
                <button
                  key={chip}
                  onClick={() => toggleWas(chip)}
                  style={{
                    padding: '9px 18px',
                    borderRadius: 50,
                    fontSize: 14,
                    fontWeight: 500,
                    border: active ? '1.5px solid #324E58' : '1.5px solid rgba(85,95,113,0.2)',
                    background: active ? '#324E58' : 'rgba(255,255,255,0.7)',
                    color: active ? 'white' : '#555F71',
                    cursor: 'pointer',
                    minHeight: 40,
                    transition: 'all 0.18s ease',
                  }}
                >
                  {chip}
                </button>
              );
            })}
          </div>

          {/* "Other" specification input */}
          {wasSelected.includes('Other') && (
            <div
              style={{
                marginTop: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '4px 6px 4px 16px',
                borderRadius: 50,
                border: '1.5px solid #324E58',
                background: 'rgba(50,78,88,0.04)',
              }}
            >
              <span style={{ fontSize: 13, color: '#555F71', whiteSpace: 'nowrap' }}>
                I was a…
              </span>
              <input
                autoFocus
                type="text"
                value={wasOtherText}
                onChange={(e) => setWasOtherText(e.target.value)}
                placeholder="e.g. Diplomat, Architect…"
                maxLength={40}
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'transparent',
                  fontSize: 14,
                  color: '#1A1C1B',
                  outline: 'none',
                  minWidth: 0,
                }}
              />
              {wasOtherText.trim() && (
                <button
                  onClick={() => setWasOtherText('')}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'rgba(50,78,88,0.12)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#324E58',
                    fontSize: 14,
                  }}
                >
                  ×
                </button>
              )}
            </div>
          )}
        </div>

        {/* I can guide in... */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1C1B', marginBottom: 12 }}>
            I can guide in…
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {[...GUIDE_CHIPS, ...customGuideChips].map((chip) => {
              const active = guideSelected.includes(chip);
              const isCustom = customGuideChips.includes(chip);
              return (
                <button
                  key={chip}
                  onClick={() => isCustom ? removeCustomGuide(chip) : toggleGuide(chip)}
                  style={{
                    padding: '9px 18px',
                    borderRadius: 50,
                    fontSize: 14,
                    fontWeight: 500,
                    border: active ? '1.5px solid #324E58' : '1.5px solid rgba(85,95,113,0.2)',
                    background: active ? '#324E58' : 'rgba(255,255,255,0.7)',
                    color: active ? 'white' : '#555F71',
                    cursor: 'pointer',
                    minHeight: 40,
                    transition: 'all 0.18s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  {chip}
                  {isCustom && (
                    <span style={{ opacity: 0.7, fontSize: 13, lineHeight: 1 }}>×</span>
                  )}
                </button>
              );
            })}

            {/* + Add button / inline input */}
            {!showAddGuide ? (
              <button
                onClick={() => {
                  setShowAddGuide(true);
                  setTimeout(() => addGuideInputRef.current?.focus(), 50);
                }}
                style={{
                  padding: '9px 18px',
                  borderRadius: 50,
                  fontSize: 14,
                  fontWeight: 500,
                  border: '1.5px dashed rgba(50,78,88,0.35)',
                  background: 'transparent',
                  color: '#324E58',
                  cursor: 'pointer',
                  minHeight: 40,
                }}
              >
                + Add
              </button>
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '4px 6px 4px 14px',
                  borderRadius: 50,
                  border: '1.5px solid #6C63FF',
                  background: 'rgba(108,99,255,0.05)',
                  minHeight: 40,
                }}
              >
                <input
                  ref={addGuideInputRef}
                  type="text"
                  value={addGuideText}
                  onChange={(e) => setAddGuideText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddGuide();
                    if (e.key === 'Escape') { setShowAddGuide(false); setAddGuideText(''); }
                  }}
                  placeholder="e.g. Journalism…"
                  maxLength={30}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    fontSize: 14,
                    color: '#1A1C1B',
                    outline: 'none',
                    width: 130,
                  }}
                />
                <button
                  onClick={handleAddGuide}
                  disabled={!addGuideText.trim()}
                  style={{
                    padding: '4px 12px',
                    borderRadius: 50,
                    fontSize: 13,
                    fontWeight: 600,
                    border: 'none',
                    background: addGuideText.trim() ? '#6C63FF' : 'rgba(108,99,255,0.2)',
                    color: addGuideText.trim() ? 'white' : 'rgba(108,99,255,0.5)',
                    cursor: addGuideText.trim() ? 'pointer' : 'default',
                    transition: 'all 0.15s ease',
                    minHeight: 28,
                  }}
                >
                  Add
                </button>
                <button
                  onClick={() => { setShowAddGuide(false); setAddGuideText(''); }}
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    background: 'rgba(85,95,113,0.1)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#555F71',
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        {/* LinkedIn button */}
        <button
          style={{
            width: '100%',
            padding: '14px 20px',
            borderRadius: 50,
            background: 'rgba(212,163,115,0.12)',
            border: '1.5px solid rgba(212,163,115,0.45)',
            color: '#92622A',
            fontSize: 15,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 32,
            minHeight: 50,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          Import profile from LinkedIn
          <span style={{ fontSize: 12, opacity: 0.7 }}>— optional</span>
        </button>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '0 28px 40px',
          borderTop: '1px solid rgba(85,95,113,0.06)',
          paddingTop: 24,
        }}
      >
        <button
          onClick={() => navigate('/home')}
          style={{
            width: '100%',
            padding: '17px 24px',
            borderRadius: 50,
            background: '#324E58',
            color: 'white',
            fontSize: 17,
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            marginBottom: 16,
            minHeight: 54,
            boxShadow: '0 4px 16px rgba(50,78,88,0.25)',
          }}
        >
          Enter Encore →
        </button>
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => navigate('/home')}
            style={{
              background: 'none',
              border: 'none',
              color: '#555F71',
              fontSize: 14,
              cursor: 'pointer',
              textDecoration: 'underline',
              textDecorationColor: 'rgba(85,95,113,0.3)',
            }}
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}