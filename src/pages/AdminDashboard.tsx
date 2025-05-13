
import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useApp } from "@/context/AppContext";
import { StatCard } from "@/components/stats/StatCard";
import { TasksChart } from "@/components/stats/TasksChart";
import { ExpensesChart } from "@/components/stats/ExpensesChart";
import { TaskCard } from "@/components/TaskCard";
import { Users, Calendar, Target, DollarSign } from "lucide-react";

const AdminDashboard: React.FC = () => {
  const { tasks, places, teamMembers } = useApp();
  
  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => 
    task.status === "completed" || 
    task.status === "approved" || 
    task.status === "paid"
  ).length;
  
  const pendingPayments = tasks.filter(task => task.status === "approved").length;
  
  const totalExpenses = tasks.reduce((acc, task) => {
    return acc + (
      task.expenses.food + 
      task.expenses.accommodation + 
      task.expenses.water + 
      task.expenses.other
    );
  }, 0);
  
  // Get the most recent tasks that need attention
  const tasksNeedingAction = tasks
    .filter(task => task.status === "completed" || task.status === "approved")
    .slice(0, 3);
  
  return (
    <DashboardLayout title="Admin Dashboard">
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Team Leaders" 
          value="1"
          description="Active team leaders"
          icon={<Users size={20} />}
        />
        <StatCard 
          title="Total Tasks" 
          value={totalTasks}
          description={`${completedTasks} completed tasks`}
          icon={<Calendar size={20} />}
        />
        <StatCard 
          title="Devotional Places" 
          value={places.length}
          description="Places being managed"
          icon={<Target size={20} />}
        />
        <StatCard 
          title="Total Expenses" 
          value={`₹${totalExpenses.toLocaleString()}`}
          description={`${pendingPayments} payments pending`}
          icon={<DollarSign size={20} />}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <TasksChart />
        <ExpensesChart />
      </div>

      {/* Tasks needing attention */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-devotional-maroon mb-4">
          Tasks Needing Attention
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasksNeedingAction.map(task => {
            const taskPlace = places.find(place => place.id === task.placeId);
            const assignedMember = task.assignedTo 
              ? teamMembers.find(member => member.id === task.assignedTo)
              : undefined;
            
            return (
              <TaskCard 
                key={task.id} 
                task={task} 
                viewMode="admin"
                place={taskPlace}
                assignedMember={assignedMember}
              />
            );
          })}
          
          {tasksNeedingAction.length === 0 && (
            <div className="col-span-3 p-4 bg-muted rounded-md text-center">
              No tasks currently need your attention
            </div>
          )}
        </div>
      </div>
      
      {/* Devotional Places */}
      <div>
        <h2 className="text-xl font-bold text-devotional-maroon mb-4">
          Devotional Places
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {places.map(place => (
            <div
              key={place.id}
              className="bg-white rounded-md overflow-hidden shadow-sm border border-devotional-gold/20"
            >
              <div className="h-32 overflow-hidden">
                <img
                  src={place.image || "https://images.unsplash.com/photo-1466442929976-97f336a657be"}
                  alt={place.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-devotional-maroon">{place.name}</h3>
                <p className="text-sm text-muted-foreground">{place.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
