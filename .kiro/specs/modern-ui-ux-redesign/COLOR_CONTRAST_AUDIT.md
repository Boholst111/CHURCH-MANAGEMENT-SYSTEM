# Color Contrast Compliance Report

**Generated:** 2026-02-27T14:32:26.000Z

## Executive Summary

- **Total combinations tested:** 34
- **Passing WCAG AA:** 16 (47%)
- **Failing WCAG AA:** 18 (53%)

## WCAG AA Requirements

WCAG 2.1 Level AA requires:

- **Normal text** (< 18pt or < 14pt bold): **4.5:1** minimum contrast ratio
- **Large text** (≥ 18pt or ≥ 14pt bold): **3:1** minimum contrast ratio
- **WCAG AAA** (enhanced): 7:1 for normal text, 4.5:1 for large text

## ⚠️ Failing Combinations (Action Required)

These color combinations do NOT meet WCAG AA standards and should be adjusted:

| Foreground | Background | Ratio | Level | Description |
|------------|------------|-------|-------|-------------|
| `#0284c7` | `#ffffff` | **4.10:1** | ❌ | Primary 600 (buttons, links) |
| `#a3a3a3` | `#ffffff` | **2.52:1** | ❌ | Neutral 400 (disabled text) |
| `#ffffff` | `#0284c7` | **4.10:1** | ❌ | White text on Primary 600 (buttons) |
| `#10b981` | `#ffffff` | **2.54:1** | ❌ | Success DEFAULT on white |
| `#059669` | `#ffffff` | **3.77:1** | ❌ | Success dark on white |
| `#f59e0b` | `#ffffff` | **2.15:1** | ❌ | Warning DEFAULT on white |
| `#d97706` | `#ffffff` | **3.19:1** | ❌ | Warning dark on white |
| `#ef4444` | `#ffffff` | **3.76:1** | ❌ | Error DEFAULT on white |
| `#3b82f6` | `#ffffff` | **3.68:1** | ❌ | Info DEFAULT on white |
| `#059669` | `#d1fae5` | **3.32:1** | ❌ | Success dark on success light |
| `#d97706` | `#fef3c7` | **2.86:1** | ❌ | Warning dark on warning light |
| `#dc2626` | `#fee2e2` | **3.95:1** | ❌ | Error dark on error light |
| `#2563eb` | `#dbeafe` | **4.24:1** | ❌ | Info dark on info light |
| `#ffffff` | `#10b981` | **2.54:1** | ❌ | White on Success DEFAULT |
| `#ffffff` | `#059669` | **3.77:1** | ❌ | White on Success dark |
| `#ffffff` | `#f59e0b` | **2.15:1** | ❌ | White on Warning DEFAULT |
| `#ffffff` | `#ef4444` | **3.76:1** | ❌ | White on Error DEFAULT |
| `#ffffff` | `#3b82f6` | **3.68:1** | ❌ | White on Info DEFAULT |

### Recommended Fixes

