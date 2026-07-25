# Phase 3: Stitch-Aligned UI Integration Spec

## 1. Objective
Implement C3 checkout UI exactly within the visual language and interaction patterns from the Stitch Zepto mobile package while preserving zero-friction checkout.

## 2. Source Design Assets
Primary references from Stitch package:
- stitch_zepto_mobile_ui/stitch_zepto_quick_commerce_mobile_ui/velocity_dark_mode/DESIGN.md
- stitch_zepto_mobile_ui/stitch_zepto_quick_commerce_mobile_ui/checkout_with_ai_cross_sell/code.html
- stitch_zepto_mobile_ui/stitch_zepto_quick_commerce_mobile_ui/electronics_trust_overlay/code.html
- stitch_zepto_mobile_ui/stitch_zepto_quick_commerce_mobile_ui/shopping_cart_2/code.html
- stitch_zepto_mobile_ui/stitch_zepto_quick_commerce_mobile_ui/final_checkout_confirmation/code.html

## 3. Visual and UX Baseline
- Theme: high-contrast dark mode with premium neon-accent commerce aesthetic.
- Typography: Plus Jakarta Sans only.
- Primary action style: purple to magenta gradient CTA.
- Card style: dark layered surfaces with subtle outline and glassmorphism accents.
- Spacing: 4px system with 16px mobile margins.

## 4. C3 Widget Placement
Placement rule:
- Insert C3 card immediately above the primary checkout payment CTA.
- Keep card inside the cart summary flow, not in a separate discover tab.

Layout rule:
- Single recommendation card only.
- Card sections:
  - scenario pill
  - recommendation title and brand subtitle
  - price
  - trust badge strip
  - add button

## 5. Required Widget States

### State A: Loading (non-blocking)
- Show compact skeleton card while checkout remains fully interactive.
- If response exceeds non-blocking threshold, remove skeleton and continue checkout.

### State B: Contextual Recommendation
- Show scenario chip and one recommendation.
- Show trust badge text if category is non-FMCG.
- Add action button: Add (No Extra Delivery Fee).

### State C: Trust Detail Overlay
- For electronics and similar categories, tap on trust badge opens bottom-sheet overlay.
- Overlay mirrors electronics_trust_overlay interaction pattern.
- Must include:
  - warranty detail
  - return or replacement detail
  - authenticity or verification detail

### State D: Fallback
- If C3 fails or times out, show static recommendation style defined by control variant.
- If no safe recommendation exists, hide widget without layout shift near CTA.

## 6. Motion and Micro-interactions
- Keep current Stitch-like active scale feedback on actionable elements.
- Use bottom-sheet motion curve for trust detail reveal.
- Do not add heavy animations that delay interaction.

## 7. Accessibility and Usability Requirements
- Trust badge and add action must have screen-reader labels.
- Maintain minimum 44px touch targets.
- Preserve sufficient contrast on dark surfaces.
- Prevent overlap with sticky bottom CTA on small devices.

## 8. UI Event Hooks (Client)
Attach instrumentation at these points:
- widget render visible: c3_widget_impression
- card tap: c3_widget_click
- add button success: c3_widget_add_to_cart
- explicit close action: c3_widget_dismiss
- trust details overlay open event to be captured as click target = badge_info

## 9. Variant Rules in UI
- Variant A: no widget slot rendered.
- Variant B: static recommendation component.
- Variant C: contextual C3 widget with scenario plus trust.

Variant must remain sticky for a user across sessions.

## 10. Device Coverage
Mandatory target matrix:
- Android low-end and mid-tier devices
- iOS standard and compact screens
- narrow width screens where bottom CTA and widget coexist

## 11. Acceptance Checklist for Design Integration
- UI visually matches Stitch references for type scale, spacing, color hierarchy, and CTA treatment.
- Widget remains non-blocking and does not delay checkout CTA interaction.
- Trust overlay opens and closes smoothly with no content jump.
- Fallback and hide behavior produce no checkout breakage.
