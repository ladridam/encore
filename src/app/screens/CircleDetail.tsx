import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { circles } from '../data';

export function CircleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const circle = circles.find((c) => c.id === id) ?? circles[0];
  const [joined, setJoined] = useState(false);
  const [toast, setToast] = useState(false);

  const handleJoin = () => {
    setJoined(true);
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  // Color map for member avatar backgrounds
  const avatarColors = [
    '#324E58', '#6C63FF', '#D4A373', '#2D6A4F', '#8B5CF6', '#059669',
  ];

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
      {/* Gradient header */}
      <div
        style={{
          background: circle.gradient,
          padding: '60px 24px 28px',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        {/* Soft illustration overlay */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.08,
            pointerEvents: 'none',
          }}
          viewBox="0 0 400 200"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="320" cy="40" r="80" fill="white" />
          <circle cx="60" cy="160" r="60" fill="white" />
          <circle cx="200" cy="100" r="40" fill="white" />
        </svg>

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
            background: 'rgba(255,255,255,0.22)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.3)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Emoji */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 20,
            background: 'rgba(255,255,255,0.22)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 30,
            marginBottom: 14,
            border: '1px solid rgba(255,255,255,0.3)',
          }}
        >
          {circle.emoji}
        </div>

        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: 'white',
            marginBottom: 6,
            lineHeight: 1.25,
            letterSpacing: '-0.3px',
          }}
        >
          {circle.name}
        </h1>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', gap: 4 }}>
            👥 {circle.members} members
          </span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', gap: 4 }}>
            📍 {circle.distance}
          </span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', gap: 4 }}>
            📅 {circle.nextMeetup}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 24px 0', flex: 1 }}>
        {/* Host */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 16px',
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(85,95,113,0.1)',
            borderRadius: 16,
            marginBottom: 20,
            boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #324E58, #4A7080)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 14,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {circle.host.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <div style={{ fontSize: 13, color: '#555F71', marginBottom: 1 }}>Hosted by</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1C1B' }}>{circle.host}</div>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1C1B', marginBottom: 8 }}>About this circle</div>
          <p style={{ fontSize: 15, color: '#555F71', lineHeight: 1.65 }}>{circle.description}</p>
        </div>

        {/* Members */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1C1B', marginBottom: 12 }}>Members</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: -8 }}>
            {circle.memberInitials.map((init, i) => (
              <div
                key={i}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: avatarColors[i % avatarColors.length],
                  border: '2px solid #F9F9F7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'white',
                  marginLeft: i > 0 ? -10 : 0,
                  zIndex: circle.memberInitials.length - i,
                  flexShrink: 0,
                }}
              >
                {init}
              </div>
            ))}
            {circle.members > circle.memberInitials.length && (
              <div
                style={{
                  marginLeft: -10,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'rgba(85,95,113,0.15)',
                  border: '2px solid #F9F9F7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#555F71',
                  flexShrink: 0,
                }}
              >
                +{circle.members - circle.memberInitials.length}
              </div>
            )}
          </div>
        </div>

        {/* Venue & Next Meetup */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              padding: '14px 16px',
              background: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(85,95,113,0.1)',
              borderRadius: 14,
            }}
          >
            <div style={{ fontSize: 12, color: '#555F71', marginBottom: 4 }}>Next meetup</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1C1B' }}>📅 {circle.nextMeetup}</div>
          </div>
          <div
            style={{
              padding: '14px 16px',
              background: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(85,95,113,0.1)',
              borderRadius: 14,
            }}
          >
            <div style={{ fontSize: 12, color: '#555F71', marginBottom: 4 }}>Venue</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1C1B', lineHeight: 1.3 }}>
              📍 {circle.venue}
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{ padding: '0 24px 40px' }}>
        <button
          onClick={handleJoin}
          disabled={joined}
          style={{
            width: '100%',
            padding: '17px 24px',
            borderRadius: 50,
            background: joined ? 'rgba(50,78,88,0.1)' : '#324E58',
            color: joined ? '#324E58' : 'white',
            fontSize: 17,
            fontWeight: 600,
            border: joined ? '1.5px solid rgba(50,78,88,0.3)' : 'none',
            cursor: joined ? 'default' : 'pointer',
            marginBottom: 12,
            minHeight: 54,
            boxShadow: joined ? 'none' : '0 4px 16px rgba(50,78,88,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'all 0.25s ease',
          }}
        >
          {joined ? (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#324E58" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Joined ✓
            </>
          ) : (
            'Join this Circle'
          )}
        </button>
        {!joined && (
          <p style={{ textAlign: 'center', fontSize: 13, color: '#555F71' }}>
            You can leave at any time.
          </p>
        )}
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
          🎉 You've joined {circle.name}!
        </div>
      )}
    </div>
  );
}
