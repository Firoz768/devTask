
import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/sonner";

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  
  const handleSavePersonal = () => {
    toast.success("Personal information saved");
  };
  
  const handleSaveAccount = () => {
    toast.success("Account settings saved");
  };
  
  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved");
  };
  
  return (
    <DashboardLayout title="Settings">
      <Tabs defaultValue="personal" className="mb-6">
        <TabsList className="bg-devotional-gold/10 border border-devotional-gold/30 mb-6">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-devotional-gold text-white text-lg">
                {user?.name?.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="space-y-1">
              <h3 className="text-lg font-medium">{user?.name}</h3>
              <div className="text-sm text-muted-foreground">{user?.email}</div>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-devotional-gold/30 hover:bg-devotional-gold/10"
              >
                Change Avatar
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  defaultValue={user?.name} 
                  className="border-devotional-gold/30" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  defaultValue={user?.email} 
                  className="border-devotional-gold/30" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  defaultValue="+91 9876543210" 
                  className="border-devotional-gold/30" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  defaultValue="Chennai, Tamil Nadu" 
                  className="border-devotional-gold/30" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea 
                id="bio" 
                className="w-full min-h-[100px] rounded-md border border-devotional-gold/30 p-2" 
                defaultValue="Dedicated team member with expertise in devotional services."
              />
            </div>
            
            <Button className="devotional-button" onClick={handleSavePersonal}>
              Save Personal Information
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="account" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Change Password</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input 
                  id="current-password" 
                  type="password" 
                  className="border-devotional-gold/30" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input 
                  id="new-password" 
                  type="password" 
                  className="border-devotional-gold/30" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password" 
                  className="border-devotional-gold/30" 
                />
              </div>
            </div>
            
            <Button className="devotional-button" onClick={handleSaveAccount}>
              Update Password
            </Button>
            
            <div className="border-t border-devotional-gold/20 pt-6 mt-6">
              <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Please be careful with these actions as they cannot be undone.
              </p>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Email Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Task Updates</p>
                  <p className="text-sm text-muted-foreground">
                    Receive emails when tasks are updated
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Payment Confirmations</p>
                  <p className="text-sm text-muted-foreground">
                    Receive emails when payments are processed
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Team Member Activity</p>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about team member activities
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Promotional Emails</p>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about new features and offers
                  </p>
                </div>
                <Switch />
              </div>
            </div>
            
            <h3 className="text-lg font-medium pt-4">Push Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Task Assignments</p>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when tasks are assigned to you
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Task Completion</p>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when tasks are completed
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
            
            <Button className="devotional-button" onClick={handleSaveNotifications}>
              Save Notification Settings
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default SettingsPage;
