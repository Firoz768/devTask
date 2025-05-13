
import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/components/Logo";
import { MusicPlayer } from "@/components/MusicPlayer";
import { 
  Home, 
  Settings, 
  User, 
  Users, 
  LogOut,
  Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  title = "Dashboard" 
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const isAdmin = user.role === "admin";

  const menuItems = [
    {
      icon: <Home size={18} />,
      label: "Dashboard",
      link: "/",
      role: "both"
    },
    {
      icon: <Users size={18} />,
      label: "Team Leaders",
      link: "/team-leaders",
      role: "admin"
    },
    {
      icon: <Users size={18} />,
      label: "Team Members",
      link: "/team-members",
      role: "leader"
    },
    {
      icon: <Calendar size={18} />,
      label: "Tasks",
      link: "/tasks",
      role: "both"
    },
    {
      icon: <Settings size={18} />,
      label: "Settings",
      link: "/settings",
      role: "both"
    },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.role === "both" || item.role === user.role
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-devotional-gold/5 to-devotional-saffron/10">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-devotional-gold/30 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Logo />
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-devotional-maroon hidden md:inline-block">
              {user.name} ({isAdmin ? "Admin" : "Team Leader"})
            </span>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar || ""} alt={user.name} />
                    <AvatarFallback className="bg-devotional-gold text-white">
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-devotional-maroon mb-6">{title}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="temple-ornate-border p-4 shadow-lg">
              <h2 className="font-semibold text-devotional-maroon mb-4 border-b border-devotional-gold/30 pb-2">
                Menu
              </h2>
              <nav className="space-y-1">
                {filteredMenuItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className={`w-full justify-start text-left mb-1 hover:bg-devotional-gold/20 hover:text-devotional-maroon ${
                      window.location.pathname === item.link
                        ? "bg-devotional-gold/20 text-devotional-maroon"
                        : "text-gray-700"
                    }`}
                    onClick={() => navigate(item.link)}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left mb-1 hover:bg-devotional-gold/20 text-gray-700 hover:text-devotional-maroon"
                  onClick={logout}
                >
                  <LogOut size={18} className="mr-2" />
                  Sign Out
                </Button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-4">
            <div className="temple-ornate-border">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-devotional-gold/30 py-4 mt-10">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Sai Balaji Dashboard. All rights reserved.</p>
        </div>
      </footer>

      {/* Music Player */}
      <MusicPlayer />
    </div>
  );
};
