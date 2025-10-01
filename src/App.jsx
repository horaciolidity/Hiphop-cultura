
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { PlayerProvider } from '@/contexts/PlayerContext';
import { CartProvider } from '@/contexts/CartContext';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import ExplorePage from '@/pages/ExplorePage';
import SearchPage from '@/pages/SearchPage';
import ArtistPage from '@/pages/ArtistPage';
import TrackPage from '@/pages/TrackPage';
import VideoPage from '@/pages/VideoPage';
import AlbumPage from '@/pages/AlbumPage';
import PlaylistPage from '@/pages/PlaylistPage';
import PostPage from '@/pages/PostPage';
import EventsPage from '@/pages/EventsPage';
import CampaignPage from '@/pages/CampaignPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import VipPage from '@/pages/VipPage';
import BookingPage from '@/pages/BookingPage';
import ProfilePage from '@/pages/ProfilePage';
import SettingsPage from '@/pages/SettingsPage';
import AdminPage from '@/pages/AdminPage';

function App() {
  return (
    <Router>
      <Helmet>
        <title>HipHop Platform - La red social del Hip-Hop argentino</title>
        <meta name="description" content="Conectá con artistas, subí tu música, descubrí nuevos talentos y formá parte de la comunidad hip-hop más grande de Argentina." />
        <meta name="keywords" content="hip hop, rap, música, artistas, argentina, red social, streaming" />
        <meta property="og:title" content="HipHop Platform - La red social del Hip-Hop argentino" />
        <meta property="og:description" content="Conectá con artistas, subí tu música, descubrí nuevos talentos y formá parte de la comunidad hip-hop más grande de Argentina." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://hiphopplatform.com" />
      </Helmet>
      
      <AuthProvider>
        <PlayerProvider>
          <CartProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/artist/:handle" element={<ArtistPage />} />
                <Route path="/track/:id" element={<TrackPage />} />
                <Route path="/video/:id" element={<VideoPage />} />
                <Route path="/album/:id" element={<AlbumPage />} />
                <Route path="/playlist/:id" element={<PlaylistPage />} />
                <Route path="/post/:id" element={<PostPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/campaign/:id" element={<CampaignPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/vip/:handle" element={<VipPage />} />
                <Route path="/booking/:handle" element={<BookingPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </Layout>
            <Toaster />
          </CartProvider>
        </PlayerProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
