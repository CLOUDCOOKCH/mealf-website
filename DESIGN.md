---
name: Mealf
description: A warm, practical kitchen companion that brings recipes and routines together.
colors:
  canvas: "#f8f7f1"
  paper: "#fffefb"
  ink: "#29392e"
  muted: "#657064"
  green: "#315d43"
  green-dark: "#244b35"
  sage: "#e9eddf"
  line: "#dddfd3"
  clay: "#aa4a35"
typography:
  display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "78px"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "44px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
  body-compact:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.9
  label:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.7
  button:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.5
rounded:
  tag: "5px"
  photo-label: "6px"
  tab: "8px"
  button: "9px"
  image: "10px"
  inset: "12px"
  surface: "16px"
  circle: "50%"
spacing:
  tight: "8px"
  compact: "12px"
  base: "16px"
  comfortable: "20px"
  roomy: "24px"
  panel: "28px"
  section-intro: "40px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "15px 23px"
  button-primary-hover:
    backgroundColor: "{colors.green-dark}"
  button-cream:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "15px 23px"
  text-link:
    textColor: "{colors.ink}"
    padding: "0"
  text-link-hover:
    textColor: "{colors.clay}"
  demo-tab:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.tab}"
    padding: "12px 19px"
  demo-tab-selected:
    backgroundColor: "{colors.green}"
    textColor: "{colors.paper}"
  kitchen-preview:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.surface}"
  photo-label:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.green-dark}"
    rounded: "{rounded.photo-label}"
    padding: "8px 13px"
  shopping-row:
    textColor: "{colors.ink}"
    padding: "9px 1px"
  planner-row:
    textColor: "{colors.ink}"
    padding: "12px 5px"
  inspiration-note:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.surface}"
    padding: "28px 33px 25px"
---


# Design System: Mealf

## Overview

**Creative North Star: "A Little More Together"**

Mealf feels like a welcoming kitchen with its ingredients in order. Warm ivory, muted forest green, clay accents, and the preserved peach identity bring inspiration and organization into one calm visual world. Generous space and medium-weight Manrope headlines balance compact, practical controls.

Food photography supplies appetite and texture. Interface surfaces stay quiet, using borders and tonal differences for structure. The supplied wordmark and peach artwork remain recognizable brand anchors, with their original shapes and colors preserved.

**Key Characteristics:**
- Warm paper tones, forest actions, and restrained clay emphasis.
- Self-hosted Manrope for both editorial and interface typography.
- Soft, defined geometry and mostly flat surfaces.
- Original product screenshots with clearly labeled context and readable full-size viewing.

Evidence: `dist/styles.css` supplies the tokens and geometry; `dist/showcase.css` supplies the screenshot stage and viewer; `dist/index.html` supplies components and assets; `dist/app.js` supplies interaction states. `ASSETS.json` records brand and screenshot provenance, and `PRODUCT.md` identifies this as a marketing page with real product screenshots and illustrative food photography. The source product is a development preview. Frontmatter owns primitives; the sidecar supplies extensions and component previews.

## Colors

The palette is warm and muted. Token values in frontmatter are normative.

### Primary

- **Forest Green** (`green`): primary actions, selected tabs, icons, and completion cues.
- **Deep Forest** (`green-dark`): primary hover and closing surface.

### Secondary

- **Clay** (`clay`): headline emphasis, link hover, and keyboard focus.
- **Pale Sage** (`sage`): supporting sections and quiet viewer and circular controls.

### Neutral

- **Warm Ivory** (`canvas`): page background and cream actions.
- **Kitchen Paper** (`paper`): recipe overlays, preview surfaces, and inspiration note.
- **Forest Ink** (`ink`): primary text.
- **Herb Grey** (`muted`): supporting prose, quantities, and inactive labels.
- **Warm Divider** (`line`): section and row separators.

**The Green Action Rule.** Green identifies action, selection, and completion; clay supplies restrained emphasis and focus.

## Typography

Manrope is locally hosted at `dist/assets/manrope.woff2`, with Arial and sans-serif fallbacks, `font-display: swap`, and its bundled OFL license. The same family serves display, body, navigation, and controls.

The frontmatter records desktop display, section headline, kitchen title, body, compact body, label, and button roles. Display text is medium weight with close tracking; panel titles and actions gain weight. Headings balance their wrapping. The opening headline uses discrete breakpoint sizes rather than a fluid clamp; section headings have contextual variations. Compact metadata is not a universal reading-size standard.

**The One Family Rule.** Keep Manrope across the interface. Preserve the graphic wordmark as an asset.

## Layout

The desktop container is capped at (1200px), with total outer subtraction of (112px), reducing to (72px), (48px), (40px), and (32px) as space narrows. Repeated spacing steps are recorded in frontmatter; section gaps remain contextual.

