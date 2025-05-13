
import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import LeaderDashboard from "./LeaderDashboard";
import LoginPage from "./LoginPage";

const Index = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-devotional-gold/5 to-devotional-saffron/10">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden">
            <img 
              src="/lovable-uploads/7bbc1dd2-beed-4ff6-8825-e71a58032e7d.png" 
              alt="Sai Balaji Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold devotional-gradient-text">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return user.role === "admin" ? <AdminDashboard /> : <LeaderDashboard />;
};

export default Index;
