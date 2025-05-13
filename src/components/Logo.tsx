
import React from "react";
import { useNavigate } from "react-router-dom";

interface LogoProps {
  size?: "small" | "medium" | "large";
}

export const Logo: React.FC<LogoProps> = ({ size = "medium" }) => {
  const navigate = useNavigate();
  
  const sizeClasses = {
    small: "h-8 w-8",
    medium: "h-12 w-12",
    large: "h-20 w-20"
  };
  
  const textClasses = {
    small: "text-sm",
    medium: "text-xl",
    large: "text-3xl"
  };

  return (
    <div 
      className="flex items-center gap-2 cursor-pointer" 
      onClick={() => navigate("/")}
    >
      <div className={`rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <img 
          src="/lovable-uploads/7bbc1dd2-beed-4ff6-8825-e71a58032e7d.png" 
          alt="Sai Balaji Logo"
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <h1 className={`font-bold devotional-gradient-text ${textClasses[size]}`}>
          Sai Balaji
        </h1>
        <p className="text-xs text-devotional-maroon">Devotional Dashboard</p>
      </div>
    </div>
  );
};
