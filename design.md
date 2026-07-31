---
version: alpha
name: Dhan store Dark Gold
description: A dark, game-oriented storefront system with gold accents, soft inset surfaces, and compact navigation.
colors:
  primary: "#F0B23A"
  secondary: "#DDDDDD"
  tertiary: "#FFFFFF"
  neutral: "#191716"
  surface: "#1F1B19"
  on-surface: "#FFFFFF"
  border: "#141518"
  muted: "#464646"
  success: "#28A745"
  error: "#D94B4B"
  gold-deep: "#6A4A18"
  gold-soft: "#8A6A2C"
typography:
  headline-display:
    fontFamily: ui-sans-serif
    fontSize: 32px
    fontWeight: 700
    lineHeight: 38px
    letterSpacing: 0px
  headline-lg:
    fontFamily: ui-sans-serif
    fontSize: 26px
    fontWeight: 700
    lineHeight: 31px
    letterSpacing: 0px
  headline-md:
    fontFamily: Barlow
    fontSize: 21px
    fontWeight: 600
    lineHeight: 25px
    letterSpacing: 0.28px
  headline-sm:
    fontFamily: ui-sans-serif
    fontSize: 17px
    fontWeight: 400
    lineHeight: 19.6px
    letterSpacing: 0px
  body-lg:
    fontFamily: ui-sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0px
  body-md:
    fontFamily: ui-sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 22.4px
    letterSpacing: 0px
  body-sm:
    fontFamily: ui-sans-serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 18px
    letterSpacing: 0px
  label-lg:
    fontFamily: ui-sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0px
  label-md:
    fontFamily: ui-sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 18px
    letterSpacing: 0px
  label-sm:
    fontFamily: ui-sans-serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
    letterSpacing: 0px
  caption:
    fontFamily: ui-sans-serif
    fontSize: 11px
    fontWeight: 400
    lineHeight: 14px
    letterSpacing: 0px
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
spacing:
  xs: 2px
  sm: 8px
  md: 12px
  lg: 20px
  xl: 28px
  2xl: 56px
components:
  button-primary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.neutral}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.sm}"
    padding: 8px 16px
    height: 40px
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.sm}"
    padding: 8px 16px
    height: 40px
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 0px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.tertiary}"
    rounded: "{rounded.sm}"
    padding: 8px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.tertiary}"
    rounded: "{rounded.sm}"
    padding: 8px 12px
    height: 40px
  nav-item:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: 4px 8px
  nav-item-active:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: 4px 8px
  chip:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.tertiary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 4px 10px
  badge:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  topbar:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
    height: 68px
---
# Dhan store Dark Gold

## Overview
This interface feels premium, compact, and esports-adjacent, with a strong dark mode foundation and bright gold accents that signal energy and reward. The visual tone is serious rather than playful, but the heavy contrast and glowing gold details keep it lively and recognizably gaming-oriented. Layouts are dense and efficient, favoring quick scanning and fast actions over editorial spaciousness.

