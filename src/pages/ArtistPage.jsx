
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { dataClient } from '@/lib/data';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Bell, Check, Rss, ShoppingBag, Calendar, Gem } from 'lucide-react';

function ArtistPage() {
  const { handle } = useParams();
  const [artist, setArtist] = useState(null);
  const [content, setContent] = useState({ tracks: [], videos: [], posts: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtistData = async () => {
      setLoading(true);
      try {
        const artists = await dataClient.find('profiles', { handle });
        if (artists.length === 0) {
          toast({ title: "Error", description: "Artista no encontrado.", variant: "destructive" });
          return;
        }
        const currentArtist = artists[0];
        setArtist(currentArtist);

        const [tracks, videos, posts] = await Promise.all([
          dataClient.find('tracks', { artist_id: currentArtist.id }),
          dataClient.find('videos', { artist_id: currentArtist.id }),
          dataClient.find('posts', { author_id: currentArtist.id })
        ]);
        setContent({ tracks, videos, posts });

      } catch (error) {
        console.error('Error loading artist data:', error);
        toast({ title: "Error", description: "No se pudo cargar la página del artista.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    if (handle) {
      loadArtistData();
    }
  }, [handle]);

  const handleFollow = () => {
     toast({
      title: "🚧 Seguir",
      description: "Esta función no está implementada aún—¡pero podés pedirla en tu próximo prompt! 🚀",
    });
  }

  if (loading) {
    return <p className="text-white">Cargando perfil del artista...</p>;
  }

  if (!artist) {
    return <p className="text-white">Artista no encontrado.</p>;
  }

  return (
    <div>
      <Helmet>
        <title>{artist.display_name} - HipHop Platform</title>
        <meta name="description" content={artist.bio} />
      </Helmet>

      {/* Banner y Header */}
      <div className="relative h-64 md:h-80 -mt-6 -mx-4">
        <img className="w-full h-full object-cover" alt={`Banner de ${artist.display_name}`} src="https://images.unsplash.com/photo-1506157786151-b8491531f063" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 flex items-end space-x-6">
          <img className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full border-4 border-slate-900" alt={`Avatar de ${artist.display_name}`} src="https://images.unsplash.com/photo-1546528377-9049abbac32f" />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl md:text-5xl font-bold text-white">{artist.display_name}</h1>
              {artist.verified && <Check className="w-6 h-6 text-blue-400 bg-white rounded-full p-1" />}
            </div>
            <p className="text-lg text-gray-300">@{artist.handle}</p>
          </div>
        </div>
      </div>

      {/* Acciones y Stats */}
      <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2 md:space-x-4">
          <Button onClick={handleFollow} className="bg-purple-600 hover:bg-purple-700">
            <Rss className="mr-2 h-4 w-4" /> Seguir
          </Button>
          <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white">
            <Bell className="mr-2 h-4 w-4" /> Suscribirse
          </Button>
          <Link to={`/vip/${artist.handle}`}>
            <Button variant="outline" className="border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white">
              <Gem className="mr-2 h-4 w-4" /> Club VIP
            </Button>
          </Link>
          <Link to={`/booking/${artist.handle}`}>
            <Button variant="outline" className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-white">
              <Calendar className="mr-2 h-4 w-4" /> Contratar
            </Button>
          </Link>
        </div>
        <div className="flex items-center space-x-6 text-white">
          <div><span className="font-bold">{artist.followers_count}</span> <span className="text-gray-400">Seguidores</span></div>
          <div><span className="font-bold">{artist.following_count}</span> <span className="text-gray-400">Siguiendo</span></div>
          <div><span className="font-bold">{content.tracks.length}</span> <span className="text-gray-400">Tracks</span></div>
        </div>
      </div>
      
      {/* Contenido del Artista */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Tracks Populares</h2>
            <div className="space-y-2">
              {content.tracks.slice(0, 5).map(track => (
                <div key={track.id} className="glass p-3 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <img className="w-12 h-12 object-cover rounded" src="https://images.unsplash.com/photo-1701403320634-89390f3f417f" alt={track.title} />
                    <p className="ml-4 font-medium text-white">{track.title}</p>
                  </div>
                  <p className="text-sm text-gray-400">{track.plays_count} plays</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Últimos Posts</h2>
            <div className="space-y-4">
              {content.posts.map(post => (
                <div key={post.id} className="glass p-4 rounded-lg">
                  <p className="text-white">{post.content}</p>
                  <p className="text-xs text-gray-500 mt-2">{new Date(post.created_at).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="lg:col-span-1 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Bio</h2>
            <p className="text-gray-300 glass p-4 rounded-lg">{artist.bio}</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Marketplace</h2>
             <Button variant="outline" className="w-full border-green-500 text-green-400 hover:bg-green-500 hover:text-white">
              <ShoppingBag className="mr-2 h-4 w-4" /> Ver Tienda
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ArtistPage;
