
import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { tasks } = useApp();
  
  const isAdmin = user?.role === "admin";
  
  // Filter tasks based on user role
  const userTasks = tasks;
  
  // Calculate statistics
  const totalTasks = userTasks.length;
  const completedTasks = userTasks.filter(task => 
    task.status === "completed" || 
    task.status === "approved" || 
    task.status === "paid"
  ).length;
  
  const pendingTasks = userTasks.filter(task => 
    task.status === "pending" || 
    task.status === "in-progress"
  ).length;
  
  const totalExpenses = userTasks.reduce((acc, task) => {
    return acc + (
      task.expenses.food + 
      task.expenses.accommodation + 
      task.expenses.water + 
      task.expenses.other
    );
  }, 0);
  
  return (
    <DashboardLayout title="My Profile">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <Card className="devotional-card lg:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-devotional-gold text-white text-xl">
                  {user?.name?.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-2xl font-bold text-devotional-maroon">
              {user?.name}
            </CardTitle>
            <p className="text-muted-foreground">
              {isAdmin ? "Admin" : "Team Leader"}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <Mail className="text-devotional-gold mr-2" size={18} />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="text-devotional-gold mr-2" size={18} />
              <span>+91 9876543210</span>
            </div>
            <div className="flex items-center">
              <MapPin className="text-devotional-gold mr-2" size={18} />
              <span>Chennai, Tamil Nadu</span>
            </div>
            
            <div className="pt-4 border-t border-devotional-gold/20">
              <h3 className="font-medium mb-2">About Me</h3>
              <p className="text-sm text-muted-foreground">
                Dedicated {isAdmin ? "administrator" : "team leader"} with expertise in managing devotional services and teams across South India. Passionate about preserving and promoting spiritual heritage.
              </p>
            </div>
            
            <div className="pt-4">
              <Button 
                variant="outline" 
                className="w-full border-devotional-gold/30 hover:bg-devotional-gold/10"
                onClick={() => window.location.href = "/settings"}
              >
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Activity & Stats */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="devotional-card">
            <CardHeader>
              <CardTitle className="text-devotional-maroon">Activity Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-devotional-gold/10 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-devotional-maroon mb-1">
                    {totalTasks}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Tasks
                  </div>
                </div>
                <div className="bg-devotional-gold/10 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-devotional-maroon mb-1">
                    {completedTasks}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Completed Tasks
                  </div>
                </div>
                <div className="bg-devotional-gold/10 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-devotional-maroon mb-1">
                    {pendingTasks}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Pending Tasks
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Task Completion</span>
                  <span className="text-sm text-muted-foreground">
                    {totalTasks > 0 
                      ? Math.round((completedTasks / totalTasks) * 100) 
                      : 0}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-devotional-gold to-devotional-orange h-2.5 rounded-full" 
                    style={{ 
                      width: `${totalTasks > 0 
                        ? Math.round((completedTasks / totalTasks) * 100) 
                        : 0}%` 
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="devotional-card">
            <CardHeader>
              <CardTitle className="text-devotional-maroon">Financial Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Total Expenses Reported:</span>
                  <span className="font-bold text-devotional-maroon">₹{totalExpenses.toLocaleString()}</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="border border-devotional-gold/20 rounded-md p-3">
                    <div className="text-sm text-muted-foreground mb-1">Food</div>
                    <div className="font-semibold">
                      ₹{userTasks.reduce((acc, task) => acc + task.expenses.food, 0).toLocaleString()}
                    </div>
                  </div>
                  <div className="border border-devotional-gold/20 rounded-md p-3">
                    <div className="text-sm text-muted-foreground mb-1">Accommodation</div>
                    <div className="font-semibold">
                      ₹{userTasks.reduce((acc, task) => acc + task.expenses.accommodation, 0).toLocaleString()}
                    </div>
                  </div>
                  <div className="border border-devotional-gold/20 rounded-md p-3">
                    <div className="text-sm text-muted-foreground mb-1">Water</div>
                    <div className="font-semibold">
                      ₹{userTasks.reduce((acc, task) => acc + task.expenses.water, 0).toLocaleString()}
                    </div>
                  </div>
                  <div className="border border-devotional-gold/20 rounded-md p-3">
                    <div className="text-sm text-muted-foreground mb-1">Other</div>
                    <div className="font-semibold">
                      ₹{userTasks.reduce((acc, task) => acc + task.expenses.other, 0).toLocaleString()}
                    </div>
                  </div>
                </div>
                
                {isAdmin && (
                  <div className="pt-4 border-t border-devotional-gold/20">
                    <div className="flex justify-between">
                      <span className="font-medium">Payments Pending Approval:</span>
                      <span className="font-bold text-devotional-orange">
                        ₹{userTasks
                          .filter(task => task.status === "approved")
                          .reduce((acc, task) => {
                            return acc + (
                              task.expenses.food + 
                              task.expenses.accommodation + 
                              task.expenses.water + 
                              task.expenses.other
                            );
                          }, 0)
                          .toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
