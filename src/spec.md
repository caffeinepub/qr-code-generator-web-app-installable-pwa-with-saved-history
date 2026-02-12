# Specification

## Summary
**Goal:** Build an installable QR code generator web app that can optionally sign in with Internet Identity to save and manage a per-user history of generated QR codes.

**Planned changes:**
- Create a QR generator screen with input (text/URL), instant preview, and validation for empty input.
- Add customization controls (size, foreground/background colors) with live preview updates and a one-click reset to defaults.
- Add PNG download for the currently previewed QR code.
- Integrate Internet Identity sign-in/sign-out and gate saved-history features behind authentication.
- Implement backend persistence (single Motoko actor) for per-user saved QR items (content, type, settings, timestamps) with create/list/delete methods and consistent ordering.
- Add a history UI to list saved items, load an item back into the generator, and delete items with confirmation.
- Add PWA installability (manifest + service worker) with basic offline shell support (excluding backend-dependent history).
- Apply a consistent responsive visual theme across generator and history screens (avoid blue & purple as primary colors).
- Add generated brand assets (logo + app icons) to the header and PWA manifest from `frontend/public/assets/generated`.

**User-visible outcome:** Users can generate customized QR codes, preview and download them as PNG, install the site as a PWA, and (when signed in with Internet Identity) save, revisit, and delete QR codes from a persistent personal history.