## Colors
- **Primary (#F0B23A):** A warm gold used for active navigation states, emphasis, and brand highlights. It carries the most energy in the system and should be reserved for key actions and selected indicators.
- **Secondary (#DDDDDD):** The main light neutral for text, outlined buttons, and iconography on dark surfaces. It reads as soft silver-white rather than stark white, helping reduce glare.
- **Tertiary (#FFFFFF):** Pure white for the strongest text contrast and the brightest highlights. Use it sparingly for high-importance content and inset card treatment.
- **Neutral (#191716):** The base page and top-bar background, a near-black with a warm undertone. It provides the cinematic, subdued backdrop for the whole UI.
- **Surface (#1F1B19):** A slightly lifted dark surface for panels, cards, and containers. It separates content from the page without breaking the dark theme.
- **On-surface (#FFFFFF):** The preferred text color on dark cards and elevated surfaces when maximum readability is needed.
- **Border (#141518):** A near-black border color for subtle separations and structural edges. It keeps outlines restrained and avoids visible harshness.
- **Muted (#464646):** A mid-dark gray for card fills, secondary surfaces, and less prominent UI blocks. It supports the inset, metallic feel seen in the screenshot.
- **Success (#28A745):** Reserved for positive states such as completed actions or confirmations.
- **Error (#D94B4B):** Used for destructive states, validation errors, or warnings that need immediate attention.
- **Gold-deep (#6A4A18):** A shadowed amber-brown for gradients, depth, and richer gold styling.
- **Gold-soft (#8A6A2C):** A softer companion gold for subtle highlights and atmospheric glows.

## Typography
The typography system is compact, sans-serif, and optimized for clarity in a dense interface. Headlines use bold weights for hierarchy, while the body remains regular and restrained to preserve readability on dark backgrounds. Barlow is the accent display family for stronger headings, giving the brand a slightly more athletic and modern edge.

- `headline-display` and `headline-lg` are bold UI sans-serif levels for page titles and section anchors.
- `headline-md` uses Barlow with a slight positive letter-spacing feel, ideal for prominent category labels.
- `headline-sm` is a lighter heading style for compact titles and interface labels.
- `body-lg`, `body-md`, and `body-sm` cover content and support copy, with the 14px body size appearing especially aligned to the source.
- `label-lg`, `label-md`, `label-sm`, and `caption` support navigation, chips, and metadata.
- Uppercase is not dominant; instead, the system relies on weight, contrast, and spacing rather than letter-case decoration.

## Layout & Spacing
The layout is structured around a full-width dark shell with compact top navigation and large content modules. Spacing is modest and deliberate, with the strongest rhythm coming from 2px micro-gaps up through 56px section separation. Cards and content blocks use tight internal padding, suggesting a high-density browsing experience where visual economy matters more than airy whitespace.

Use the spacing scale consistently:
- `xs` for fine borders, icon/text proximity, and inset details.
- `sm` and `md` for button padding, chip spacing, and compact stack gaps.
- `lg` and `xl` for major section separation and panel breathing room.
- `2xl` for distinct page-level spacing between hero regions and content bands.

## Elevation & Depth
The system is intentionally low-elevation and mostly flat, with depth created through tonal layering instead of large shadows. Subtle inset highlights and dark borders define surfaces, giving the UI a polished, metallic, slightly embossed feel. The result is premium but controlled: hierarchy comes from contrast, surface tone, and inner glows rather than pronounced floating cards.

## Shapes
The shape language is soft but disciplined, centered on small radii. The default feel is architectural and compact, with rounded corners just enough to soften the dark surfaces without making the UI playful. `rounded.sm` is the primary radius for buttons, cards, and inputs, while `rounded.full` is reserved for pills, badges, and compact chips.

## Components
Buttons are concise and utility-driven:
- `button-primary` is the main call to action, using gold-light fills with dark text for strong emphasis.
- `button-secondary` is the outlined dark-mode alternative, relying on transparency and a light border.
- `button-link` is minimal, text-only, and underlined for low-priority navigation or helper actions.
- Buttons should remain compact at `height: 40px` with `padding: 8px 16px`, matching the observed control density.
- Hover states should increase contrast slightly, not add large shadows.

Cards and panels:
- `card` uses a dark surface with a subtle inset highlight, keeping content blocks visually contained.
- Cards should favor tight `padding: 8px` unless a layout explicitly needs more separation.
- Border treatment should remain subdued; avoid bright outlines unless the card is active or interactive.

Inputs:
- Inputs should visually match the dark surface language with restrained borders and `rounded.sm`.
- Focus states should use gold or light neutral emphasis rather than colorful glows.
- Keep input heights around 40px for consistency with button controls.

Navigation and small atoms:
- `nav-item` and `nav-item-active` should stay compact, icon-friendly, and text-light.
- Active navigation uses `colors.primary` for emphasis, while inactive items stay in `colors.secondary`.
- `chip` and `badge` should be fully rounded, small, and high-contrast.
- Use badges for counts or status markers, not for heavy text content.

## Do's and Don'ts
- Do keep the interface dark-first, using gold as the primary accent rather than a background color.
- Do use small radii and tight padding to preserve the efficient, game-store feel.
- Do emphasize active states with color and weight instead of heavy shadows.
- Do prefer 14px body text for dense lists and navigation labels.
- Don't introduce large drop shadows or glossy skeuomorphic effects.
- Don't use bright saturated accent colors that compete with the gold brand tone.
- Don't make cards overly spacious or editorial; the source favors compact, functional grouping.
- Don't round everything to pill shapes unless the component is explicitly a chip or badge.