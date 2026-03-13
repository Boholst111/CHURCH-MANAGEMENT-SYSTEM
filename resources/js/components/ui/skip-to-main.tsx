import * as React from "react"

/**
 * Skip to Main Content Link
 * 
 * Provides a keyboard-accessible link that allows users to skip navigation
 * and jump directly to the main content. This is essential for keyboard
 * and screen reader users who don't want to tab through all navigation
 * items on every page.
 * 
 * The link is visually hidden until focused, meeting WCAG 2.1 Level A
 * requirement 2.4.1 (Bypass Blocks).
 */
export function SkipToMain() {
  return (
    <a
      href="#main-content"
      className="skip-to-main"
    >
      Skip to main content
    </a>
  )
}
