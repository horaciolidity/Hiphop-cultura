
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Heart, Share2, MessageCircle, TrendingUp, Music, Video, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { usePlayer } from '@/contexts/PlayerContext';
import { dataClient } from '@/lib/data';
import { toast } from '@/components/ui/use-toast';

function HomePage() {
  const { user } = useAuth();
  const { playTrack } = usePlayer();
  const [featuredTracks, setFeaturedTracks] = useState([]);
  const [trendingArtists, setTrendingArtists] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      const [tracks, artists, posts] = await Promise.all([
        dataClient.find('tracks', {}).then(tracks => tracks.slice(0, 6)),
        dataClient.find('profiles', { role: 'artist' }).then(artists => artists.slice(0, 8)),
        dataClient.find('posts', {}).then(posts => posts.slice(0, 4))
      ]);

      setFeaturedTracks(tracks);
      setTrendingArtists(artists);
      setRecentPosts(posts);
    } catch (error) {
      console.error('Error loading home data:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los datos",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePlayTrack = (track) => {
    playTrack(track, featuredTracks);
  };

  const handleLike = () => {
    toast({
      title: "🚧 Esta función no está implementada aún",
      description: "¡Pero podés pedirla en tu próximo prompt! 🚀"
    });
  };

  const handleShare = () => {
    toast({
      title: "🚧 Esta función no está implementada aún",
      description: "¡Pero podés pedirla en tu próximo prompt! 🚀"
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Helmet>
          <title>HipHop Platform - La red social del Hip-Hop argentino</title>
          <meta name="description" content="Conectá con artistas, subí tu música, descubrí nuevos talentos y formá parte de la comunidad hip-hop más grande de Argentina." />
        </Helmet>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto px-4"
        >
          <div className="mb-8">
            <h1 className="text-6xl font-bold gradient-text mb-4">
              HipHop Platform
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              La red social del Hip-Hop argentino
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-xl p-6"
            >
              <Music className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Subí tu música</h3>
              <p className="text-gray-400">Compartí tus tracks y videos con la comunidad</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-xl p-6"
            >
              <Users className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Conectá con artistas</h3>
              <p className="text-gray-400">Seguí a tus artistas favoritos y descubrí nuevos talentos</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-xl p-6"
            >
              <TrendingUp className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Crecé tu carrera</h3>
              <p className="text-gray-400">Monetizá tu arte y conseguí contrataciones</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-3">
              Únete a la comunidad
            </Button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Helmet>
        <title>Inicio - HipHop Platform</title>
        <meta name="description" content="Descubrí la mejor música hip-hop argentina, seguí a tus artistas favoritos y mantente al día con las últimas novedades." />
      </Helmet>

      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-6 urban-pattern"
      >
        <h1 className="text-3xl font-bold gradient-text mb-2">
          ¡Qué onda, {user.display_name}! 🔥
        </h1>
        <p className="text-gray-300">
          Descubrí lo último en hip-hop argentino y conectá con la comunidad
        </p>
      </motion.div>

      {/* Featured Tracks */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Tracks Destacados</h2>
          <Link to="/explore" className="text-purple-400 hover:text-purple-300">
            Ver todos
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl p-4 hover:bg-white/10 transition-all group"
            >
              <div className="relative mb-4">
                <img 
                  className="w-full h-48 object-cover rounded-lg"
                  alt={`Cover de ${track.title}`}
                 src="https://images.unsplash.com/photo-1701403320634-89390f3f417f" />
                <Button
                  size="icon"
                  onClick={() => handlePlayTrack(track)}
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Play className="w-6 h-6" />
                </Button>
              </div>
              
              <h3 className="font-semibold text-white mb-1">{track.title}</h3>
              <p className="text-gray-400 text-sm mb-3">Por {track.artist_name}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button size="sm" variant="ghost" onClick={handleLike}>
                    <Heart className="w-4 h-4 mr-1" />
                    {track.likes_count || 0}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={handleShare}>
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-xs text-gray-500">{track.duration || '3:45'}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending Artists */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Artistas Trending</h2>
          <Link to="/explore" className="text-purple-400 hover:text-purple-300">
            Ver todos
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {trendingArtists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={`/artist/${artist.handle}`}
                className="block text-center group"
              >
                <div className="relative mb-2">
                  <img 
                    className="w-full aspect-square object-cover rounded-full group-hover:scale-105 transition-transform"
                    alt={`Foto de perfil de ${artist.display_name}`}
                   src="https://images.unsplash.com/photo-1546528377-9049abbac32f" />
                </div>
                <h3 className="font-medium text-white text-sm truncate group-hover:text-purple-400 transition-colors">
                  {artist.display_name}
                </h3>
                <p className="text-gray-400 text-xs">@{artist.handle}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Últimas Publicaciones</h2>
          <Link to="/explore" className="text-purple-400 hover:text-purple-300">
            Ver todas
          </Link>
        </div>

        <div className="space-y-4">
          {recentPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-start space-x-4">
                <img 
                  className="w-12 h-12 rounded-full object-cover"
                  alt={`Avatar de ${post.author_name}`}
                 src="https://images.unsplash.com/photo-1546528377-9049abbac32f" />
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-white">{post.author_name}</h3>
                    <span className="text-gray-400 text-sm">@{post.author_handle}</span>
                    <span className="text-gray-500 text-sm">·</span>
                    <span className="text-gray-500 text-sm">hace 2h</span>
                  </div>
                  
                  <p className="text-gray-300 mb-3">{post.content}</p>
                  
                  <div className="flex items-center space-x-6">
                    <Button size="sm" variant="ghost" onClick={handleLike}>
                      <Heart className="w-4 h-4 mr-1" />
                      {post.likes_count || 0}
                    </Button>
                    <Button size="sm" variant="ghost">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {post.comments_count || 0}
                    </Button>
                    <Button size="sm" variant="ghost" onClick={handleShare}>
                      <Share2 className="w-4 h-4 mr-1" />
                      {post.shares_count || 0}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
