# Grok Build Peer Review Task Card: Orbit LockScreen Studio

## Context
We built a production-grade web application for the official **Google × Handshake AI Skills Studio Contest** (*"Your Deadline, Your Design: Create a Countdown Lock Screen"*).
- **Target Repository:** `/Users/saskymali/Documents/Coding Projects/orbit-lockscreen`
- **Tech Stack:** React 18, TypeScript, Tailwind CSS, `html-to-image`, `canvas-confetti`.

---

## Your Objectives as Red-Team Reviewer
1. **Auditing the Codebase:**
   - Review `/src/components/WallpaperCanvas.tsx`, `/src/components/ControlPanel.tsx`, and `/src/lib/countdown.ts`.
   - Ensure negative-space clock mock doesn't shift or overlap lock screen text on small screens.
   - Verify `html-to-image` Retina canvas export behavior with light/dark themes.
2. **Build Diagnostics:**
   - Execute:
     ```bash
     cd "/Users/saskymali/Documents/Coding Projects/orbit-lockscreen"
     npm run build
     ```
   - Report bundle sizes and verify 0 TypeScript/ESLint compiler warnings.
3. **Deployment Recommendation:**
   - Verify Vercel / Netlify compatibility for zero-configuration static deployment so Sasky has an instant live URL (`Project Link / URL`) for Handshake.
