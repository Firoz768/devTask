
import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { PlaceCard } from "@/components/PlaceCard";

const PlacesPage: React.FC = () => {
  const { user } = useAuth();
  const { places } = useApp();
  const isAdmin = user?.role === "admin";
  
  return (
    <DashboardLayout title="Devotional Places">
      <h2 className="text-xl font-bold text-devotional-maroon mb-6">
        All Devotional Places in South India
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.map((place) => (
          <PlaceCard 
            key={place.id} 
            place={place} 
            viewMode={isAdmin ? "admin" : "leader"} 
          />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default PlacesPage;
