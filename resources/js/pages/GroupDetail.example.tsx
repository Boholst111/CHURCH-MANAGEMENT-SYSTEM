/**
 * GroupDetail Component Examples
 * 
 * This file demonstrates various use cases and configurations of the GroupDetail page component.
 * 
 * Design Reference: Group Detail View section
 * Validates Requirements: 8.4, 8.5
 */

import React from 'react';
import GroupDetail from './GroupDetail';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { ToastProvider } from '../contexts/ToastContext';

/**
 * Example 1: Basic Group Detail View
 * 
 * Shows a complete group detail page with all tabs and information.
 * The component automatically fetches group data based on the URL parameter.
 */
export const BasicGroupDetail = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <GroupDetail />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

/**
 * Example 2: Group Detail with Active Status
 * 
 * Displays a group with active status badge in the hero section.
 * Active groups show a green "Active" badge.
 */
export const ActiveGroupDetail = () => {
  // Mock data would show:
  // - Green "Active" badge
  // - Full group information
  // - All tabs accessible
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <GroupDetail />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

/**
 * Example 3: Group Detail with Inactive Status
 * 
 * Displays a group with inactive status badge.
 * Inactive groups show a gray "Inactive" badge.
 */
export const InactiveGroupDetail = () => {
  // Mock data would show:
  // - Gray "Inactive" badge
  // - Group information still visible
  // - Historical data accessible
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <GroupDetail />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

/**
 * Example 4: Overview Tab Content
 * 
 * The Overview tab displays:
 * - Group description
 * - Meeting details (schedule, location, leader)
 * - Contact information
 */
export const OverviewTabExample = () => {
  // Overview tab shows:
  // - "About This Group" section with description
  // - "Meeting Details" card with:
  //   - Schedule (day and time)
  //   - Location
  //   - Leader name
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <GroupDetail />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

/**
 * Example 5: Members Tab Content
 * 
 * The Members tab displays:
 * - Member count in header
 * - Grid of member cards with photos and names
 * - "Add Member" button (admin only)
 */
export const MembersTabExample = () => {
  // Members tab shows:
  // - Header: "Members (15)"
  // - Grid of member cards (3 columns on desktop)
  // - Each card shows photo, name, and role
  // - "Add Member" button for admins
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <GroupDetail />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

/**
 * Example 6: Schedule Tab Content
 * 
 * The Schedule tab displays:
 * - Upcoming meetings section
 * - Past meetings section with attendance
 * - Meeting topics and locations
 */
export const ScheduleTabExample = () => {
  // Schedule tab shows:
  // - "Upcoming Meetings" section with future meetings
  // - "Past Meetings" section with attendance records
  // - Each meeting shows date, time, topic, location
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <GroupDetail />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

/**
 * Example 7: Resources Tab Content
 * 
 * The Resources tab displays:
 * - Study materials
 * - Shared documents
 * - Empty state when no resources available
 */
export const ResourcesTabExample = () => {
  // Resources tab shows:
  // - Empty state: "No Resources Yet"
  // - Message: "Study materials and shared documents will appear here."
  // - (Future: List of resources when available)
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <GroupDetail />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

/**
 * Example 8: Activity Tab Content
 * 
 * The Activity tab displays:
 * - Recent activities
 * - Attendance history
 * - Empty state when no activity available
 */
export const ActivityTabExample = () => {
  // Activity tab shows:
  // - Empty state: "No Activity Yet"
  // - Message: "Recent activities and attendance history will appear here."
  // - (Future: Activity timeline when available)
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <GroupDetail />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

/**
 * Example 9: Hero Section with Group Image
 * 
 * Hero section displays:
 * - Gradient background (primary-600 to primary-800)
 * - Group name and status badge
 * - Leader photo and name
 * - Quick stats (members, schedule, location)
 * - Group image (when available)
 */
export const HeroSectionWithImage = () => {
  // Hero section shows:
  // - Gradient background
  // - Group name: "Young Adults Fellowship"
  // - Status badge: "Active"
  // - Leader info with photo
  // - Quick stats with icons
  // - Group image on the right (desktop)
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <GroupDetail />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

/**
 * Example 10: Hero Section without Group Image
 * 
 * Hero section when no group image is available.
 * Layout adjusts to show only text content.
 */
export const HeroSectionWithoutImage = () => {
  // Hero section shows:
  // - Same gradient background
  // - Group information
  // - No image placeholder
  // - Full width for text content
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <GroupDetail />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

/**
 * Example 11: Tab Navigation
 * 
 * Tab navigation features:
 * - 5 tabs: Overview, Members, Schedule, Resources, Activity
 * - Active tab highlighted with primary color
 * - Icons for each tab
 * - Horizontal scrolling on mobile
 */
export const TabNavigationExample = () => {
  // Tab navigation shows:
  // - Horizontal tab bar
  // - Active tab: blue border bottom, blue text
  // - Inactive tabs: gray text, hover effects
  // - Icons next to labels
  // - Scrollable on mobile
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <GroupDetail />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

/**
 * Example 12: Empty States
 * 
 * Various empty states throughout the component:
 * - No members: Shows empty state with icon and message
 * - No resources: Shows placeholder message
 * - No activity: Shows placeholder message
 */
export const EmptyStatesExample = () => {
  // Empty states show:
  // - Icon (Users, FileText, Activity)
  // - Heading: "No [Content] Yet"
  // - Descriptive message
  // - Centered layout
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <GroupDetail />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

/**
 * Example 13: Responsive Design
 * 
 * Component adapts to different screen sizes:
 * - Mobile: Stacked layout, scrollable tabs
 * - Tablet: 2-column grid for members
 * - Desktop: 3-column grid, side-by-side hero content
 */
export const ResponsiveDesignExample = () => {
  // Responsive behavior:
  // - Mobile (< 768px): Single column, stacked hero
  // - Tablet (768px - 1024px): 2 columns for members
  // - Desktop (>= 1024px): 3 columns, hero with image
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <GroupDetail />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

/**
 * Example 14: Navigation
 * 
 * Navigation features:
 * - Back button to return to small groups list
 * - Automatic redirect on error
 * - URL-based group loading
 */
export const NavigationExample = () => {
  // Navigation shows:
  // - Back button at top: "Back to Small Groups"
  // - Ghost button style
  // - Arrow left icon
  // - Navigates to /small-groups
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <GroupDetail />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

/**
 * Example 15: Loading State
 * 
 * Loading state while fetching group data:
 * - Centered spinner
 * - Loading message
 * - Prevents interaction until loaded
 */
export const LoadingStateExample = () => {
  // Loading state shows:
  // - Centered spinner animation
  // - Message: "Loading group details..."
  // - Full page centered layout
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <GroupDetail />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

/**
 * Usage Notes:
 * 
 * 1. URL Parameter:
 *    - Component expects group ID in URL: /small-groups/:id
 *    - Automatically fetches group data on mount
 * 
 * 2. Authentication:
 *    - Requires AuthProvider context
 *    - Admin users see "Add Member" button
 * 
 * 3. API Integration:
 *    - Uses smallGroupApi.getSmallGroup(id)
 *    - Handles loading and error states
 *    - Redirects to /small-groups on error
 * 
 * 4. Tab Behavior:
 *    - Default tab: Overview
 *    - Tab state managed locally
 *    - Smooth transitions between tabs
 * 
 * 5. Responsive Breakpoints:
 *    - Mobile: < 768px
 *    - Tablet: 768px - 1024px
 *    - Desktop: >= 1024px
 * 
 * 6. Future Enhancements:
 *    - Add Member functionality
 *    - Resources management
 *    - Activity tracking
 *    - Meeting management
 */
