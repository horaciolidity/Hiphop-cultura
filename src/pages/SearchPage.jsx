
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { dataClient } from '@/lib/data';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState({ tracks: [], videos: [], artists: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    if (query) {
      performSearch();
    } else {
      setResults({ tracks: [], videos: [], artists: [] });
    }
  }, [query]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const lowerCaseQuery = query.toLowerCase();
      
      const allTracks = await dataClient.find('tracks');
      const allVideos = await dataClient.find('videos');
      const allArtists = await dataClient.find('profiles', { role: 'artist' });

      const filteredTracks = allTracks.filter(t => 
        t.title.toLowerCase().includes(lowerCaseQuery) || 
        t.artist_name.toLowerCase().includes(lowerCaseQuery)
      );
      const filteredVideos = allVideos.filter(v => 
        v.title.toLowerCase().includes(lowerCaseQuery) ||
        v.artist_name.toLowerCase().includes(lowerCaseQuery)
      );
      const filteredArtists = allArtists.filter(a => 
        a.display_name.toLowerCase().includes(lowerCaseQuery) ||
        a.handle.toLowerCase().includes(lowerCaseQuery)
      );

      setResults({ tracks: filteredTracks, videos: filteredVideos, artists: filteredArtists });
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Error de búsqueda",
        description: "No se pudieron obtener los resultados.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Helmet>
        <title>Resultados de búsqueda para "{query}" - HipHop Platform</title>
        <meta name="description" content={`Resultados de búsqueda para ${query} en HipHop Platform.`} />
      </Helmet>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-white">
          Búsqueda: <span className="gradient-text">{query}</span>
        </h1>
      </motion.div>

      {loading ? (
        <p className="text-white">Buscando...</p>
      ) : !query ? (
        <p className="text-gray-400">Empezá a escribir en la barra de búsqueda para ver resultados.</p>
      ) : (results.tracks.length === 0 && results.videos.length === 0 && results.artists.length === 0) ? (
        <p className="text-gray-400">No se encontraron resultados para "{query}". Probá con otra búsqueda.</p>
      ) : (
        <div className="space-y-12">
          {results.tracks.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Tracks</h2>
              <div className="space-y-4">
                {results.tracks.map(track => (
                  <div key={track.id} className="glass p-4 rounded-lg flex items-center">
                     <img className="w-12 h-12 object-cover rounded-md" alt={`Cover de ${track.title}`} src="https://images.unsplash.com/photo-1701403320634-89390f3f417f" />
                    <div className="ml-4">
                      <p className="font-semibold text-white">{track.title}</p>
                      <p className="text-sm text-gray-400">{track.artist_name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {results.videos.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Videos</h2>
              <div className="space-y-4">
                 {results.videos.map(video => (
                  <div key={video.id} className="glass p-4 rounded-lg flex items-center">
                     <img className="w-24 h-14 object-cover rounded-md" alt={`Thumbnail de ${video.title}`} src="https://images.unsplash.com/photo-1516280440614-37939bb91594" />
                    <div className="ml-4">
                      <p className="font-semibold text-white">{video.title}</p>
                      <p className="text-sm text-gray-400">{video.artist_name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {results.artists.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Artistas</h2>
              <div className="space-y-4">
                {results.artists.map(artist => (
                  <div key={artist.id} className="glass p-4 rounded-lg flex items-center">
                     <img className="w-12 h-12 object-cover rounded-full" alt={`Avatar de ${artist.display_name}`} src="https://images.unsplash.com/photo-1546528377-9049abbac32f" />
                    <div className="ml-4">
                      <p className="font-semibold text-white">{artist.display_name}</p>
                      <p className="text-sm text-gray-400">@{artist.handle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
