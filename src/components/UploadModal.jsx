
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UploadCloud } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { dataClient } from '@/lib/data';
import { useAuth } from '@/contexts/AuthContext';

function UploadModal({ isOpen, onClose }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [trackData, setTrackData] = useState({ title: '', description: '', is_public: true, price: 0 });
  const [videoData, setVideoData] = useState({ title: '', description: '', is_public: true });

  const handleFileChange = (e, type) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      if (type === 'track') {
        reader.readAsDataURL(selectedFile); // For audio, a generic preview is fine
      } else {
        reader.readAsDataURL(selectedFile); // For video
      }
    }
  };

  const handleInputChange = (e, type) => {
    const { name, value, type: inputType, checked } = e.target;
    const setter = type === 'track' ? setTrackData : setVideoData;
    setter(prev => ({
      ...prev,
      [name]: inputType === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    if (!file || !user) {
      toast({
        title: "Error",
        description: "Falta el archivo o no has iniciado sesión",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const dataToSave = type === 'track' ? trackData : videoData;
      const collection = type === 'track' ? 'tracks' : 'videos';

      // Mock upload process
      const uploadedData = {
        ...dataToSave,
        user_id: user.id,
        artist_name: user.display_name,
        artist_handle: user.handle,
        file_url: `/mock/${type}/${file.name}`,
        // In a real scenario, you'd get the URL from Supabase Storage
      };

      await dataClient.create(collection, uploadedData);

      toast({
        title: "¡Subida exitosa!",
        description: `Tu ${type === 'track' ? 'track' : 'video'} se ha subido correctamente.`
      });
      resetForm();
      onClose();

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error de subida",
        description: `No se pudo subir el ${type === 'track' ? 'track' : 'video'}.`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setTrackData({ title: '', description: '', is_public: true, price: 0 });
    setVideoData({ title: '', description: '', is_public: true });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) resetForm(); onClose(); }}>
      <DialogContent className="sm:max-w-lg bg-black/90 border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Subir Contenido</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="track" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/10">
            <TabsTrigger value="track" className="data-[state=active]:bg-purple-600">Track</TabsTrigger>
            <TabsTrigger value="video" className="data-[state=active]:bg-purple-600">Video</TabsTrigger>
          </TabsList>

          <TabsContent value="track">
            <form onSubmit={(e) => handleSubmit(e, 'track')} className="space-y-4">
              <FileUploader preview={preview} onFileChange={(e) => handleFileChange(e, 'track')} type="audio" />
              <div className="space-y-2">
                <Label htmlFor="trackTitle">Título</Label>
                <Input id="trackTitle" name="title" value={trackData.title} onChange={(e) => handleInputChange(e, 'track')} required className="bg-white/10 border-white/20" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trackDescription">Descripción</Label>
                <Input id="trackDescription" name="description" value={trackData.description} onChange={(e) => handleInputChange(e, 'track')} className="bg-white/10 border-white/20" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trackPrice">Precio (ARS, 0 para gratis)</Label>
                <Input id="trackPrice" name="price" type="number" value={trackData.price} onChange={(e) => handleInputChange(e, 'track')} className="bg-white/10 border-white/20" />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700">
                  {loading ? 'Subiendo...' : 'Subir Track'}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>

          <TabsContent value="video">
            <form onSubmit={(e) => handleSubmit(e, 'video')} className="space-y-4">
              <FileUploader preview={preview} onFileChange={(e) => handleFileChange(e, 'video')} type="video" />
              <div className="space-y-2">
                <Label htmlFor="videoTitle">Título</Label>
                <Input id="videoTitle" name="title" value={videoData.title} onChange={(e) => handleInputChange(e, 'video')} required className="bg-white/10 border-white/20" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="videoDescription">Descripción</Label>
                <Input id="videoDescription" name="description" value={videoData.description} onChange={(e) => handleInputChange(e, 'video')} className="bg-white/10 border-white/20" />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700">
                  {loading ? 'Subiendo...' : 'Subir Video'}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

const FileUploader = ({ preview, onFileChange, type }) => (
  <div className="space-y-2">
    <Label htmlFor={`${type}File`}>Archivo de {type === 'audio' ? 'audio' : 'video'}</Label>
    <div className="flex items-center justify-center w-full">
      <label htmlFor={`${type}File`} className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-white/5 border-white/30 hover:bg-white/10">
        {preview ? (
          type === 'audio' ? <p>Audio seleccionado</p> : <img src={preview} alt="Preview" className="h-full object-contain" />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloud className="w-8 h-8 mb-2 text-gray-400" />
            <p className="mb-2 text-sm text-gray-400">
              <span className="font-semibold">Click para subir</span> o arrastrá el archivo
            </p>
          </div>
        )}
        <Input id={`${type}File`} type="file" accept={`${type}/*`} className="hidden" onChange={onFileChange} />
      </label>
    </div>
  </div>
);

export default UploadModal;
