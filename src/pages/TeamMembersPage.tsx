
import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useApp } from "@/context/AppContext";
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

const TeamMembersPage: React.FC = () => {
  const { teamMembers } = useApp();
  
  return (
    <DashboardLayout title="Team Members">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-devotional-maroon">Your Team</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="devotional-button">
              <Plus size={16} className="mr-1" /> Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Team Member</DialogTitle>
              <DialogDescription>
                Add a new member to your team. This is a demo feature.
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member) => (
          <Card key={member.id} className="devotional-card">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="bg-devotional-gold text-white">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-devotional-maroon">
                  {member.name}
                </CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Mail size={14} className="mr-2 text-devotional-gold" />
                  <span>{member.name.toLowerCase().replace(' ', '.') + '@example.com'}</span>
                </div>
                <div className="flex items-center">
                  <Phone size={14} className="mr-2 text-devotional-gold" />
                  <span>+91 {Math.floor(Math.random() * 9000000000) + 1000000000}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full border-devotional-gold/30 hover:bg-devotional-gold/10"
              >
                View Profile
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default TeamMembersPage;
