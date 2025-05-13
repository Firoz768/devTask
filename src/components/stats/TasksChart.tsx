
import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";

export const TasksChart: React.FC = () => {
  const { tasks, places } = useApp();

  // Prepare data for the chart
  const data = places.map(place => {
    const placeTasks = tasks.filter(task => task.placeId === place.id);
    const completed = placeTasks.filter(task => 
      task.status === 'completed' || 
      task.status === 'approved' ||
      task.status === 'paid'
    ).length;
    const inProgress = placeTasks.filter(task => task.status === 'in-progress').length;
    const pending = placeTasks.filter(task => task.status === 'pending').length;
    
    return {
      name: place.name.split(' ')[0], // Just use the first word to keep the chart clean
      Completed: completed,
      'In Progress': inProgress,
      Pending: pending
    };
  });

  return (
    <Card className="devotional-card">
      <CardHeader>
        <CardTitle className="text-devotional-maroon">Tasks by Location</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Completed" fill="#FFC107" />
              <Bar dataKey="In Progress" fill="#FF9933" />
              <Bar dataKey="Pending" fill="#FF6600" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