The implemented hero has two columns (1fr / 1.05fr), a desktop gap of (65px), calm headline copy on the left, and editorial food imagery with a link to the calendar screenshot on the right. This is the current page composition rather than a requirement for every screen. Food photography uses cover crops that change responsively; product screenshots preserve their full bounds.

Responsive boundaries are (1500px minimum) and (1150px), (850px), (620px), and (370px maximum). On phones the hero and supporting sections stack, feature links become rows, screenshot tabs scroll horizontally, and screenshot captions stack. The header retains its brand and GitHub action while hiding navigation links.

## Elevation & Depth

Tone and fine borders provide most depth. The rotated inspiration note uses a faint shadow; the screenshot viewer uses a dark modal backdrop. Buttons lift slightly on hover without adding a shadow.

**The Flat Kitchen Rule.** Keep ordinary containers flat; reserve the observed lifted treatment for the note.

Color changes and rotating disclosure icons are brief and purposeful. Screenshot changes are immediate. Reduced-motion preferences disable animation and transitions and use immediate scrolling.

## Shapes

The `surface` radius recurs on photography, the screenshot frame and desktop viewer, inspiration note, and closing invitation. Controls use `button` and `tab`. Context labels have tighter corners. Status dots, the hero calendar control, and the peach orbit are circular.

Thin borders and internal dividers organize content without boxing every item. Outer food and kitchen surfaces clip their contents. The peach orbit combines a fine solid circle with a larger dashed ring, leaving organic form to the original artwork.

## Components

### Buttons

Primary buttons use Forest Green and Kitchen Paper, switching to Deep Forest on hover. Cream buttons use Warm Ivory and Forest Ink on dark surfaces. Both have compact rounded geometry and a directional icon. Hover lifts them (2px); keyboard focus uses a clay outline (3px), offset (5px). Text links are unboxed and turn clay on hover.

### Chips and labels

The noninteractive photo label pairs ivory with a forest status dot. The screenshot toolbar uses compact plain labels for the product context. These labels do not act as filters.

### Cards / Containers

The screenshot frame is flat paper with an outer border, clipped corners, and a divided toolbar and caption. Controls visible inside the screenshots belong to the captured app and are not interactive on this page. The inspiration note alone combines paper, ruled sections, a slight clockwise rotation, and the faint note shadow.

### Navigation

Compact header links turn clay on hover and use the shared focus outline. The first link disappears at tablet size; all header links disappear on phones. The original graphic wordmark and GitHub action remain.

### Product screenshots

Seven original Mealf PNG screenshots replace the illustrative kitchen demo. Tabs use the existing forest selected state and quiet sage hover, with arrow-key, Home and End navigation. A flat paper frame, thin dividers, original peach control and compact screenshot label provide context without imitating application controls. Screenshots retain their full bounds in a stable 1271:789 stage. A caption names each feature; the original image remains unchanged.

Image links and Enlarge actions open a native dialog for readable original-resolution viewing. Its previous/next, fit and close controls follow the existing button vocabulary. The viewport scrolls for large screenshots; fitting is an explicit action. Escape and close restore focus, and the original-PNG link is a direct fallback. On phones, the tab strip scrolls horizontally, captions stack, and the viewer controls wrap. The existing peach slap and reduced-motion behavior remain.

### FAQ

Native disclosure rows use bottom dividers and plus icons that rotate when open. Answers sit beneath their questions; documentation links remain underlined.

### Self-hosting guide

The complete single-container Compose YAML sits beside a sticky introduction on larger screens. At 680px it stacks into one column. Forest code blocks provide copy controls and a downloadable YAML. The image-registry and release links sit beside the configuration, with concise startup instructions below. Polite feedback reports copy outcomes. The wiki installation page renders the same authoritative YAML source.

### Peach interaction

All peach mascots are native buttons with the shared clay focus outline. A click, tap, Enter, or Space triggers one short Web Animations sequence: a cream hand sweeps in (330ms), the original image squashes and settles (720ms), and a clay slap mark plus “SMACK!” label fade out. Repeated activation cancels and restarts the same effect. Feedback clears after 850ms. Reduced motion shows the mark and label without moving the image or hand; a preference change cancels active movement. A polite live region announces the action. The brand image pixels remain unchanged.

## Do's and Don'ts

### Do:

- **Do** preserve the supplied Mealf wordmark and peach artwork.
- **Do** pair generous page space with compact, aligned controls.
- **Do** use green for actions and selection, clay for restrained emphasis and focus.
- **Do** retain descriptive image alternatives, keyboard focus, and reduced-motion support.
- **Do** keep sample-data and development-status labels visible and accurate.

### Don't:

- **Don't** redraw the brand artwork or approximate the wordmark in text.
- **Don't** apply the note's shadow and rotation to every card.
- **Don't** introduce a competing display font or unrelated action palette.
- **Don't** present screenshot contents as interactive application controls or evidence of live integrations.
- **Don't** promote a one-off composition, caption offset, or compact metadata size into a universal rule.
