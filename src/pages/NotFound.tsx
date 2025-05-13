
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-devotional-gold/5 to-devotional-saffron/10 p-4">
      <div className="w-20 h-20 rounded-full mb-6 overflow-hidden">
        <img 
          src="/lovable-uploads/7bbc1dd2-beed-4ff6-8825-e71a58032e7d.png" 
          alt="Sai Balaji Logo"
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-4xl font-bold devotional-gradient-text mb-4">404</h1>
      <p className="text-xl text-devotional-maroon mb-6">
        Oops! Page not found
      </p>
      <Button className="devotional-button" onClick={() => navigate("/")}>
        Return to Dashboard
      </Button>
    </div>
  );
};

export default NotFound;
