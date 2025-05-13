
import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { TaskCard } from "@/components/TaskCard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const TasksPage: React.FC = () => {
  const { user } = useAuth();
  const { tasks, places, teamMembers, addTask } = useApp();
  const isAdmin = user?.role === "admin";
  
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    placeId: "",
    startDate: "",
    endDate: "",
  });
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleCreateTask = () => {
    addTask({
      ...newTask,
      expenses: {
        food: 0,
        accommodation: 0,
        water: 0,
        other: 0,
      },
    });
    
    setNewTask({
      title: "",
      description: "",
      placeId: "",
      startDate: "",
      endDate: "",
    });
  };
  
  return (
    <DashboardLayout title="Tasks Management">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold text-devotional-maroon">All Tasks</h2>
        
        {!isAdmin && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="devotional-button">
                <Plus size={16} className="mr-1" /> Create Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription>
                  Add a new task for your team members.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Task Title</label>
                  <Input
                    name="title"
                    value={newTask.title}
                    onChange={handleInputChange}
                    placeholder="Enter task title"
                    className="border-devotional-gold/30"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    name="description"
                    value={newTask.description}
                    onChange={handleInputChange}
                    placeholder="Enter task description"
                    className="border-devotional-gold/30 min-h-[100px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Devotional Place</label>
                  <Select
                    onValueChange={(value) => handleSelectChange("placeId", value)}
                    value={newTask.placeId}
                  >
                    <SelectTrigger className="border-devotional-gold/30">
                      <SelectValue placeholder="Select a place" />
                    </SelectTrigger>
                    <SelectContent>
                      {places.map((place) => (
                        <SelectItem key={place.id} value={place.id}>
                          {place.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Input
                      name="startDate"
                      type="date"
                      value={newTask.startDate}
                      onChange={handleInputChange}
                      className="border-devotional-gold/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <Input
                      name="endDate"
                      type="date"
                      value={newTask.endDate}
                      onChange={handleInputChange}
                      className="border-devotional-gold/30"
                    />
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button className="devotional-button" onClick={handleCreateTask}>
                  Create Task
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="bg-devotional-gold/10 border border-devotional-gold/30">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="inProgress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          {isAdmin && <TabsTrigger value="approved">Approved</TabsTrigger>}
          {isAdmin && <TabsTrigger value="paid">Paid</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="all" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => {
              const taskPlace = places.find((place) => place.id === task.placeId);
              const assignedMember = task.assignedTo
                ? teamMembers.find((member) => member.id === task.assignedTo)
                : undefined;

              return (
                <TaskCard
                  key={task.id}
                  task={task}
                  viewMode={isAdmin ? "admin" : "leader"}
                  place={taskPlace}
                  assignedMember={assignedMember}
                />
              );
            })}
            
            {tasks.length === 0 && (
              <div className="col-span-3 p-4 bg-muted rounded-md text-center">
                No tasks found
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="pending" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks
              .filter((task) => task.status === "pending")
              .map((task) => {
                const taskPlace = places.find((place) => place.id === task.placeId);
                const assignedMember = task.assignedTo
                  ? teamMembers.find((member) => member.id === task.assignedTo)
                  : undefined;

                return (
                  <TaskCard
                    key={task.id}
                    task={task}
                    viewMode={isAdmin ? "admin" : "leader"}
                    place={taskPlace}
                    assignedMember={assignedMember}
                  />
                );
              })}
            
            {!tasks.some((task) => task.status === "pending") && (
              <div className="col-span-3 p-4 bg-muted rounded-md text-center">
                No pending tasks found
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="inProgress" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks
              .filter((task) => task.status === "in-progress")
              .map((task) => {
                const taskPlace = places.find((place) => place.id === task.placeId);
                const assignedMember = task.assignedTo
                  ? teamMembers.find((member) => member.id === task.assignedTo)
                  : undefined;

                return (
                  <TaskCard
                    key={task.id}
                    task={task}
                    viewMode={isAdmin ? "admin" : "leader"}
                    place={taskPlace}
                    assignedMember={assignedMember}
                  />
                );
              })}
            
            {!tasks.some((task) => task.status === "in-progress") && (
              <div className="col-span-3 p-4 bg-muted rounded-md text-center">
                No in-progress tasks found
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks
              .filter((task) => task.status === "completed")
              .map((task) => {
                const taskPlace = places.find((place) => place.id === task.placeId);
                const assignedMember = task.assignedTo
                  ? teamMembers.find((member) => member.id === task.assignedTo)
                  : undefined;

                return (
                  <TaskCard
                    key={task.id}
                    task={task}
                    viewMode={isAdmin ? "admin" : "leader"}
                    place={taskPlace}
                    assignedMember={assignedMember}
                  />
                );
              })}
            
            {!tasks.some((task) => task.status === "completed") && (
              <div className="col-span-3 p-4 bg-muted rounded-md text-center">
                No completed tasks found
              </div>
            )}
          </div>
        </TabsContent>
        
        {isAdmin && (
          <TabsContent value="approved" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks
                .filter((task) => task.status === "approved")
                .map((task) => {
                  const taskPlace = places.find((place) => place.id === task.placeId);
                  const assignedMember = task.assignedTo
                    ? teamMembers.find((member) => member.id === task.assignedTo)
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
              
              {!tasks.some((task) => task.status === "approved") && (
                <div className="col-span-3 p-4 bg-muted rounded-md text-center">
                  No approved tasks awaiting payment
                </div>
              )}
            </div>
          </TabsContent>
        )}
        
        {isAdmin && (
          <TabsContent value="paid" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks
                .filter((task) => task.status === "paid")
                .map((task) => {
                  const taskPlace = places.find((place) => place.id === task.placeId);
                  const assignedMember = task.assignedTo
                    ? teamMembers.find((member) => member.id === task.assignedTo)
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
              
              {!tasks.some((task) => task.status === "paid") && (
                <div className="col-span-3 p-4 bg-muted rounded-md text-center">
                  No paid tasks found
                </div>
              )}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </DashboardLayout>
  );
};

export default TasksPage;
