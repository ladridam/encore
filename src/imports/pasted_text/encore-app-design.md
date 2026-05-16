You are building a mobile-optimized web application called "Encore" — a dignified platform that connects retired professionals with local mentorship, part-time gigs, and community circles. It is NOT a generic job board or social network. The design must feel calm, trustworthy, and senior-friendly, using glassmorphism, warm minimalism, and an AI sidekick that explains its recommendations without being intrusive.

CORE PHILOSOPHY:
- Zero-prompt home screen: recommendations are already visible when the user opens the app. No empty states, no search bar needed by default.
- The user is always in control. The AI never decides; it only explains and suggests.
- The interface must feel like a "second-life operating system"—not a tool for decline, but for meaningful continuity.

TARGET DEVICE:
- Mobile-first (390–393px width). It should simulate a single-page app with multiple screens that the user can navigate between using a bottom tab bar and card taps.
- Use a phone-frame container to preview the app, or simply style the page to look like a native mobile app with a fixed viewport.

SCREENS TO BUILD (as separate sections or tabs):
1. **Onboarding Hello** – Minimal sign-up with a prominent "Continue with Google" button. Below it, a ghost "Use phone number" button. A trust note: "We only take your name, email, and photo. You're always in control." The logo is a simple interlocking "E" or a leaf icon.

2. **Living Library Profile (Step 2)** – A light profile setup. Pre-filled name and email from Google. Two chip groups: "I was a…" (Teacher, Engineer, Administrator, Doctor, Manager, + Other) and "I can guide in…" (Mentoring, Strategy, Operations, Teaching, Creative, + Add). Below, an optional amber "Enrich from LinkedIn" button. At the bottom, a primary "Enter Encore" button and a small "Skip for now" link. Do NOT ask for a date of birth or graduation year.

3. **Home – "For You" (the heart of the app)** – A greeting "Good morning, Arun" with a subtitle "Based on your week and nearby needs". Then an AI whisper strip: a subtle indigo-tinted banner that says "✦ 3 matches for you today — a robotics team nearby needs your guidance." with a clickable "Why?" that expands an explanation panel listing the data points (your profile, location, schedule, interests). Below, a horizontal swipeable carousel of glass cards for mentorship/gigs. Each card shows an icon, type label (Mentorship / Part-time gig), title, distance, time commitment, and a "Why this?" link. Then a list of community circles: Classical Music Circle, Urban Gardeners, Storytellers' Circle, each with member count, distance, and next meetup. A floating AI sidekick pill (indigo glow) sits at the bottom-right corner, pulsing gently. Tapping it also opens the AI explanation.

4. **Opportunity Detail** – Accessed by tapping a card. Shows a map placeholder, title, quick facts (type, time, location, participants), a "What's needed" description, and a prominent **"Why This for You" glass panel** with indigo accent that explains the AI's reasoning in natural language. A large "I'm Interested" button and a reassurance "No commitment yet. Just a respectful ping."

5. **Community Circle Detail** – Similar detail view with a soft illustration or gradient, description, host name, members avatars, next meetup, and a "Join this Circle" button. After joining, it shows a "Joined ✓" confirmation.

6. **My Encore** – A personal dashboard. Shows active connections (with status: "Connection Pending" in amber, "Joined" in teal) and an Impact Snapshot card (e.g., "🌱 2 young builders guided, 🎵 1 circle joined, 💡 3 insights shared"). No gamification, no points.

DESIGN SYSTEM (STRICTLY ENFORCE):
- **Colors:** Primary: #324E58 (teal-gray), Surface/Background: #F9F9F7 (warm ivory), AI accent: #6C63FF (indigo), Amber: #D4A373. Text: #1A1C1B. Secondary text: #555F71.
- **Typography:** Inter font family. Body text must be 16–18px, headlines 20–26px. Line height 1.5–1.6.
- **Glassmorphism:** All cards and panels use `background: rgba(255,255,255,0.7); backdrop-filter: blur(12px); border: 1px solid rgba(85,95,113,0.1); box-shadow: 0 4px 24px rgba(0,0,0,0.03);`. Buttons use solid fills.
- **Shapes:** Pill-shaped buttons (full radius), cards with 16–20px border radius. Chips are rounded-full.
- **Spacing:** Generous. Minimum 16px between elements, 24–32px padding in cards.
- **Touch targets:** At least 48x48px for interactive elements.
- **Icons:** Use "Material Symbols Outlined" from Google Fonts. Use icons like `school`, `groups`, `music_note`, `volunteer_activism`, `explore`, `calendar_month`, `person`.
- **No stock photos of old people.** Instead, use soft abstract gradients or subtle illustrations that feel warm and professional.

BEHAVIOR & INTERACTIONS:
- Navigation: Bottom tab bar with three items: "For You", "My Encore", "Profile". Tapping switches screens smoothly.
- Card taps: Navigate to detail screens (you can simulate with DOM changes or scroll).
- AI sidekick: Floating 56x56px pill in bottom-right, indigo glow, pulsing animation. On tap, it expands or reveals the AI reasoning panel.
- "Why?" links: Toggle an inline indigo panel showing the reasoning.
- Buttons: "I'm Interested" and "Join Circle" show a brief toast and then update the UI (e.g., "Request Sent ✓" or "Joined ✓").

CONSTRAINTS (CRITICAL):
- **DO NOT include any year or date like "2024" or "2025" anywhere.** Not in the footer, not in copyright, not in sample text. If a copyright is needed, use "© Encore. All rights reserved." without a year.
- Do not use placeholder images of people. Use abstract gradients or CSS shapes for any decorative visuals.
- Make the entire experience feel like a calm, trusted companion, not a generic corporate SaaS.
- The app must be fully functional as a single HTML file with embedded CSS and JS. Use Tailwind CSS CDN if helpful, but prioritize clean, readable code.
- The hero text: "Retirement should not feel like disappearance." should appear somewhere subtly, maybe in the onboarding or as a tagline.

Generate the complete HTML code now. Ensure it works on a mobile viewport and contains all six screens with the described interactions.