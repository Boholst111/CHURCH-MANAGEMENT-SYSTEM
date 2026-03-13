import React from 'react';
import { ThemeToggle, ThemeToggleCompact, ThemeToggleDropdown } from './theme-toggle';
import { ThemeProvider } from '../../contexts/ThemeContext';

/**
 * Theme Toggle Component Examples
 * 
 * Demonstrates different variants and use cases for the theme toggle component.
 */

export default function ThemeToggleExamples() {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="p-8 space-y-12 bg-neutral-50 min-h-screen">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Theme Toggle Component
          </h1>
          <p className="text-neutral-600">
            Interactive theme switcher with light, dark, and auto modes
          </p>
        </div>

        {/* Icon Variant */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-1">
              Icon Button (Default)
            </h2>
            <p className="text-sm text-neutral-600">
              Compact icon button that cycles through themes. Perfect for headers and toolbars.
            </p>
          </div>
          
          <div className="flex items-center gap-4 p-6 bg-white rounded-lg border border-neutral-200">
            <ThemeToggle variant="icon" />
            <span className="text-sm text-neutral-600">
              Click to cycle: Light → Dark → Auto → Light
            </span>
          </div>
        </section>

        {/* Icon with Label */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-1">
              Icon Button with Label
            </h2>
            <p className="text-sm text-neutral-600">
              Shows the current theme name next to the icon.
            </p>
          </div>
          
          <div className="flex items-center gap-4 p-6 bg-white rounded-lg border border-neutral-200">
            <ThemeToggle variant="icon" showLabel />
          </div>
        </section>

        {/* Dropdown Variant */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-1">
              Dropdown Menu
            </h2>
            <p className="text-sm text-neutral-600">
              Shows all theme options in a dropdown menu. Ideal for settings pages.
            </p>
          </div>
          
          <div className="flex items-center gap-4 p-6 bg-white rounded-lg border border-neutral-200">
            <ThemeToggle variant="dropdown" />
            <span className="text-sm text-neutral-600">
              Click to see all theme options
            </span>
          </div>
        </section>

        {/* Dropdown with Label */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-1">
              Dropdown Menu with Label
            </h2>
            <p className="text-sm text-neutral-600">
              Dropdown variant with visible label.
            </p>
          </div>
          
          <div className="flex items-center gap-4 p-6 bg-white rounded-lg border border-neutral-200">
            <ThemeToggle variant="dropdown" showLabel />
          </div>
        </section>

        {/* Compact Variant */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-1">
              Compact (Alias)
            </h2>
            <p className="text-sm text-neutral-600">
              Convenience component for icon variant. Same as ThemeToggle with variant="icon".
            </p>
          </div>
          
          <div className="flex items-center gap-4 p-6 bg-white rounded-lg border border-neutral-200">
            <ThemeToggleCompact />
          </div>
        </section>

        {/* Dropdown Alias */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-1">
              Dropdown (Alias)
            </h2>
            <p className="text-sm text-neutral-600">
              Convenience component for dropdown variant with label. Same as ThemeToggle with variant="dropdown" and showLabel.
            </p>
          </div>
          
          <div className="flex items-center gap-4 p-6 bg-white rounded-lg border border-neutral-200">
            <ThemeToggleDropdown />
          </div>
        </section>

        {/* In Header Context */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-1">
              In Header Context
            </h2>
            <p className="text-sm text-neutral-600">
              Example of theme toggle in a header layout.
            </p>
          </div>
          
          <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
            <header className="h-16 px-6 flex items-center justify-between border-b border-neutral-200">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-semibold text-neutral-900">
                  Church Management System
                </h3>
              </div>
              
              <div className="flex items-center gap-3">
                <ThemeToggle variant="icon" />
                <button className="p-2 rounded-lg hover:bg-neutral-100">
                  <span className="text-sm">🔔</span>
                </button>
                <button className="p-2 rounded-lg hover:bg-neutral-100">
                  <span className="text-sm">👤</span>
                </button>
              </div>
            </header>
            
            <div className="p-6">
              <p className="text-sm text-neutral-600">
                The theme toggle is positioned in the header's right section, alongside other utility buttons.
              </p>
            </div>
          </div>
        </section>

        {/* Custom Styling */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-1">
              Custom Styling
            </h2>
            <p className="text-sm text-neutral-600">
              Theme toggle with custom className for styling.
            </p>
          </div>
          
          <div className="flex items-center gap-4 p-6 bg-white rounded-lg border border-neutral-200">
            <ThemeToggle 
              variant="icon" 
              className="bg-primary-50 hover:bg-primary-100 text-primary-700"
            />
            <ThemeToggle 
              variant="icon" 
              showLabel
              className="border-2 border-primary-500 text-primary-700"
            />
          </div>
        </section>

        {/* Accessibility Features */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-1">
              Accessibility Features
            </h2>
            <p className="text-sm text-neutral-600">
              The theme toggle includes comprehensive accessibility support.
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-lg border border-neutral-200 space-y-3">
            <ul className="space-y-2 text-sm text-neutral-700">
              <li className="flex items-start gap-2">
                <span className="text-success-600 font-bold">✓</span>
                <span>
                  <strong>Keyboard Navigation:</strong> Fully accessible via keyboard (Tab, Enter, Escape)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success-600 font-bold">✓</span>
                <span>
                  <strong>ARIA Labels:</strong> Descriptive labels for screen readers
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success-600 font-bold">✓</span>
                <span>
                  <strong>Focus Indicators:</strong> Visible focus ring for keyboard users
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success-600 font-bold">✓</span>
                <span>
                  <strong>State Announcements:</strong> Current theme is announced to screen readers
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success-600 font-bold">✓</span>
                <span>
                  <strong>Dropdown Menu:</strong> Proper ARIA menu attributes and keyboard navigation
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Usage Instructions */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-1">
              Usage Instructions
            </h2>
            <p className="text-sm text-neutral-600">
              How to integrate the theme toggle in your application.
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-lg border border-neutral-200 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-2">
                1. Wrap your app with ThemeProvider
              </h3>
              <pre className="p-3 bg-neutral-900 text-neutral-100 rounded text-xs overflow-x-auto">
{`import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      {/* Your app content */}
    </ThemeProvider>
  );
}`}
              </pre>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-2">
                2. Add theme toggle to your header
              </h3>
              <pre className="p-3 bg-neutral-900 text-neutral-100 rounded text-xs overflow-x-auto">
{`import { ThemeToggle } from './components/ui/theme-toggle';

function Header() {
  return (
    <header>
      {/* Other header content */}
      <ThemeToggle variant="icon" />
    </header>
  );
}`}
              </pre>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-2">
                3. Configure Tailwind for dark mode
              </h3>
              <pre className="p-3 bg-neutral-900 text-neutral-100 rounded text-xs overflow-x-auto">
{`// tailwind.config.ts
export default {
  darkMode: 'class', // Enable class-based dark mode
  // ... rest of config
}`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </ThemeProvider>
  );
}
