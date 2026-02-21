import React from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl">
            {/* Close button */}
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white hover:text-white hover:bg-gray-800"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Page content */}
        <main className="flex-1 py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
