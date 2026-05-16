import React from 'react';

interface EncoreLogoProps {
  /** Side length of the icon mark square, in px */
  iconSize?: number;
  /** Show the "Encore" wordmark beneath (or beside if compact) */
  showWordmark?: boolean;
  /** If true, icon + wordmark sit side-by-side instead of stacked */
  compact?: boolean;
  /** Font size for the wordmark */
  wordmarkSize?: number;
  /** Font color for the wordmark */
  wordmarkColor?: string;
}

/**
 * Encore brand logo — a clean, minimalist botanical leaf mark
 * that suggests growth, continuity, and a second life.
 *
 * The leaf silhouette is an asymmetric teardrop (wider on the right)
 * with a single central vein and two subtle secondary veins.
 * On a warm teal-gray (#324E58) rounded-square icon background.
 */
export function EncoreLogo({
  iconSize = 52,
  showWordmark = true,
  compact = false,
  wordmarkSize = 28,
  wordmarkColor = '#1A1C1B',
}: EncoreLogoProps) {
  // The SVG paths are designed for a 28×28 viewBox,
  // so we scale them uniformly with the iconSize.
  const svgDim = Math.round(iconSize * 0.58);
  const radius = Math.round(iconSize * 0.31); // ~16px at 52px

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: compact ? 'row' : 'column',
        alignItems: compact ? 'center' : 'flex-start',
        gap: compact ? 11 : 0,
      }}
    >
      {/* ── Icon mark ───────────────────────────────────────────── */}
      <div
        style={{
          width: iconSize,
          height: iconSize,
          borderRadius: radius,
          flexShrink: 0,
          marginBottom: compact ? 0 : 14,
          position: 'relative',
          overflow: 'hidden',
          /* Teal-gray base + very subtle gloss */
          background: 'linear-gradient(148deg, #3a5c6a 0%, #2b4450 100%)',
          boxShadow:
            '0 4px 18px rgba(50,78,88,0.30), inset 0 1px 0 rgba(255,255,255,0.12)',
        }}
      >
        {/* Subtle inner glow ring – gives depth without gradients that look cheesy */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: radius,
            boxShadow: 'inset 0 0 18px rgba(0,0,0,0.18)',
            pointerEvents: 'none',
          }}
        />

        {/* The leaf SVG, centered */}
        <svg
          width={svgDim}
          height={svgDim}
          viewBox="0 0 28 28"
          fill="none"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/*
            ── Leaf silhouette ─────────────────────────────────────
            A botanically-inspired asymmetric leaf.
            Stem at (14, 26), apex at (14, 2).
            The right margin bulges slightly wider than the left —
            a natural growth asymmetry.
          */}
          <path
            d="
              M 14 26
              C  9 23  5 17  6 12
              C  7  6 11  2 14  2
              C 17  2 22  6 22 12
              C 22 18 18 23 14 26
              Z
            "
            fill="white"
            fillOpacity="0.96"
          />

          {/*
            ── Central midrib vein ──────────────────────────────────
            Runs from stem to apex with a slight natural S-curve,
            rendered in a translucent teal so it's visible but whisper-soft.
          */}
          <path
            d="M 14 26 C 13.5 20 14.5 9 14 2"
            stroke="rgba(50,78,88,0.28)"
            strokeWidth="1.1"
            strokeLinecap="round"
            fill="none"
          />

          {/*
            ── Right secondary vein ─────────────────────────────────
            Upper-right lateral, angling toward the leaf margin.
          */}
          <path
            d="M 14.8 10 Q 18 9 20.5 7.5"
            stroke="rgba(50,78,88,0.18)"
            strokeWidth="0.85"
            strokeLinecap="round"
            fill="none"
          />

          {/*
            ── Left secondary vein ──────────────────────────────────
            Lower-left lateral, angling toward the opposite margin.
          */}
          <path
            d="M 13.2 17 Q 10 16.5 7.5 14.5"
            stroke="rgba(50,78,88,0.16)"
            strokeWidth="0.85"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {/* ── Wordmark ────────────────────────────────────────────── */}
      {showWordmark && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <span
            style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: wordmarkSize,
              fontWeight: 700,
              color: wordmarkColor,
              letterSpacing: '-0.6px',
              lineHeight: 1,
              display: 'block',
            }}
          >
            Encore
          </span>

          {/* Tagline – only shown in full (non-compact, larger) contexts */}
          {!compact && wordmarkSize >= 22 && (
            <span
              style={{
                display: 'block',
                marginTop: 6,
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: 13,
                fontWeight: 400,
                fontStyle: 'italic',
                color: '#555F71',
                letterSpacing: '0.1px',
                lineHeight: 1.4,
              }}
            >
              Retirement should not feel like disappearance.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
