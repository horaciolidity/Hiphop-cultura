// src/components/Layout.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Player from "@/components/Player";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Sun,
  Moon,
  Mic,
  SprayCan,
  Disc3,
  Zap,
} from "lucide-react";

function Layout({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  // Ocultar sidebar en ciertas páginas
  const hideSidebar = ["/admin"].includes(location.pathname);

  // Theme toggle (claro/oscuro)
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-gray-200 dark:to-white transition-colors duration-300">
      <Header />

      {/* Botón de toggle de tema */}
      <div className="fixed top-20 right-6 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setDark(!dark)}
          className="rounded-full shadow-md"
        >
          {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex">
        {user && !hideSidebar && <Sidebar />}

        <main
          className={`flex-1 ${
            user && !hideSidebar ? "ml-64" : ""
          } pt-16 pb-24 transition-all duration-300`}
        >
          <div className="container mx-auto px-4 py-6">{children}</div>
        </main>
      </div>

      {user && <Player />}
    </div>
  );
}

export default Layout;
