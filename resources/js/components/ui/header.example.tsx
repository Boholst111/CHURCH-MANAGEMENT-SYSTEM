/**
 * Header Component Usage Examples
 * Demonstrates the Header component with all features
 */

import React from 'react'
import {
  Header,
  HeaderLeft,
  HeaderRight,
  Breadcrumb,
  SearchBar,
  NotificationBell,
  UserProfile,
  HeaderProvider,
} from './header'
import { Settings, User, LogOut, HelpCircle } from 'lucide-react'

export const HeaderExamples: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [notificationCount, setNotificationCount] = React.useState(3)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    console.log('Search query:', query)
  }

  const handleNotificationClick = () => {
    console.log('Notifications clicked')
    setNotificationCount(0)
  }

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Members', href: '/members' },
    { label: 'John Doe' },
  ]

  const userMenuItems = [
    {
      label: 'Profile',
      icon: <User className="w-4 h-4" />,
      onClick: () => console.log('Profile clicked'),
    },
    {
      label: 'Settings',
      icon: <Settings className="w-4 h-4" />,
      onClick: () => console.log('Settings clicked'),
    },
    {
      label: 'Help',
      icon: <HelpCircle className="w-4 h-4" />,
      onClick: () => console.log('Help clicked'),
    },
    { divider: true },
    {
      label: 'Logout',
      icon: <LogOut className="w-4 h-4" />,
      onClick: () => console.log('Logout clicked'),
    },
  ]

  const currentUser = {
    name: 'John Doe',
    email: 'john.doe@church.com',
    role: 'Administrator',
    avatar: '', // Empty string will show default avatar
  }

  return (
    <div className="space-y-8">
      {/* Basic Header */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Basic Header</h2>
        <HeaderProvider>
          <Header>
            <HeaderLeft>
              <h1 className="text-lg font-semibold text-neutral-900">
                Church Management System
              </h1>
            </HeaderLeft>
            <HeaderRight>
              <UserProfile user={currentUser} menuItems={userMenuItems} />
            </HeaderRight>
          </Header>
        </HeaderProvider>
      </section>

      {/* Header with Breadcrumbs */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Header with Breadcrumbs</h2>
        <HeaderProvider>
          <Header>
            <HeaderLeft>
              <Breadcrumb items={breadcrumbItems} />
            </HeaderLeft>
            <HeaderRight>
              <UserProfile user={currentUser} menuItems={userMenuItems} />
            </HeaderRight>
          </Header>
        </HeaderProvider>
      </section>

      {/* Header with Search */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Header with Search</h2>
        <HeaderProvider>
          <Header>
            <HeaderLeft>
              <Breadcrumb items={breadcrumbItems} />
            </HeaderLeft>
            <HeaderRight>
              <SearchBar
                placeholder="Search members..."
                onSearch={handleSearch}
              />
              <UserProfile user={currentUser} menuItems={userMenuItems} />
            </HeaderRight>
          </Header>
        </HeaderProvider>
        {searchQuery && (
          <p className="mt-2 text-sm text-neutral-600">
            Current search: {searchQuery}
          </p>
        )}
      </section>

      {/* Header with Notifications */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Header with Notifications</h2>
        <HeaderProvider>
          <Header>
            <HeaderLeft>
              <Breadcrumb items={breadcrumbItems} />
            </HeaderLeft>
            <HeaderRight>
              <SearchBar onSearch={handleSearch} />
              <NotificationBell
                count={notificationCount}
                onClick={handleNotificationClick}
              />
              <UserProfile user={currentUser} menuItems={userMenuItems} />
            </HeaderRight>
          </Header>
        </HeaderProvider>
      </section>

      {/* Full Featured Header */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Full Featured Header</h2>
        <HeaderProvider>
          <Header>
            <HeaderLeft>
              <Breadcrumb
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Finance', href: '/finance' },
                  { label: 'Expenses', href: '/finance/expenses' },
                  { label: 'Details' },
                ]}
              />
            </HeaderLeft>
            <HeaderRight>
              <SearchBar
                placeholder="Search..."
                onSearch={handleSearch}
              />
              <NotificationBell count={5} onClick={handleNotificationClick} />
              <UserProfile user={currentUser} menuItems={userMenuItems} />
            </HeaderRight>
          </Header>
        </HeaderProvider>
      </section>

      {/* Custom Breadcrumb Separator */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Custom Breadcrumb Separator</h2>
        <HeaderProvider>
          <Header>
            <HeaderLeft>
              <Breadcrumb
                items={breadcrumbItems}
                separator=">"
              />
            </HeaderLeft>
            <HeaderRight>
              <UserProfile user={currentUser} menuItems={userMenuItems} />
            </HeaderRight>
          </Header>
        </HeaderProvider>
      </section>

      {/* User with Avatar */}
      <section>
        <h2 className="text-xl font-semibold mb-4">User with Avatar Image</h2>
        <HeaderProvider>
          <Header>
            <HeaderLeft>
              <Breadcrumb items={breadcrumbItems} />
            </HeaderLeft>
            <HeaderRight>
              <UserProfile
                user={{
                  name: 'Jane Smith',
                  email: 'jane.smith@church.com',
                  role: 'Pastor',
                  avatar: 'https://i.pravatar.cc/150?img=5',
                }}
                menuItems={userMenuItems}
              />
            </HeaderRight>
          </Header>
        </HeaderProvider>
      </section>

      {/* Minimal Header (Mobile-like) */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Minimal Header</h2>
        <HeaderProvider>
          <Header>
            <HeaderLeft>
              <h1 className="text-base font-semibold text-neutral-900 truncate">
                Page Title
              </h1>
            </HeaderLeft>
            <HeaderRight>
              <NotificationBell count={2} onClick={handleNotificationClick} />
              <UserProfile
                user={{ name: 'User', role: 'Member' }}
                menuItems={userMenuItems}
              />
            </HeaderRight>
          </Header>
        </HeaderProvider>
      </section>
    </div>
  )
}

export default HeaderExamples
