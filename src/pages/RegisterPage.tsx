
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForms } from "@/components/AuthForms";
import { useAuth } from "@/context/AuthContext";
import { MusicPlayer } from "@/components/MusicPlayer";

const RegisterPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-devotional-gold/5 to-devotional-saffron/10 p-4">
      <div className="w-full max-w-md">
        <AuthForms defaultTab="register" />
      </div>
      <MusicPlayer />
    </div>
  );
};

export default RegisterPage;
