
import { toast } from '@/components/ui/use-toast';

class AuthService {
  constructor() {
    this.currentUser = null;
    this.listeners = [];
    this.loadUserFromStorage();
  }

  loadUserFromStorage() {
    try {
      const userData = localStorage.getItem('auth_user');
      if (userData) {
        this.currentUser = JSON.parse(userData);
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
      localStorage.removeItem('auth_user');
    }
  }

  saveUserToStorage(user) {
    if (user) {
      localStorage.setItem('auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('auth_user');
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentUser));
  }

  async signIn(email, password) {
    try {
      // Mock authentication - in real app this would call Supabase
      const mockUser = {
        id: 'user_1',
        email,
        handle: 'usuario_demo',
        display_name: 'Usuario Demo',
        avatar_url: null,
        role: 'user',
        subscription_tier: 'free',
        created_at: new Date().toISOString()
      };

      this.currentUser = mockUser;
      this.saveUserToStorage(mockUser);
      this.notifyListeners();

      toast({
        title: "¡Bienvenido!",
        description: "Sesión iniciada correctamente"
      });

      return { user: mockUser, error: null };
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo iniciar sesión",
        variant: "destructive"
      });
      return { user: null, error };
    }
  }

  async signUp(email, password, userData = {}) {
    try {
      // Mock registration - in real app this would call Supabase
      const mockUser = {
        id: `user_${Date.now()}`,
        email,
        handle: userData.handle || email.split('@')[0],
        display_name: userData.display_name || 'Nuevo Usuario',
        avatar_url: null,
        role: 'user',
        subscription_tier: 'free',
        created_at: new Date().toISOString(),
        ...userData
      };

      this.currentUser = mockUser;
      this.saveUserToStorage(mockUser);
      this.notifyListeners();

      toast({
        title: "¡Cuenta creada!",
        description: "Tu cuenta se creó exitosamente"
      });

      return { user: mockUser, error: null };
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear la cuenta",
        variant: "destructive"
      });
      return { user: null, error };
    }
  }

  async signOut() {
    try {
      this.currentUser = null;
      this.saveUserToStorage(null);
      this.notifyListeners();

      toast({
        title: "Sesión cerrada",
        description: "Hasta la próxima"
      });

      return { error: null };
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo cerrar la sesión",
        variant: "destructive"
      });
      return { error };
    }
  }

  async getSession() {
    return {
      user: this.currentUser,
      session: this.currentUser ? { access_token: 'mock_token' } : null
    };
  }

  async updateProfile(updates) {
    try {
      if (!this.currentUser) {
        throw new Error('No user logged in');
      }

      this.currentUser = { ...this.currentUser, ...updates };
      this.saveUserToStorage(this.currentUser);
      this.notifyListeners();

      toast({
        title: "Perfil actualizado",
        description: "Los cambios se guardaron correctamente"
      });

      return { user: this.currentUser, error: null };
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el perfil",
        variant: "destructive"
      });
      return { user: null, error };
    }
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  hasRole(role) {
    return this.currentUser?.role === role;
  }

  isAdmin() {
    return this.hasRole('admin') || this.hasRole('moderator');
  }
}

export const authService = new AuthService();
export default authService;
