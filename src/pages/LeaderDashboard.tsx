
import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useApp } from "@/context/AppContext";
import { StatCard } from "@/components/stats/StatCard";
import { PlaceCard } from "@/components/PlaceCard";
import { TaskCard } from "@/components/TaskCard";
import { Calendar, CheckIcon, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LeaderDashboard: React.FC = () => {
  const { tasks, places, teamMembers } = useApp();
  const navigate = useNavigate();
  
  // Get only tasks assigned to this team leader
  // In a real app, we would filter based on the logged-in leader's ID
  const leaderTasks = tasks;
  
  // Calculate statistics
  const totalTasks = leaderTasks.length;
  const completedTasks = leaderTasks.filter(task => 
    task.status === "completed" || 
    task.status === "approved" || 
    task.status === "paid"
  ).length;
  
  const inProgressTasks = leaderTasks.filter(task => task.status === "in-progress").length;
  
  const totalExpenses = leaderTasks.reduce((acc, task) => {
    return acc + (
      task.expenses.food + 
      task.expenses.accommodation + 
      task.expenses.water + 
      task.expenses.other
    );
  }, 0);
  
  // Get the most recent tasks
  const recentTasks = leaderTasks.slice(0, 3);
  
  return (
    <DashboardLayout title="Team Leader Dashboard">
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Team Members" 
          value={teamMembers.length}
          description="Active members"
          icon={<Calendar size={20} />}
        />
        <StatCard 
          title="Total Tasks" 
          value={totalTasks}
          description={`${completedTasks} completed tasks`}
          icon={<CheckIcon size={20} />}
        />
        <StatCard 
          title="In Progress" 
          value={inProgressTasks}
          description="Tasks currently in progress"
          icon={<Clock size={20} />}
        />
        <StatCard 
          title="Total Expenses" 
          value={`₹${totalExpenses.toLocaleString()}`}
          description="Reported expenses"
          icon={<DollarSign size={20} />}
        />
      </div>

      {/* Devotional Places */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-devotional-maroon">
            Devotional Places
          </h2>
          <Button 
            variant="outline" 
            size="sm"
            className="border-devotional-gold/30 hover:bg-devotional-gold/10"
            onClick={() => navigate("/places")}
          >
            View All Places
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {places.slice(0, 4).map(place => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </div>
      
      {/* Recent Tasks */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-devotional-maroon">
            Recent Tasks
          </h2>
          <Button 
            variant="outline" 
            size="sm"
            className="border-devotional-gold/30 hover:bg-devotional-gold/10"
            onClick={() => navigate("/tasks")}
          >
            View All Tasks
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentTasks.map(task => {
            const taskPlace = places.find(place => place.id === task.placeId);
            const assignedMember = task.assignedTo 
              ? teamMembers.find(member => member.id === task.assignedTo)
              : undefined;
            
            return (
              <TaskCard 
                key={task.id} 
                task={task}
                place={taskPlace}
                assignedMember={assignedMember}
              />
            );
          })}
          
          {recentTasks.length === 0 && (
            <div className="col-span-3 p-4 bg-muted rounded-md text-center">
              No tasks have been created yet
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LeaderDashboard;
