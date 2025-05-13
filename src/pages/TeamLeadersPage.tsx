
import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail, Phone, Plus } from "lucide-react";

const TeamLeadersPage: React.FC = () => {
  // Mock data for team leaders
  const teamLeaders = [
    {
      id: "leader-1",
      name: "Team Leader",
      role: "Senior Team Leader",
      avatar: "/lovable-uploads/7bbc1dd2-beed-4ff6-8825-e71a58032e7d.png",
      email: "leader@example.com",
      phone: "+91 9876543210",
      tasksManaged: 3,
      teamMembers: 4
    }
  ];
  
  return (
    <DashboardLayout title="Team Leaders">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-devotional-maroon">All Team Leaders</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="devotional-button">
              <Plus size={16} className="mr-1" /> Add Leader
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Team Leader</DialogTitle>
              <DialogDescription>
                Add a new team leader. This is a demo feature.
              </DialogDescription>
            </DialogHeader>
            
            <DialogFooter>
              <Button className="devotional-button">
                Not implemented in demo
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teamLeaders.map((leader) => (
          <Card key={leader.id} className="devotional-card">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={leader.avatar} alt={leader.name} />
                <AvatarFallback className="bg-devotional-gold text-white">
                  {leader.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-devotional-maroon">
                  {leader.name}
                </CardTitle>
                <CardDescription>{leader.role}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Mail size={14} className="mr-2 text-devotional-gold" />
                  <span>{leader.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone size={14} className="mr-2 text-devotional-gold" />
                  <span>{leader.phone}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-devotional-gold/10 rounded-md p-3 text-center">
                  <div className="text-2xl font-bold text-devotional-maroon">
                    {leader.tasksManaged}
                  </div>
                  <div className="text-xs text-gray-500">
                    Tasks Managed
                  </div>
                </div>
                <div className="bg-devotional-gold/10 rounded-md p-3 text-center">
                  <div className="text-2xl font-bold text-devotional-maroon">
                    {leader.teamMembers}
                  </div>
                  <div className="text-xs text-gray-500">
                    Team Members
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full border-devotional-gold/30 hover:bg-devotional-gold/10"
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default TeamLeadersPage;
