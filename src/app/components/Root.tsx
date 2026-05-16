import React from 'react';
import { Outlet, useLocation } from 'react-router';
import { BottomNav } from './BottomNav';

const MAIN_NAV_PATHS = ['/home', '/my-encore', '/community', '/profile', '/opportunity', '/circle'];

export function Root() {
  const location = useLocation();
  const showNav = MAIN_NAV_PATHS.some((p) => location.pathname.startsWith(p));

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#E8E6E0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Desktop: subtle background pattern */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'radial-gradient(ellipse at 30% 20%, rgba(50,78,88,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(108,99,255,0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Phone frame */}
      <div
        className="encore-app"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 393,
          height: '100svh',
          maxHeight: 844,
          background: '#F9F9F7',
          overflow: 'hidden',
          zIndex: 1,
          // Desktop: phone frame styling
          boxShadow: 'none',
        }}
      >
        {/* Desktop phone border */}
        <style>{`
          @media (min-width: 440px) {
            .phone-frame-outer {
              border-radius: 44px !important;
              box-shadow: 0 32px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.15) !important;
            }
          }
          @media (max-width: 439px) {
            .phone-frame-outer {
              border-radius: 0 !important;
              box-shadow: none !important;
              max-height: 100svh !important;
            }
          }
        `}</style>
        <div
          className="phone-frame-outer"
          style={{
            position: 'absolute',
            inset: 0,
            background: '#F9F9F7',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            transform: 'translateZ(0)', // creates containing block for position:fixed children
          }}
        >
          {/* Scrollable content area */}
          <div
            className="encore-scroll"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: showNav ? 64 : 0,
              overflowY: 'auto',
            }}
          >
            <Outlet />
          </div>

          {/* Bottom navigation */}
          {showNav && <BottomNav />}
        </div>
      </div>
    </div>
  );
}