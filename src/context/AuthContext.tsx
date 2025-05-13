
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/types";
import { toast } from "@/components/ui/sonner";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => false,
  register: async () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if the user is already logged in
    const storedUser = localStorage.getItem("bhakti-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login functionality
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // In a real application, this would be an API call
      // For demo purposes, we're using hardcoded users
      
      const adminUser: User = {
        id: "admin-1",
        name: "Admin User",
        email: "admin@example.com",
        role: "admin",
        avatar: "/lovable-uploads/7bbc1dd2-beed-4ff6-8825-e71a58032e7d.png"
      };
      
      const leaderUser: User = {
        id: "leader-1",
        name: "Team Leader",
        email: "leader@example.com",
        role: "leader",
        avatar: "/lovable-uploads/7bbc1dd2-beed-4ff6-8825-e71a58032e7d.png"
      };
      
      // Check credentials
      if (email === "admin@example.com" && password === "admin123") {
        setUser(adminUser);
        localStorage.setItem("bhakti-user", JSON.stringify(adminUser));
        toast.success("Welcome Admin!");
        return true;
      } else if (email === "leader@example.com" && password === "leader123") {
        setUser(leaderUser);
        localStorage.setItem("bhakti-user", JSON.stringify(leaderUser));
        toast.success("Welcome Team Leader!");
        return true;
      }
      
      toast.error("Invalid credentials");
      return false;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Error logging in");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock register functionality
  const register = async (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // In a real application, this would be an API call
      // For demo purposes, we'll simulate registration
      
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role,
        avatar: "/lovable-uploads/7bbc1dd2-beed-4ff6-8825-e71a58032e7d.png"
      };
      
      setUser(newUser);
      localStorage.setItem("bhakti-user", JSON.stringify(newUser));
      toast.success("Registration successful!");
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Error registering");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bhakti-user");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
