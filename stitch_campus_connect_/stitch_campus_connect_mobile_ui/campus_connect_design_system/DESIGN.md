---
name: Campus Connect Design System
colors:
  surface: '#fcf8ff'
  surface-dim: '#dcd6f4'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f1ff'
  surface-container: '#f0ebff'
  surface-container-high: '#eae5ff'
  surface-container-highest: '#e4dffd'
  on-surface: '#1b192e'
  on-surface-variant: '#484554'
  inverse-surface: '#302e44'
  inverse-on-surface: '#f3eeff'
  outline: '#797586'
  outline-variant: '#cac4d6'
  surface-tint: '#6342d3'
  primary: '#4111b1'
  on-primary: '#ffffff'
  primary-container: '#5936c8'
  on-primary-container: '#cec1ff'
  inverse-primary: '#cbbeff'
  secondary: '#633ed1'
  on-secondary: '#ffffff'
  secondary-container: '#7c5aec'
  on-secondary-container: '#fffbff'
  tertiary: '#6c2800'
  on-tertiary: '#ffffff'
  tertiary-container: '#913900'
  on-tertiary-container: '#ffb99a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e7deff'
  primary-fixed-dim: '#cbbeff'
  on-primary-fixed: '#1e0061'
  on-primary-fixed-variant: '#4b23ba'
  secondary-fixed: '#e7deff'
  secondary-fixed-dim: '#ccbdff'
  on-secondary-fixed: '#1f005f'
  on-secondary-fixed-variant: '#4d20bb'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb694'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7b2f00'
  background: '#fcf8ff'
  on-background: '#1b192e'
  surface-variant: '#e4dffd'
typography:
  display-hero:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 38px
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 30px
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 26px
  title-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system drives a premium, spirited, and hyper-reliable college event management platform tailored for modern campus life. It balances institutional clarity with student-forward vibrancy, projecting efficiency, social dynamism, and polished organizational control.

### Aesthetic Foundation
The visual language merges **Modern SaaS Precision** with **Dynamic Social Softness**:
- **Structured Canvas:** Crisp white containers set against tinted, ultra-light violet backdrops to establish high content hierarchy without stark contrast.
- **Electric Energy:** Deep royal purples anchors the enterprise core, elevated by high-chroma orange accents for tickets, live countdowns, and urgent social triggers.
- **Mobile-First Ergonomics:** Generous touch targets, thumb-zone actionable bottom sheets, fluid status pills, and rounded surfaces calibrated to feel native, tactile, and youthful.

## Colors

The palette leverages a layered violet substrate punctuated by functional semantic states and high-energy energetic highlights.

### Palette Architecture
- **Primary Violet (`#5936C8`):** The primary brand anchor. Used for high-emphasis CTAs, primary navigation active states, app headers, and key branding moments.
- **Secondary Violet (`#7956E8`):** Elevates interactive hover states, selected surface tints, gradient blends, and secondary highlights.
- **Accent Orange (`#FF7629`):** Reserved for live statuses, countdown badges, hot-ticket ribbons, bookmark highlights, and conversion triggers. Must never be used for structural backgrounds.
- **Canvas Neutral (`#F8F7FC`):** The foundational global background. Soft tinted off-white that eliminates screen glare while providing warm contrast under pure white cards.
- **Surface Elevation (`#FFFFFF`):** Base for all raised containers, modals, sheets, and input fields.
- **Text & Hierarchy:**
  - **High-Emphasis Ink (`#17152A`):** Headlines, critical titles, active labels.
  - **Subdued Ink (`#77758A`):** Metadata, timestamp markers, category labels, subtle placeholder text.
- **System Feedback:**
  - **Success (`#20B477`):** Ticket validated, RSVP confirmed, payment complete.
  - **Error (`#E5484D`):** Sold-out states, validation errors, revoked access.

## Typography

Typography is set exclusively in **Inter** to ensure geometric punch in high-weight display headings, absolute screen legibility, and technical clarity across dense event schedules.

### Typography Hierarchy Rules
- **Hero & Event Headers (`display-hero`, `headline-lg`):** Executed in 700 and 800 weights with tightly tracking letter-spacing (`-0.02em`) to provide an energetic, poster-like impact on mobile viewports.
- **Section Headers (`headline-md`):** Medium-bold, clear separators that establish instant scanning zones across feeds and schedule lists.
- **Content Blocks (`body-lg`, `body-md`):** Neutral 400 weights utilizing `#17152A` for descriptions and `#77758A` for venue details, organizer credits, and meta-data.
- **Action & Microcopy (`label-md`, `label-sm`):** High-weight compact styles set in uppercase or tight tabular formatting for ticket tags, dates, capacities, and tab-bar iconography captions.

## Layout & Spacing

The layout is built around mobile ergonomics using an 8pt-derived dynamic fluid system.