- **Primary 600 (buttons, links)**: Use Primary 700 (#0369a1) or darker for normal text. Primary 600 is acceptable for large text (≥18pt) or interactive elements like buttons.
- **Neutral 400 (disabled text)**: Disabled text is intentionally lower contrast. Ensure disabled state is also indicated through other means (cursor, opacity).
- **White text on Primary 600 (buttons)**: Use Primary 700 (#0369a1) or darker for normal text. Primary 600 is acceptable for large text (≥18pt) or interactive elements like buttons.
- **Success DEFAULT on white**: Consider using a darker shade or adjusting the background color.
- **Success dark on white**: Consider using a darker shade or adjusting the background color.
- **Warning DEFAULT on white**: Consider using a darker shade or adjusting the background color.
- **Warning dark on white**: Consider using a darker shade or adjusting the background color.
- **Error DEFAULT on white**: Consider using a darker shade or adjusting the background color.
- **Info DEFAULT on white**: Consider using a darker shade or adjusting the background color.
- **Success dark on success light**: Consider using a darker shade or adjusting the background color.
- **Warning dark on warning light**: Consider using a darker shade or adjusting the background color.
- **Error dark on error light**: Consider using a darker shade or adjusting the background color.
- **Info dark on info light**: Consider using a darker shade or adjusting the background color.
- **White on Success DEFAULT**: Consider using a darker shade or adjusting the background color.
- **White on Success dark**: Consider using a darker shade or adjusting the background color.
- **White on Warning DEFAULT**: Consider using a darker shade or adjusting the background color.
- **White on Error DEFAULT**: Consider using a darker shade or adjusting the background color.
- **White on Info DEFAULT**: Consider using a darker shade or adjusting the background color.

## ✅ Passing Combinations

These color combinations meet or exceed WCAG AA standards:

| Foreground | Background | Ratio | Level | Description |
|------------|------------|-------|-------|-------------|
| `#0369a1` | `#ffffff` | 5.93:1 | ✅ AA | Primary 700 (hover states) |
| `#075985` | `#ffffff` | 7.56:1 | ✅✅ AAA | Primary 800 (text on light) |
| `#0c4a6e` | `#ffffff` | 9.46:1 | ✅✅ AAA | Primary 900 (headings) |
| `#525252` | `#ffffff` | 7.81:1 | ✅✅ AAA | Neutral 600 (body text) |
| `#404040` | `#ffffff` | 10.37:1 | ✅✅ AAA | Neutral 700 (dark text) |
| `#262626` | `#ffffff` | 15.13:1 | ✅✅ AAA | Neutral 800 (headings) |
| `#171717` | `#ffffff` | 17.93:1 | ✅✅ AAA | Neutral 900 (darkest text) |
| `#737373` | `#ffffff` | 4.74:1 | ✅ AA | Neutral 500 (secondary text) |
| `#ffffff` | `#0369a1` | 5.93:1 | ✅ AA | White text on Primary 700 |
| `#ffffff` | `#075985` | 7.56:1 | ✅✅ AAA | White text on Primary 800 |
| `#dc2626` | `#ffffff` | 4.83:1 | ✅ AA | Error dark on white |
| `#2563eb` | `#ffffff` | 5.17:1 | ✅ AA | Info dark on white |
| `#ffffff` | `#dc2626` | 4.83:1 | ✅ AA | White on Error dark |
| `#171717` | `#fafafa` | 17.18:1 | ✅✅ AAA | Darkest text on off-white |
| `#262626` | `#f5f5f5` | 13.88:1 | ✅✅ AAA | Headings on light gray |
| `#525252` | `#fafafa` | 7.49:1 | ✅✅ AAA | Body text on off-white |

## Implementation Guidelines

### Text Colors

**On white backgrounds (#ffffff):**
- ✅ Use Neutral 600-900 for all text
- ✅ Use Primary 700-900 for links and emphasis
- ⚠️ Avoid Primary 600 for normal text (use for large text or buttons only)
- ❌ Never use Neutral 400 for important text (disabled states only)

**On colored backgrounds:**
- ✅ Use white text on Primary 600+, Success DEFAULT+, Error DEFAULT+
- ✅ Use dark variants on light semantic backgrounds
- ⚠️ Test any custom combinations with the contrast checker

### Button Colors

- ✅ Primary buttons: White text on Primary 600 or darker
- ✅ Success buttons: White text on Success DEFAULT or darker
- ✅ Error buttons: White text on Error DEFAULT or darker
- ✅ Secondary buttons: Dark text on light backgrounds

### Status Indicators

**Do not rely on color alone** to convey information:
- ✅ Use icons alongside colors (✓ for success, ⚠ for warning, ✗ for error)
- ✅ Use text labels in addition to color coding
- ✅ Ensure sufficient contrast for all status colors
- ✅ Consider patterns or textures for colorblind users

## Testing Tools

Use these tools to verify color contrast:

1. **Built-in utility**: `resources/js/lib/color-contrast.ts`
2. **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
3. **Chrome DevTools**: Inspect element > Styles > Color picker shows contrast ratio
4. **Axe DevTools**: Browser extension for automated accessibility testing

## Compliance Status

⚠️ **18 color combination(s) require adjustment to meet WCAG AA standards.**

---

*This report was generated automatically. For questions about color contrast compliance, refer to [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/#contrast-minimum).*
