
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { dataClient } from '@/lib/data';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { usePlayer } from '@/contexts/PlayerContext';

function ExplorePage() {
  const [tracks, setTracks] = useState([]);
  const [videos, setVideos] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const { playTrack } = usePlayer();

  useEffect(() => {
    const loadExploreData = async () => {
      try {
        const [loadedTracks, loadedVideos, loadedArtists] = await Promise.all([
          dataClient.find('tracks', {}),
          dataClient.find('videos', {}),
          dataClient.find('profiles', { role: 'artist' })
        ]);
        setTracks(loadedTracks);
        setVideos(loadedVideos);
        setArtists(loadedArtists);
      } catch (error) {
        console.error('Error loading explore data:', error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los datos de exploración.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    loadExploreData();
  }, []);

  const handlePlayTrack = (track) => {
    playTrack(track, tracks);
  };

  return (
    <div className="space-y-8">
      <Helmet>
        <title>Explorar - HipHop Platform</title>
        <meta name="description" content="Explorá nuevos tracks, videos y artistas en la escena del hip-hop argentino." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold gradient-text">Explorar</h1>
        <p className="text-lg text-gray-300 mt-2">Descubrí lo nuevo de la escena.</p>
      </motion.div>

      {loading ? (
        <p className="text-white">Cargando...</p>
      ) : (
        <Tabs defaultValue="tracks" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/10 text-white">
            <TabsTrigger value="tracks" className="data-[state=active]:bg-purple-600">Tracks</TabsTrigger>
            <TabsTrigger value="videos" className="data-[state=active]:bg-purple-600">Videos</TabsTrigger>
            <TabsTrigger value="artists" className="data-[state=active]:bg-purple-600">Artistas</TabsTrigger>
          </TabsList>

          <TabsContent value="tracks" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass rounded-xl p-4 hover:bg-white/10 transition-all group"
                >
                  <div className="relative mb-4">
                    <img className="w-full h-48 object-cover rounded-lg" alt={`Cover de ${track.title}`} src="https://images.unsplash.com/photo-1701403320634-89390f3f417f" />
                    <Button
                      size="icon"
                      onClick={() => handlePlayTrack(track)}
                      className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Play className="w-6 h-6" />
                    </Button>
                  </div>
                  <Link to={`/track/${track.id}`}><h3 className="font-semibold text-white mb-1 hover:underline">{track.title}</h3></Link>
                  <Link to={`/artist/${track.artist_handle}`}><p className="text-gray-400 text-sm mb-3 hover:underline">{track.artist_name}</p></Link>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="mt-6">
             <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass rounded-xl p-4 hover:bg-white/10 transition-all group"
                >
                  <div className="relative mb-4">
                    <img className="w-full h-48 object-cover rounded-lg" alt={`Thumbnail de ${video.title}`} src="https://images.unsplash.com/photo-1516280440614-37939bb91594" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <Link to={`/video/${video.id}`}><h3 className="font-semibold text-white mb-1 hover:underline">{video.title}</h3></Link>
                  <Link to={`/artist/${video.artist_handle}`}><p className="text-gray-400 text-sm mb-3 hover:underline">{video.artist_name}</p></Link>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="artists" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {artists.map((artist, index) => (
                <motion.div
                  key={artist.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="text-center group"
                >
                  <Link to={`/artist/${artist.handle}`}>
                    <div className="relative mb-2">
                       <img className="w-full aspect-square object-cover rounded-full group-hover:scale-105 transition-transform" alt={`Foto de perfil de ${artist.display_name}`} src="https://images.unsplash.com/photo-1546528377-9049abbac32f" />
                    </div>
                    <h3 className="font-medium text-white text-sm truncate group-hover:text-purple-400 transition-colors">{artist.display_name}</h3>
                    <p className="text-gray-400 text-xs">@{artist.handle}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

export default ExplorePage;