### Grid & Viewport Boundaries
- **Mobile Container Margins:** Fixed `1.25rem` (20px) outer margin along vertical screen edges, guaranteeing touch targets and cards remain safely insulated from bezel edges.
- **Internal Column Gutter:** `1rem` (16px) fluid distribution for multi-card horizontal scrolls, attendee avatar rows, and dual-column dashboard summaries.
- **Component Breathing Rhythm:**
  - `space-xs` (4px): Inner pill padding, badge dot offsets.
  - `space-sm` (8px): Icon-to-label spacing, compact list stack gaps.
  - `space-md` (16px): Card internal padding, standard form element vertical gaps.
  - `space-lg` (24px): Card-to-card structural flow, sheet-header vertical offsets.
  - `space-xl` (32px): Primary section demarcations (e.g., "Trending Today" vs "Your Registered Sessions").

## Elevation & Depth

Visual depth is achieved through an ambient violet-tinted shadow model coupled with clean surface container contrasts rather than dark skeuomorphic drops.

### Elevation Levels
- **Level 0 (Flat / Canvas):** Applied to the main background (`#F8F7FC`). Zero elevation.
- **Level 1 (Card & List Rows):** Pure white surfaces (`#FFFFFF`) sitting over the tinted canvas. Supported by a dual ambient shadow:
  - `box-shadow: 0 4px 20px -2px rgba(89, 54, 200, 0.06), 0 2px 6px -1px rgba(23, 21, 42, 0.03);`
  - Subtle, violet-infused depth prevents mud-like gray shadows and complements the high-energy theme.
- **Level 2 (Modals & Bottom Navigation):** Persistent bottom tab navigation and floating quick-action buttons:
  - `box-shadow: 0 10px 30px -4px rgba(89, 54, 200, 0.12), 0 4px 12px -2px rgba(23, 21, 42, 0.04);`
- **Level 3 (Action Sheets & Full Overlays):** Interactive RSVP swipe drawers and filter panels:
  - `box-shadow: 0 20px 40px -6px rgba(23, 21, 42, 0.16);`
- **Backdrop Treatments:** Translucent overlays use `rgba(23, 21, 42, 0.4)` coupled with a `backdrop-filter: blur(8px)` to emphasize focus during modal interaction.

## Shapes

The geometric vocabulary prioritizes organic, friendly, yet structurally modern forms. Surfaces are distinctly curvier than traditional desktop SaaS to fit hand ergonomics and student-app design sensibilities.

### Shape Hierarchy
- **Cards & Surface Containers (`rounded-lg` / `rounded-xl`):** `16px` to `20px` corner radii. Delivers a soft, distinct frame for visual event media, banners, and detail blocks.
- **Buttons & Interactive Controls:** Standard action buttons use `12px` to `14px` border radius, creating a confident, tactile surface that sits harmoniously inside `16px` cards.
- **Pills & Chips (Full Pill):** `9999px` border radius for live event indicators, date ribbons, category tags, and badge counters.
- **Input Fields:** `12px` border radius to match intermediate interactive button forms.

## Components

### Buttons
- **Primary Button:** Solid background `#5936C8`, text `#FFFFFF`, font `label-md`. 48px height on mobile. Minimum touch area 48x48px. Active press scales down slightly (`scale(0.98)`).
- **Secondary / Action Accent:** Solid `#FF7629`, text `#FFFFFF`, used strictly for key conversion moments like "Register Now" or "Get Ticket".
- **Outline / Ghost Button:** Transparent background, 1.5px border in `#5936C8` or `#E5E3F0`, text `#5936C8`. Used for secondary actions (e.g., "Add to Calendar").

### Status Pills & Category Chips
- **Category Chips:** Default state has a soft background of `rgba(121, 86, 232, 0.08)` with text `#5936C8`. Selected state transitions to solid `#5936C8` with white text.
- **Live / Urgent Status Pill:** Background `rgba(255, 118, 41, 0.12)`, text `#FF7629`, leading with a 6px pulsing dot.
- **Confirmed / Success Pill:** Background `rgba(32, 180, 119, 0.12)`, text `#20B477`.

### Cards
- **Event Card (Feed):** Surface `#FFFFFF`, border-radius `18px`, Level 1 ambient shadow. Divided into a 16:9 ratio image header with rounded top corners, an overlaid date badge (pill), and body block featuring event title (`headline-md`), venue/time metadata (`body-sm` with outline icons), and an attendee avatar cluster.
- **Horizontal Session Card:** Compact layout, 16px corner radius, featuring a left-aligned vertical time column, middle title block, and right-aligned RSVP toggle.

### Input Fields
- **Search & Text Inputs:** 48px height, surface `#FFFFFF`, border `1.5px solid #EAE7F6`, border-radius `12px`. Inner text `#17152A`, placeholder `#77758A`.
- **Focus State:** Border changes to `#5936C8` accompanied by an outer focus ring: `0 0 0 3px rgba(89, 54, 200, 0.15)`.

### Selection Controls
- **Checkboxes & Radios:** 20px size, 6px border-radius (checkbox) or circular (radio). Unchecked: 1.5px border `#77758A`. Checked: solid `#5936C8` with pure white check/bullet.

### Navigation Elements
- **Bottom Navigation Bar:** Height 64px, surface `#FFFFFF`, Level 2 shadow. Houses 4 to 5 core destinations with 24px clean outline icons. Active items feature icon and label colored `#5936C8`, underlined by a 4px wide subtle dot indicator.
- **Top App Bar:** Minimalist height 56px, background `#F8F7FC` or transparent, featuring bold screen title and quick-action icon buttons (notifications, search).