import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserCog,
  Calendar,
  DollarSign,
  FileText,
  Settings,
  UsersRound,
  Activity,
  Shield
} from 'lucide-react';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Members', href: '/members', icon: Users },
    { name: 'Leadership', href: '/leadership', icon: UserCog },
    { name: 'Small Groups', href: '/small-groups', icon: UsersRound },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Finance', href: '/finance', icon: DollarSign },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Activity Log', href: '/activity-log', icon: Activity },
    { name: 'Users', href: '/users', icon: Shield },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Logo/Title */}
      <div className="flex h-16 items-center px-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-primary-600">
          MFMC System
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {navigation.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={`
                group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg
                transition-colors duration-150 ease-in-out
                ${
                  active
                    ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <item.icon 
                className={`
                  mr-3 h-5 w-5 flex-shrink-0
                  ${active ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}
                `}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-gray-200 p-4">
        <p className="text-xs text-gray-500 text-center">
          Mahayahay Free Methodist Church
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
