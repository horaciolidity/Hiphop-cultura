
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Music, Video, FileText, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const StatCard = ({ icon: Icon, title, value, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass p-6 rounded-xl flex items-center space-x-4"
  >
    <div className={`p-3 rounded-full ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </motion.div>
);

function AdminDashboard({ data }) {
  const handleAction = (description) => {
    toast({
      title: "Acción de moderación",
      description: `Simulando acción: ${description}. Esta función requiere implementación completa.`,
    });
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <StatCard icon={Users} title="Total de Usuarios" value={data.stats.totalUsers} color="bg-blue-500" />
        <StatCard icon={Music} title="Total de Tracks" value={data.stats.totalTracks} color="bg-purple-500" />
        <StatCard icon={Video} title="Total de Videos" value={data.stats.totalVideos} color="bg-pink-500" />
        <StatCard icon={FileText} title="Total de Posts" value={data.stats.totalPosts} color="bg-green-500" />
        <StatCard icon={AlertTriangle} title="Reportes Pendientes" value={data.stats.pendingReports} color="bg-yellow-500" />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pending Reports */}
        <div className="lg:col-span-2 glass rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Reportes Pendientes</h2>
          {data.pendingReports && data.pendingReports.length > 0 ? (
            <div className="space-y-4">
              {data.pendingReports.map(report => (
                <div key={report.id} className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-white">Contenido: <span className="font-normal text-gray-300">{report.content_type} (ID: {report.content_id})</span></p>
                      <p className="font-semibold text-white">Reportado por: <span className="font-normal text-gray-300">{report.reporter_id}</span></p>
                      <p className="font-semibold text-white">Motivo: <span className="font-normal text-gray-300">{report.reason}</span></p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white" onClick={() => handleAction(`Aprobar reporte ${report.id}`)}>
                        <ShieldCheck className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white" onClick={() => handleAction(`Rechazar reporte ${report.id}`)}>
                        <AlertTriangle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No hay reportes pendientes. ¡Buen trabajo!</p>
          )}
        </div>

        {/* Recent Users */}
        <div className="glass rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Usuarios Recientes</h2>
          <div className="space-y-3">
            {data.recentUsers && data.recentUsers.map(user => (
              <div key={user.id} className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center font-bold">
                  {user.display_name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-white">{user.display_name}</p>
                  <p className="text-sm text-gray-400">@{user.handle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
