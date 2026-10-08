# Master Design System: Luxury Romantic Wedding Invitation
**Theme:** Sage Green, Old Pink (Vintage Rose) & Warm Beige
**Style:** Luxury Editorial + Romantic Glassmorphism + Mobile-First Fluid UX

---

## 1. Design Tokens & Color Palette

| Token | Hex | Usage |
|---|---|---|
| `sage.50` | `#F4F7F4` | Light surface tint, pill background |
| `sage.200` | `#C9D8C8` | Border accents, subtle dividers |
| `sage.500` | `#5F7F5E` | Botanical icons, medium emphasis |
| `sage.700` | `#354834` | Primary buttons, deep headings |
| `sage.900` | `#1A241B` | Deep velvet countdown, high contrast text |
| `oldpink.50` | `#FAF3F3` | Soft blush tint |
| `oldpink.200` | `#E8C9C7` | Petal highlights |
| `oldpink.500` | `#A75F5C` | Romantic script accents, hearts |
| `oldpink.700` | `#6F3533` | Calligraphy couple names, decline buttons |
| `beige.50` | `#FCFAF7` | Parchment background, card interiors |
| `beige.100` | `#F8F3EC` | Container canvas base |
| `beige.300` | `#DDD0BB` | Hairline card borders, vintage frame accents |
| `champagne.500` | `#B29C7D` | Gold foil metallic accents, seal ring |

---

## 2. Typography Scale

- **Display Script**: `Great Vibes`, cursive (Groom & Bride display names, opening header)
- **Monogram / Badges**: `Cinzel`, serif (Uppercase tracking `0.25em`, luxury seals, dates)
- **Editorial Headings**: `Playfair Display`, serif (Section titles, quotes, vows)
- **Body & UI**: `Plus Jakarta Sans`, sans-serif (Form inputs, countdown tabular numbers, itinerary details)

---

## 3. UI/UX Rules & Interaction Standards (UI-UX-PRO-MAX Checklist)

- **Touch Target Minimum**: All interactive elements (buttons, inputs, icons, switches) ≥ 44×44px.
- **Micro-interactions**: 150–250ms easing with subtle scale (`whileTap: 0.96`, `whileHover: 1.02`).
- **Surface Elevation**: Multi-layered frosted glass (`backdrop-blur-md`, `border: 1px solid rgba(221, 208, 187, 0.7)`).
- **Audio Autoplay & Fallback**: YouTube IFrame API preloaded with volume unmuting on envelope interaction + fallback controls.
- **Accessibility & Contrast**: Text contrast ≥ 4.5:1 against light and dark surfaces. Respects `prefers-reduced-motion`.
- **Forms & Feedback**: Instant validation, clear error boundaries, copy-to-clipboard toasts, confetti celebration on RSVP.
