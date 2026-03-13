import React from 'react';
import Settings from './Settings';

/**
 * Settings Page Example
 * 
 * Demonstrates the Settings page layout with vertical tab navigation.
 * 
 * Features:
 * - Page header with title and subtitle
 * - Vertical tab navigation on desktop (left sidebar)
 * - Horizontal tab navigation on mobile (scrollable)
 * - Content area that updates based on active tab
 * - Responsive design that adapts to screen size
 * 
 * Usage:
 * ```tsx
 * import Settings from './pages/Settings';
 * 
 * function App() {
 *   return <Settings />;
 * }
 * ```
 * 
 * Tab Structure:
 * - General: Application preferences and display settings
 * - Church Information: Basic church details and contact info
 * - Finance Settings: Finance-related configurations
 * - Email & Notifications: Email and notification preferences
 * - Security: Security settings and password policies
 * - Backup & Restore: Database backup and restoration
 * - Integrations: Third-party integrations
 * 
 * Design Reference: Settings Page Design section
 */

export default function SettingsExample() {
  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-7xl mx-auto">
        <Settings />
      </div>
    </div>
  );
}
