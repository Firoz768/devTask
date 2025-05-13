
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { TaskCard } from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PlaceDetailPage: React.FC = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { places, tasks, teamMembers } = useApp();
  
  const place = places.find((p) => p.id === placeId);
  
  if (!place) {
    return (
      <DashboardLayout title="Devotional Place">
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-lg text-muted-foreground mb-4">
            Place not found
          </p>
          <Button 
            variant="outline" 
            className="border-devotional-gold/30 hover:bg-devotional-gold/10"
            onClick={() => navigate("/places")}
          >
            Back to All Places
          </Button>
        </div>
      </DashboardLayout>
    );
  }
  
  const placeTasks = tasks.filter((task) => task.placeId === place.id);
  const isAdmin = user?.role === "admin";
  
  return (
    <DashboardLayout title="Devotional Place">
      <div className="mb-6">
        <Button
          variant="ghost"
          className="mb-4 text-devotional-maroon hover:bg-devotional-gold/10"
          onClick={() => navigate("/places")}
        >
          <ArrowLeft size={16} className="mr-1" /> Back to All Places
        </Button>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Place Image */}
          <div className="md:w-1/3">
            <div className="rounded-lg overflow-hidden border border-devotional-gold/30">
              <img
                src={place.image || "https://images.unsplash.com/photo-1466442929976-97f336a657be"}
                alt={place.name}
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
          
          {/* Place Details */}
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold text-devotional-maroon">
              {place.name}
            </h1>
            <p className="text-muted-foreground mb-4">{place.location}</p>
            
            <div className="temple-ornate-border mb-4">
              <p className="mb-2">{place.description}</p>
              <p>
                This is a significant devotional site in South India, attracting
                many devotees and visitors throughout the year. The temple's architecture
                showcases the rich cultural heritage of the region.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="bg-devotional-gold/10 rounded-md px-3 py-1 text-sm">
                South India
              </div>
              <div className="bg-devotional-gold/10 rounded-md px-3 py-1 text-sm">
                Temple
              </div>
              <div className="bg-devotional-gold/10 rounded-md px-3 py-1 text-sm">
                Hindu
              </div>
              <div className="bg-devotional-gold/10 rounded-md px-3 py-1 text-sm">
                Historical
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tasks for this place */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-devotional-maroon mb-4">
          Tasks for {place.name}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {placeTasks.map((task) => {
            const assignedMember = task.assignedTo
              ? teamMembers.find((member) => member.id === task.assignedTo)
              : undefined;

            return (
              <TaskCard
                key={task.id}
                task={task}
                viewMode={isAdmin ? "admin" : "leader"}
                place={place}
                assignedMember={assignedMember}
              />
            );
          })}
          
          {placeTasks.length === 0 && (
            <div className="col-span-3 p-4 bg-muted rounded-md text-center">
              No tasks have been assigned to this place yet
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PlaceDetailPage;
