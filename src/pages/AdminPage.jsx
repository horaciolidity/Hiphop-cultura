
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { dataClient } from '@/lib/data';
import AdminDashboard from '@/components/AdminDashboard';

function AdminPage() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      toast({
        title: "Acceso denegado",
        description: "No tenés permisos para acceder a esta página.",
        variant: "destructive"
      });
      navigate('/');
    } else {
      loadDashboardData();
    }
  }, [isAdmin, navigate]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch all necessary data for the dashboard in parallel
      const [users, tracks, videos, posts, reports] = await Promise.all([
        dataClient.find('profiles'),
        dataClient.find('tracks'),
        dataClient.find('videos'),
        dataClient.find('posts'),
        dataClient.find('reports') // Assuming reports mock exists
      ]);

      const totalUsers = users.length;
      const totalTracks = tracks.length;
      const totalVideos = videos.length;
      const totalPosts = posts.length;
      
      const pendingReports = reports ? reports.filter(r => r.status === 'pending') : [];

      setDashboardData({
        stats: {
          totalUsers,
          totalTracks,
          totalVideos,
          totalPosts,
          pendingReports: pendingReports.length,
        },
        recentUsers: users.slice(-5),
        pendingReports,
      });

    } catch (error) {
      console.error("Error loading admin dashboard data:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los datos del panel de administración.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return null; // Redirect is handled in useEffect
  }
  
  if (loading) {
    return <p className="text-white text-center">Cargando panel de administración...</p>;
  }

  return (
    <div className="p-4 md:p-8 bg-slate-900 min-h-screen text-white">
      <Helmet>
        <title>Panel de Administración - HipHop Platform</title>
        <meta name="description" content="Panel de administración para moderadores y administradores." />
      </Helmet>

      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="mb-8"
      >
        <h1 className="text-4xl font-bold gradient-text">Panel de Administración</h1>
        <p className="text-gray-400 mt-2">Bienvenido, {user?.display_name}.</p>
      </motion.div>

      {dashboardData && (
        <AdminDashboard data={dashboardData} />
      )}
    </div>
  );
}

export default AdminPage;
