
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Search, Music, Video, Mic2, Users, Heart, Clock, ListMusic, PlusCircle, Upload, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import UploadModal from '@/components/UploadModal';
import { toast } from '@/components/ui/use-toast';

const mainNav = [
  { href: '/', icon: Home, label: 'Inicio' },
  { href: '/explore', icon: Compass, label: 'Explorar' },
  { href: '/search', icon: Search, label: 'Buscar' },
];

const libraryNav = [
  { href: '/library/likes', icon: Heart, label: 'Me gusta' },
  { href: '/library/history', icon: Clock, label: 'Recientes' },
  { href: '/library/playlists', icon: ListMusic, label: 'Playlists' },
];

const artistNav = [
  { href: '/dashboard/tracks', icon: Music, label: 'Mis Tracks' },
  { href: '/dashboard/videos', icon: Video, label: 'Mis Videos' },
  { href: '/dashboard/profile', icon: Mic2, label: 'Mi Perfil' },
  { href: '/dashboard/subscribers', icon: Users, label: 'Mis Fans' },
];

function Sidebar() {
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);

  const handleNotImplemented = (e, label) => {
    e.preventDefault();
    toast({
      title: `🚧 ${label}`,
      description: "Esta función no está implementada aún—¡pero podés pedirla en tu próximo prompt! 🚀",
    });
  };

  return (
    <>
      <aside className="fixed top-16 left-0 w-64 h-full bg-black/80 backdrop-blur-md border-r border-white/10 p-4 flex flex-col">
        <div className="flex-1 space-y-6 overflow-y-auto">
          <nav className="space-y-1">
            {mainNav.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'flex items-center px-3 py-2 rounded-lg text-sm font-medium',
                    isActive ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-white/10'
                  )
                }
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </NavLink>
            ))}
          </nav>
          
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Tu Biblioteca
            </h3>
            <nav className="space-y-1">
              {libraryNav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNotImplemented(e, item.label)}
                  className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/10"
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </a>
              ))}
              <button className="w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/10">
                <PlusCircle className="mr-3 h-5 w-5" />
                Crear Playlist
              </button>
            </nav>
          </div>

          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Panel de Artista
            </h3>
            <nav className="space-y-1">
              {artistNav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNotImplemented(e, item.label)}
                  className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/10"
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
        
        <div className="mt-auto">
          <Button 
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
            onClick={() => setUploadModalOpen(true)}
          >
            <Upload className="mr-2 h-4 w-4" />
            Subir Contenido
          </Button>
        </div>
      </aside>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />
    </>
  );
}

export default Sidebar;
