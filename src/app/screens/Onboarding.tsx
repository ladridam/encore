import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { EncoreLogo } from '../components/EncoreLogo';

export function Onboarding() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'signup' | 'login'>('signup');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleLogin = () => {
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    navigate('/home');
  };

  const switchTo = (m: 'signup' | 'login') => {
    setEmail('');
    setEmailError('');
    setMode(m);
  };

  return (
    <div
      className="encore-fadein"
      style={{
        minHeight: '100%',
        background: '#F9F9F7',
        display: 'flex',
        flexDirection: 'column',
        padding: '52px 28px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative gradient orbs */}
      <div
        style={{
          position: 'absolute',
          top: -60,
          right: -40,
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(50,78,88,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 120,
          left: -60,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Logo ─────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 40 }}>
        <EncoreLogo iconSize={56} wordmarkSize={30} />
      </div>

      {/* Hero content */}
      <div style={{ flex: 1 }}>
        <h1
          style={{
            fontSize: 30,
            fontWeight: 700,
            color: '#1A1C1B',
            lineHeight: 1.25,
            marginBottom: 16,
            letterSpacing: '-0.5px',
            transition: 'opacity 0.2s',
          }}
        >
          {mode === 'signup' ? (
            <>Your experience<br />still has a home.</>
          ) : (
            <>Welcome<br />back.</>
          )}
        </h1>
        <p
          style={{
            fontSize: 17,
            color: '#555F71',
            lineHeight: 1.65,
            marginBottom: 44,
          }}
        >
          {mode === 'signup'
            ? 'Encore connects retired professionals with local mentorship opportunities, meaningful part-time roles, and community circles that need exactly what you know.'
            : 'Sign in to pick up right where you left off.'}
        </p>

        {/* Abstract illustration — only in signup mode */}
        {mode === 'signup' && (
          <div style={{ position: 'relative', height: 130, marginBottom: 44 }}>
            <div
              style={{
                position: 'absolute', top: 0, left: '8%',
                width: 110, height: 110, borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(50,78,88,0.18) 0%, rgba(50,78,88,0.06) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute', top: 15, right: '12%',
                width: 80, height: 80, borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(108,99,255,0.15) 0%, rgba(108,99,255,0.05) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute', top: 40, left: '42%',
                width: 55, height: 55, borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(212,163,115,0.22) 0%, rgba(212,163,115,0.08) 100%)',
              }}
            />
            <svg
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.15 }}
              viewBox="0 0 300 130"
            >
              <line x1="80" y1="55" x2="170" y2="67" stroke="#324E58" strokeWidth="1.5" strokeDasharray="4 3" />
              <line x1="170" y1="67" x2="240" y2="55" stroke="#6C63FF" strokeWidth="1.5" strokeDasharray="4 3" />
            </svg>
          </div>
        )}

        {/* ── Login email form ──────────────────────────────────── */}
        {mode === 'login' && (
          <div style={{ marginBottom: 20 }}>
            {/* Email input */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '4px 6px 4px 20px',
                borderRadius: 50,
                border: emailError
                  ? '1.5px solid #E05A5A'
                  : '1.5px solid rgba(50,78,88,0.28)',
                background: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(8px)',
                marginBottom: 8,
                transition: 'border-color 0.15s',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555F71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                autoFocus
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Your email address"
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'transparent',
                  fontSize: 15,
                  color: '#1A1C1B',
                  outline: 'none',
                  minHeight: 44,
                }}
              />
            </div>
            {emailError && (
              <p style={{ fontSize: 12, color: '#E05A5A', marginLeft: 16, marginBottom: 0 }}>
                {emailError}
              </p>
            )}

            {/* Sign in CTA */}
            <button
              onClick={handleLogin}
              style={{
                width: '100%',
                padding: '17px 24px',
                borderRadius: 50,
                background: email.trim() ? '#324E58' : 'rgba(50,78,88,0.25)',
                color: 'white',
                fontSize: 17,
                fontWeight: 600,
                border: 'none',
                cursor: email.trim() ? 'pointer' : 'default',
                minHeight: 54,
                marginTop: 12,
                boxShadow: email.trim() ? '0 4px 16px rgba(50,78,88,0.25)' : 'none',
                transition: 'all 0.18s ease',
              }}
            >
              Sign in →
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '18px 0' }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(85,95,113,0.14)' }} />
              <span style={{ fontSize: 13, color: '#555F71' }}>or</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(85,95,113,0.14)' }} />
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom action area ───────────────────────────────────── */}
      <div>
        {/* Google button — present in both modes */}
        <button
          onClick={() => navigate(mode === 'signup' ? '/setup' : '/home')}
          style={{
            width: '100%',
            padding: '17px 24px',
            borderRadius: 50,
            background: mode === 'signup' ? '#324E58' : 'rgba(255,255,255,0.85)',
            color: mode === 'signup' ? 'white' : '#1A1C1B',
            fontSize: 17,
            fontWeight: 600,
            border: mode === 'signup' ? 'none' : '1.5px solid rgba(85,95,113,0.22)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            marginBottom: 12,
            minHeight: 54,
            boxShadow: mode === 'signup' ? '0 4px 16px rgba(50,78,88,0.25)' : '0 2px 8px rgba(0,0,0,0.05)',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.18s ease',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          {mode === 'signup' ? 'Continue with Google' : 'Sign in with Google'}
        </button>

        {/* Phone number — only in signup mode */}
        {mode === 'signup' && (
          <button
            onClick={() => navigate('/setup')}
            style={{
              width: '100%',
              padding: '16px 24px',
              borderRadius: 50,
              background: 'transparent',
              color: '#324E58',
              fontSize: 16,
              fontWeight: 500,
              border: '1.5px solid rgba(50,78,88,0.28)',
              cursor: 'pointer',
              minHeight: 54,
              marginBottom: 24,
              transition: 'background 0.15s',
            }}
          >
            Use phone number
          </button>
        )}

        {/* Mode toggle link */}
        <p style={{ textAlign: 'center', fontSize: 14, color: '#555F71', marginTop: mode === 'login' ? 16 : 0, marginBottom: 10 }}>
          {mode === 'signup' ? (
            <>
              Already on Encore?{' '}
              <button
                onClick={() => switchTo('login')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#324E58',
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline',
                  textDecorationColor: 'rgba(50,78,88,0.3)',
                }}
              >
                Sign in →
              </button>
            </>
          ) : (
            <>
              New to Encore?{' '}
              <button
                onClick={() => switchTo('signup')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#324E58',
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline',
                  textDecorationColor: 'rgba(50,78,88,0.3)',
                }}
              >
                Create account
              </button>
            </>
          )}
        </p>

        {/* Privacy note — only in signup */}
        {mode === 'signup' && (
          <p style={{ textAlign: 'center', fontSize: 13, color: '#555F71', lineHeight: 1.6 }}>
            We only take your name and email.{' '}
            <span style={{ color: '#324E58', fontWeight: 600 }}>You're always in control.</span>
          </p>
        )}
      </div>
    </div>
  );
}