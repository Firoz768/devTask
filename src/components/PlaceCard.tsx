
import React from "react";
import { DevotionalPlace } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PlaceCardProps {
  place: DevotionalPlace;
  viewMode?: "admin" | "leader";
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, viewMode = "leader" }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="devotional-card overflow-hidden h-full flex flex-col">
      <div className="h-40 overflow-hidden">
        <img
          src={place.image || "https://images.unsplash.com/photo-1466442929976-97f336a657be"}
          alt={place.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-devotional-maroon">{place.name}</CardTitle>
        <CardDescription>{place.location}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-sm">{place.description}</p>
      </CardContent>
      
      <CardFooter className="pt-2 border-t border-devotional-gold/20">
        <Button
          variant="outline"
          className="w-full border-devotional-gold/30 hover:bg-devotional-gold/10"
          onClick={() => navigate(`/place/${place.id}`)}
        >
          {viewMode === "leader" ? "View Tasks" : "View Details"}
        </Button>
      </CardFooter>
    </Card>
  );
};
