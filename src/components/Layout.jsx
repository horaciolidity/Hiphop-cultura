
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Player from '@/components/Player';
import { useAuth } from '@/contexts/AuthContext';

function Layout({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  
  // Hide sidebar on certain pages
  const hideSidebar = ['/admin'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      <div className="flex">
        {user && !hideSidebar && (
          <Sidebar />
        )}
        
        <main className={`flex-1 ${user && !hideSidebar ? 'ml-64' : ''} pt-16 pb-24`}>
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
      
      {user && <Player />}
    </div>
  );
}

export default Layout;
